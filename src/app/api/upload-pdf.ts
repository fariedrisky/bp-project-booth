// app/api/upload-pdf/route.ts
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Configure the upload directory
const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'pdfs');

// Initialize upload directory
const initializeUploadDirectory = async () => {
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (error) {
        console.error('Error creating upload directory:', error);
    }
};

// Initialize directory when module loads
initializeUploadDirectory();

export async function POST(request: Request) {
    try {
        // Ensure request size is not too large (5MB limit)
        const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
        if (contentLength > 5 * 1024 * 1024) { // 5MB in bytes
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 413 }
            );
        }

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

        // Generate a secure filename
        const fileName = `booking-${Date.now()}-${Math.random().toString(36).substring(2)}.pdf`;
        const filePath = path.join(uploadDir, fileName);

        // Convert file to buffer and save it
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Write file to disk
        await writeFile(filePath, buffer);

        // Generate the public URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const fileUrl = `${baseUrl}/uploads/pdfs/${fileName}`;

        return NextResponse.json({ fileUrl }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}
