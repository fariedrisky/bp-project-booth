import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
    getApplicantConfirmationEmail,
    getHrNotificationEmail,
} from "./email-templates";

interface ApplicationPayload {
    fullName: string;
    email: string;
    phoneNumber: string;
    cvLink: string;
    position?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is ApplicationPayload {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;
    return (
        typeof b.fullName === "string" &&
        b.fullName.trim().length > 0 &&
        typeof b.email === "string" &&
        EMAIL_REGEX.test(b.email) &&
        typeof b.phoneNumber === "string" &&
        b.phoneNumber.trim().length > 0 &&
        typeof b.cvLink === "string" &&
        b.cvLink.trim().length > 0 &&
        (b.position === undefined || typeof b.position === "string")
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

    const { fullName, email, phoneNumber, cvLink, position } = body;

    try {
        const transporter = getTransporter();
        const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
        // HR notification address — override via HR_EMAIL env var if needed
        const hrAddress = process.env.HR_EMAIL || "fdfilters@gmail.com";

        // Notify HR with the applicant's data and CV link
        // "from" stays as our authenticated system address (Gmail/SMTP requires
        // this to match the login account), but "replyTo" is set to the
        // applicant's email so HR can just hit Reply to email them directly.
        const hrEmail = getHrNotificationEmail({
            fullName,
            email,
            phoneNumber,
            cvLink,
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
            fullName,
            email,
            phoneNumber,
            cvLink,
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