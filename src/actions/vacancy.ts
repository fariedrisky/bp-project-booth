"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "assets",
    "images",
    "careers",
);

async function saveImage(file: File | null) {
    if (!file || file.size === 0) {
        return null;
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("File harus berupa gambar.");
    }

    // Maksimal 5 MB
    if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran gambar maksimal 5 MB.");
    }

    await fs.mkdir(uploadDirectory, {
        recursive: true,
    });

    const extension = path.extname(file.name) || ".jpg";

    const safeName = path
        .basename(file.name, extension)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const filename = `${Date.now()}-${safeName || "vacancy"}${extension}`;

    const filePath = path.join(uploadDirectory, filename);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    return `/assets/images/careers/${filename}`;
}

function getQualifications(formData: FormData) {
    return formData
        .getAll("qualifications")
        .map((item) => String(item).trim())
        .filter(Boolean);
}

export async function createVacancy(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();

    const employmentType = String(
        formData.get("employmentType") ?? "",
    ).trim();

    const imageUrl = String(formData.get("image") ?? "").trim();

    const imageFile = formData.get("imageFile");

    const qualifications = getQualifications(formData);

    if (!title) {
        throw new Error("Title wajib diisi.");
    }

    if (!employmentType) {
        throw new Error("Employment type wajib diisi.");
    }

    if (qualifications.length === 0) {
        throw new Error("Minimal satu kualifikasi wajib diisi.");
    }

    let image = imageUrl;

    if (imageFile instanceof File && imageFile.size > 0) {
        const uploadedImage = await saveImage(imageFile);

        if (uploadedImage) {
            image = uploadedImage;
        }
    }

    if (!image) {
        throw new Error("Image wajib diisi.");
    }

    await prisma.vacancy.create({
        data: {
            title,
            employmentType,
            image,
            qualifications,
        },
    });

    revalidatePath("/careers");
    revalidatePath("/careers/editor");
    revalidatePath("/dashboard/careers");

    return {
        success: true,
    };
}

export async function updateVacancy(
    id: number,
    formData: FormData,
) {
    const title = String(formData.get("title") ?? "").trim();

    const employmentType = String(
        formData.get("employmentType") ?? "",
    ).trim();

    const currentImage = String(
        formData.get("image") ?? "",
    ).trim();

    const imageFile = formData.get("imageFile");

    const qualifications = getQualifications(formData);

    if (!title) {
        throw new Error("Title wajib diisi.");
    }

    if (!employmentType) {
        throw new Error("Employment type wajib diisi.");
    }

    if (qualifications.length === 0) {
        throw new Error("Minimal satu kualifikasi wajib diisi.");
    }

    const existingVacancy = await prisma.vacancy.findUnique({
        where: {
            id,
        },
    });

    if (!existingVacancy) {
        throw new Error("Vacancy tidak ditemukan.");
    }

    let image = currentImage || existingVacancy.image || "";

    if (imageFile instanceof File && imageFile.size > 0) {
        const uploadedImage = await saveImage(imageFile);

        if (uploadedImage) {
            image = uploadedImage;
        }
    }

    if (!image) {
        throw new Error("Image wajib diisi.");
    }

    await prisma.vacancy.update({
        where: {
            id,
        },
        data: {
            title,
            employmentType,
            image,
            qualifications,
        },
    });

    revalidatePath("/careers");
    revalidatePath("/careers/editor");
    revalidatePath("/dashboard/careers");

    return {
        success: true,
    };
}

export async function deleteVacancy(id: number) {
    const vacancy = await prisma.vacancy.findUnique({
        where: {
            id,
        },
    });

    if (!vacancy) {
        throw new Error("Vacancy tidak ditemukan.");
    }

    await prisma.vacancy.delete({
        where: {
            id,
        },
    });

    revalidatePath("/careers");
    revalidatePath("/careers/editor");
    revalidatePath("/dashboard/careers");

    return {
        success: true,
    };
}