// app/api/get-images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        // Get the directory parameter from the URL
        const searchParams = request.nextUrl.searchParams;
        const directory = searchParams.get('directory');

        if (!directory) {
            return NextResponse.json(
                { error: 'Directory parameter is required' },
                { status: 400 }
            );
        }

        // Clean and sanitize the path to prevent directory traversal attacks
        const sanitizedDir = directory.replace(/\.\./g, '');

        // Get the absolute path of the public directory
        const publicDir = path.join(process.cwd(), 'public');

        // Join with the requested directory (relative to public)
        const targetDir = path.join(publicDir, sanitizedDir);

        // Check if the directory exists
        if (!fs.existsSync(targetDir)) {
            return NextResponse.json(
                { error: 'Directory not found' },
                { status: 404 }
            );
        }

        // Read directory contents
        const files = fs.readdirSync(targetDir);

        // Filter for image files only
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        // Generate full paths to the images (relative to public directory for client access)
        const imagePaths = imageFiles.map(file => `${sanitizedDir}/${file}`);

        // Return the image paths
        return NextResponse.json({ images: imagePaths });
    } catch (error) {
        console.error('Error in get-images API:', error);
        return NextResponse.json(
            { error: 'Failed to read directory' },
            { status: 500 }
        );
    }
}