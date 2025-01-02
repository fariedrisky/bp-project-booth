import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Files } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const options: formidable.Options = {
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                return `${uniqueSuffix}${path.extname(part.originalFilename || '')}`;
            },
            multiples: false,
        };

        const form = formidable(options);

        const [_fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const fileArray = files.file;
        if (!fileArray || !Array.isArray(fileArray) || fileArray.length === 0) {
            throw new Error('No file uploaded');
        }

        const file = fileArray[0];
        const fileName = path.basename(file.filepath);
        const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${fileName}`;

        res.status(200).json({ fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error processing upload' });
    }
}
