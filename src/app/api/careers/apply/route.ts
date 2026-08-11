import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
    getApplicantConfirmationEmail,
    getHrNotificationEmail,
} from "./email-templates";

interface WorkExperiencePayload {
    companyName: string;
    position: string;
    jobDescription: string;
    startYear: string;
    endYear: string;
    isCurrent: boolean;
}

interface ApplicationPayload {
    fullName: string;
    dateOfBirth: string;
    gender: "male" | "female";
    lastEducation: string;
    isCurrentlyStudying: boolean;
    currentStudyProgram?: string;
    hasNoWorkExperience: boolean;
    workExperiences: WorkExperiencePayload[];
    email: string;
    phoneNumber: string;
    position?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YEAR_REGEX = /^(19|20)\d{2}$/;

function isValidWorkExperience(exp: unknown): exp is WorkExperiencePayload {
    if (!exp || typeof exp !== "object") return false;
    const e = exp as Record<string, unknown>;

    const basicFieldsValid =
        typeof e.companyName === "string" &&
        e.companyName.trim().length > 0 &&
        typeof e.position === "string" &&
        e.position.trim().length > 0 &&
        typeof e.jobDescription === "string" &&
        e.jobDescription.trim().length > 0 &&
        typeof e.isCurrent === "boolean" &&
        typeof e.startYear === "string" &&
        YEAR_REGEX.test(e.startYear.trim());

    if (!basicFieldsValid) return false;

    // endYear wajib valid kecuali masih bekerja di sana (isCurrent true)
    if (e.isCurrent === true) return true;

    return typeof e.endYear === "string" && YEAR_REGEX.test(e.endYear.trim());
}

function isValidPayload(body: unknown): body is ApplicationPayload {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;

    const basicFieldsValid =
        typeof b.fullName === "string" &&
        b.fullName.trim().length > 0 &&
        typeof b.dateOfBirth === "string" &&
        b.dateOfBirth.trim().length > 0 &&
        (b.gender === "male" || b.gender === "female") &&
        typeof b.lastEducation === "string" &&
        b.lastEducation.trim().length > 0 &&
        typeof b.isCurrentlyStudying === "boolean" &&
        (b.isCurrentlyStudying === false ||
            (typeof b.currentStudyProgram === "string" &&
                (b.currentStudyProgram as string).trim().length > 0)) &&
        typeof b.hasNoWorkExperience === "boolean" &&
        typeof b.email === "string" &&
        EMAIL_REGEX.test(b.email as string) &&
        typeof b.phoneNumber === "string" &&
        (b.phoneNumber as string).trim().length > 0 &&
        (b.position === undefined || typeof b.position === "string");

    if (!basicFieldsValid) return false;

    if (b.hasNoWorkExperience === true) {
        return Array.isArray(b.workExperiences);
    }

    return (
        Array.isArray(b.workExperiences) &&
        b.workExperiences.length > 0 &&
        b.workExperiences.every(isValidWorkExperience)
    );
}

function getTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
}

export async function POST(request: NextRequest) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    if (!isValidPayload(body)) {
        return NextResponse.json(
            { message: "Data yang dikirim tidak lengkap atau tidak valid" },
            { status: 400 },
        );
    }

    const {
        fullName,
        dateOfBirth,
        gender,
        lastEducation,
        isCurrentlyStudying,
        currentStudyProgram,
        hasNoWorkExperience,
        workExperiences,
        email,
        phoneNumber,
        position,
    } = body;

    try {
        const transporter = getTransporter();
        const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
        // HR notification address — override via HR_EMAIL env var if needed
        const hrAddress = process.env.HR_EMAIL || "fdfilters@gmail.com";

        const applicantData = {
            fullName,
            dateOfBirth,
            gender,
            lastEducation,
            isCurrentlyStudying,
            currentStudyProgram: currentStudyProgram ?? "",
            hasNoWorkExperience,
            workExperiences,
            email,
            phoneNumber,
        };

        // Notify HR with the applicant's full data
        // "from" stays as our authenticated system address (Gmail/SMTP requires
        // this to match the login account), but "replyTo" is set to the
        // applicant's email so HR can just hit Reply to email them directly.
        const hrEmail = getHrNotificationEmail({
            ...applicantData,
            position,
        });

        await transporter.sendMail({
            from: fromAddress,
            to: hrAddress,
            replyTo: email,
            subject: hrEmail.subject,
            html: hrEmail.html,
        });

        // Confirmation email to the applicant
        const confirmationEmail = getApplicantConfirmationEmail({
            ...applicantData,
            position: position ?? "",
        });

        await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: confirmationEmail.subject,
            html: confirmationEmail.html,
        });

        return NextResponse.json({ message: "Lamaran berhasil dikirim" }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error sending application emails:", error);
        return NextResponse.json(
            { message: "Gagal mengirim lamaran. Silakan coba lagi." },
            { status: 500 },
        );
    }
}