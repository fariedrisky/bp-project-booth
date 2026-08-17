import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * FORCE DYNAMIC
 * ============================
 *
 * Jangan cache API vacancy.
 * Penting terutama di production.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/*
 * ============================
 * GET
 * ============================
 */

export async function GET() {
    try {
        const vacancies = await prisma.vacancy.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(vacancies, {
            status: 200,

            /*
             * Pastikan browser/CDN tidak
             * menyimpan response lama.
             */
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
    } catch (error) {
        console.error("GET /api/vacancies error:", error);

        return NextResponse.json(
            {
                message: "Gagal mengambil data vacancy.",
            },
            {
                status: 500,
            },
        );
    }
}

/*
 * ============================
 * POST
 * ============================
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const title = String(body.title ?? "").trim();

        const employmentType = String(
            body.employmentType ?? "",
        ).trim();

        const image =
            body.image === null || body.image === ""
                ? null
                : String(body.image).trim();

        const qualifications = Array.isArray(body.qualifications)
            ? body.qualifications
                .map((item: unknown) => String(item).trim())
                .filter(Boolean)
            : [];

        /*
         * ============================
         * VALIDATION
         * ============================
         */

        if (!title) {
            return NextResponse.json(
                {
                    message: "Title wajib diisi.",
                },
                {
                    status: 400,
                },
            );
        }

        if (!employmentType) {
            return NextResponse.json(
                {
                    message: "Employment type wajib diisi.",
                },
                {
                    status: 400,
                },
            );
        }

        if (qualifications.length === 0) {
            return NextResponse.json(
                {
                    message: "Minimal satu kualifikasi wajib diisi.",
                },
                {
                    status: 400,
                },
            );
        }

        /*
         * ============================
         * CREATE DATABASE
         * ============================
         */

        const vacancy = await prisma.vacancy.create({
            data: {
                title,
                employmentType,
                image,
                qualifications,
                isActive: true,
            },
        });

        return NextResponse.json(vacancy, {
            status: 201,

            headers: {
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("POST /api/vacancies error:", error);

        return NextResponse.json(
            {
                message: "Gagal membuat vacancy.",
            },
            {
                status: 500,
            },
        );
    }
}