import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    _request: NextRequest,
    { params }: Props,
) {
    try {
        const { id } = await params;

        const vacancyId = Number(id);

        if (!Number.isInteger(vacancyId)) {
            return NextResponse.json(
                {
                    message: "ID vacancy tidak valid.",
                },
                {
                    status: 400,
                },
            );
        }

        const vacancy = await prisma.vacancy.findUnique({
            where: {
                id: vacancyId,
            },
        });

        if (!vacancy) {
            return NextResponse.json(
                {
                    message: "Vacancy tidak ditemukan.",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(
            {
                id: vacancy.id.toString(),
                title: vacancy.title,
                employmentType: vacancy.employmentType,
                image: vacancy.image ?? "",
                qualifications: vacancy.qualifications,
            },
            {
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                },
            },
        );
    } catch (error) {
        console.error("GET /api/vacancies/[id] error:", error);

        return NextResponse.json(
            {
                message: "Gagal mengambil vacancy.",
            },
            {
                status: 500,
            },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: Props,
) {
    try {
        const { id } = await params;

        const vacancyId = Number(id);

        if (!Number.isInteger(vacancyId)) {
            return NextResponse.json(
                {
                    message: "ID vacancy tidak valid.",
                },
                {
                    status: 400,
                },
            );
        }

        const existingVacancy = await prisma.vacancy.findUnique({
            where: {
                id: vacancyId,
            },
        });

        if (!existingVacancy) {
            return NextResponse.json(
                {
                    message: "Vacancy tidak ditemukan.",
                },
                {
                    status: 404,
                },
            );
        }

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

        const vacancy = await prisma.vacancy.update({
            where: {
                id: vacancyId,
            },
            data: {
                title,
                employmentType,
                image,
                qualifications,
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
                headers: {
                    "Cache-Control": "no-store",
                },
            },
        );
    } catch (error) {
        console.error("PUT /api/vacancies/[id] error:", error);

        return NextResponse.json(
            {
                message: "Gagal memperbarui vacancy.",
            },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: Props,
) {
    try {
        const { id } = await params;

        const vacancyId = Number(id);

        if (!Number.isInteger(vacancyId)) {
            return NextResponse.json(
                {
                    message: "ID vacancy tidak valid.",
                },
                {
                    status: 400,
                },
            );
        }

        const existingVacancy = await prisma.vacancy.findUnique({
            where: {
                id: vacancyId,
            },
        });

        if (!existingVacancy) {
            return NextResponse.json(
                {
                    message: "Vacancy tidak ditemukan.",
                },
                {
                    status: 404,
                },
            );
        }

        await prisma.vacancy.delete({
            where: {
                id: vacancyId,
            },
        });

        return NextResponse.json(
            {
                message: "Vacancy berhasil dihapus.",
            },
            {
                headers: {
                    "Cache-Control": "no-store",
                },
            },
        );
    } catch (error) {
        console.error("DELETE /api/vacancies/[id] error:", error);

        return NextResponse.json(
            {
                message: "Gagal menghapus vacancy.",
            },
            {
                status: 500,
            },
        );
    }
}