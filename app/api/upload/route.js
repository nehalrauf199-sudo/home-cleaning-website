import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const ext = file.name.split('.').pop();
        const filename = `service-${timestamp}.${ext}`;

        // Upload to Vercel Blob
        const blob = await put(filename, buffer, {
            access: 'public',
        });

        return NextResponse.json({
            success: true,
            imageUrl: blob.url
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}