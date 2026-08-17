import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    message: "File image tidak ditemukan.",
                },
                {
                    status: 400,
                },
            );
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                {
                    message: "File harus berupa image.",
                },
                {
                    status: 400,
                },
            );
        }

        const extension =
            file.name.split(".").pop()?.toLowerCase() || "jpg";

        const filename = `careers/${crypto.randomUUID()}.${extension}`;

        const blob = await put(filename, file, {
            access: "public",
        });

        return NextResponse.json({
            url: blob.url,
        });
    } catch (error) {
        console.error("POST /api/upload error:", error);

        return NextResponse.json(
            {
                message: "Gagal upload image.",
            },
            {
                status: 500,
            },
        );
    }
}