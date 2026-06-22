import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// In-memory storage for services
let services = [];

export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const shortDesc = formData.get('shortDesc');
        const imageFile = formData.get('image');

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        let imageUrl = '/images/service-home.jpg';

        // Upload image if provided
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const timestamp = Date.now();
            const ext = imageFile.name.split('.').pop();
            const filename = `service-${timestamp}.${ext}`;

            // Save to public/uploads
            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);
            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${filename}`;
        }

        const newService = {
            _id: Date.now().toString(),
            title,
            description,
            shortDesc: shortDesc || description.slice(0, 60),
            image: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        services.push(newService);

        return NextResponse.json({
            success: true,
            id: newService._id,
            service: newService
        });

    } catch (error) {
        console.error('Error adding service:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to add service' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(services);
}