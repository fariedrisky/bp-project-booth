"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
];

async function saveImage(file: File) {
    if (!file || file.size === 0) {
        return null;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error(
            "Format image harus JPG, JPEG, PNG, atau WEBP.",
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("Ukuran image maksimal 5 MB.");
    }

    const uploadDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "images",
        "careers",
    );

    await fs.mkdir(uploadDir, {
        recursive: true,
    });

    const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `vacancy-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.${extension}`;

    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(
        await file.arrayBuffer(),
    );

    await fs.writeFile(filePath, buffer);

    return `/assets/images/careers/${fileName}`;
}

export async function createVacancy(formData: FormData) {
    const title = String(
        formData.get("title") ?? "",
    ).trim();

    const employmentType = String(
        formData.get("employmentType") ?? "",
    ).trim();

    const imageFile = formData.get("imageFile");

    const qualifications = formData
        .getAll("qualifications")
        .map((item) => String(item).trim())
        .filter(Boolean);

    if (!title) {
        throw new Error("Title wajib diisi.");
    }

    if (!employmentType) {
        throw new Error(
            "Employment type wajib diisi.",
        );
    }

    if (
        !(imageFile instanceof File) ||
        imageFile.size === 0
    ) {
        throw new Error("Image wajib diupload.");
    }

    const image = await saveImage(imageFile);

    if (!image) {
        throw new Error(
            "Gagal menyimpan image.",
        );
    }

    await prisma.vacancy.create({
        data: {
            title,
            employmentType,
            image,
            qualifications,
        },
    });

    revalidatePath("/dashboard/careers");
    revalidatePath("/careers");

    redirect("/dashboard/careers");
}

export async function updateVacancy(
    id: number,
    formData: FormData,
) {
    const title = String(
        formData.get("title") ?? "",
    ).trim();

    const employmentType = String(
        formData.get("employmentType") ?? "",
    ).trim();

    const currentImage = String(
        formData.get("currentImage") ?? "",
    ).trim();

    const imageFile = formData.get("imageFile");

    const qualifications = formData
        .getAll("qualifications")
        .map((item) => String(item).trim())
        .filter(Boolean);

    if (!title) {
        throw new Error("Title wajib diisi.");
    }

    if (!employmentType) {
        throw new Error(
            "Employment type wajib diisi.",
        );
    }

    // Ambil data vacancy yang sekarang
    const existingVacancy =
        await prisma.vacancy.findUnique({
            where: {
                id,
            },
        });

    if (!existingVacancy) {
        throw new Error(
            "Vacancy tidak ditemukan.",
        );
    }

    let image = currentImage;

    // Kalau user upload image baru
    if (
        imageFile instanceof File &&
        imageFile.size > 0
    ) {
        const newImage =
            await saveImage(imageFile);

        if (newImage) {
            image = newImage;
        }
    }

    // Kalau image lama tidak ada dan tidak ada
    // image baru
    if (!image) {
        throw new Error(
            "Image wajib tersedia.",
        );
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

    revalidatePath("/dashboard/careers");
    revalidatePath(
        `/dashboard/careers/${id}/edit`,
    );
    revalidatePath("/careers");

    redirect("/dashboard/careers");
}

export async function deleteVacancy(
    id: number,
) {
    const vacancy =
        await prisma.vacancy.findUnique({
            where: {
                id,
            },
        });

    if (!vacancy) {
        throw new Error(
            "Vacancy tidak ditemukan.",
        );
    }

    // Hapus file image dari filesystem
    // hanya jika image merupakan file lokal
    if (
        vacancy.image &&
        vacancy.image.startsWith(
            "/assets/images/careers/",
        )
    ) {
        const imagePath = path.join(
            process.cwd(),
            "public",
            vacancy.image,
        );

        try {
            await fs.unlink(imagePath);
        } catch {
            // File mungkin sudah tidak ada.
            // Tidak perlu menggagalkan proses delete.
        }
    }

    await prisma.vacancy.delete({
        where: {
            id,
        },
    });

    revalidatePath("/dashboard/careers");
    revalidatePath("/careers");
}