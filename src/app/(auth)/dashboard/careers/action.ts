"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateVacancy(
    id: number,
    formData: FormData,
) {
    const title = String(formData.get("title") ?? "").trim();
    const employmentType = String(
        formData.get("employmentType") ?? "",
    ).trim();

    const image = String(formData.get("image") ?? "").trim();

    const qualificationsText = String(
        formData.get("qualifications") ?? "",
    );

    const isActive = formData.get("isActive") === "on";

    if (!title) {
        throw new Error("Title wajib diisi.");
    }

    if (!employmentType) {
        throw new Error("Employment type wajib diisi.");
    }

    const qualifications = qualificationsText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    await prisma.vacancy.update({
        where: {
            id,
        },
        data: {
            title,
            employmentType,
            image: image || null,
            qualifications,
            isActive,
        },
    });

    revalidatePath("/dashboard/careers");
    revalidatePath("/careers");
}