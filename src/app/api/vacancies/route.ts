import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const vacancies = await prisma.vacancy.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(vacancies, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate",
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

        const vacancy = await prisma.vacancy.create({
            data: {
                title,
                employmentType,
                image,
                qualifications,
                isActive: true,
            },
        });

        return NextResponse.json(
            {
                id: vacancy.id.toString(),
                title: vacancy.title,
                employmentType: vacancy.employmentType,
                image: vacancy.image ?? "",
                qualifications: vacancy.qualifications,
            },
            {
                status: 201,
                headers: {
                    "Cache-Control": "no-store",
                },
            },
        );
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