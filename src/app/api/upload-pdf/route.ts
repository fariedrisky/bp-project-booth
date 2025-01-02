// src/app/api/upload-pdf/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF files are allowed.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const uniqueId = nanoid();
        const fileName = `booking-${uniqueId}.pdf`;

        // Upload to Vercel Blob
        const blob = await put(fileName, file, {
            access: 'public',
            addRandomSuffix: false
        });

        return NextResponse.json({ fileUrl: blob.url }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Gagal mengunggah dokumen pemesanan. Silakan coba lagi.' },
            { status: 500 }
        );
    }
}
