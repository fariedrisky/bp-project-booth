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
    workExperience: WorkExperiencePayload;
    email: string;
    phoneNumber: string;
    position?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YEAR_REGEX = /^(19|20)\d{2}$/;
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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

    if (b.hasNoWorkExperience === true) return true;

    return isValidWorkExperience(b.workExperience);
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
    let formData: FormData;

    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json(
            { message: "Invalid form data" },
            { status: 400 },
        );
    }

    const rawData = formData.get("data");
    if (typeof rawData !== "string") {
        return NextResponse.json(
            { message: "Data pelamar tidak ditemukan" },
            { status: 400 },
        );
    }

    let body: unknown;
    try {
        body = JSON.parse(rawData);
    } catch {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    if (!isValidPayload(body)) {
        return NextResponse.json(
            { message: "Data yang dikirim tidak lengkap atau tidak valid" },
            { status: 400 },
        );
    }

    const photo = formData.get("photo");
    if (!(photo instanceof File) || photo.size === 0) {
        return NextResponse.json(
            { message: "Foto wajib diunggah" },
            { status: 400 },
        );
    }
    if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
        return NextResponse.json(
            { message: "Format foto harus JPG atau PNG" },
            { status: 400 },
        );
    }
    if (photo.size > MAX_PHOTO_SIZE_BYTES) {
        return NextResponse.json(
            { message: "Ukuran foto maksimal 5MB" },
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
        workExperience,
        email,
        phoneNumber,
        position,
    } = body;

    try {
        const transporter = getTransporter();
        const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
        // HR notification address — set via HR_EMAIL env var
        const hrAddress = process.env.HR_EMAIL || "fdfilters@gmail.com";

        const photoBuffer = Buffer.from(await photo.arrayBuffer());
        const photoAttachment = {
            filename: photo.name || "foto-pelamar.jpg",
            content: photoBuffer,
            contentType: photo.type,
        };

        const applicantData = {
            fullName,
            dateOfBirth,
            gender,
            lastEducation,
            isCurrentlyStudying,
            currentStudyProgram: currentStudyProgram ?? "",
            hasNoWorkExperience,
            workExperience,
            email,
            phoneNumber,
        };

        // Notify HR with the applicant's full data + foto sebagai attachment.
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
            attachments: [photoAttachment],
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