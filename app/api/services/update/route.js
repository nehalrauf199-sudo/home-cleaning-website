import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// In-memory storage for services
let services = [];

export async function PUT(req) {
    try {
        const formData = await req.formData();
        const id = formData.get('id');
        const title = formData.get('title');
        const description = formData.get('description');
        const shortDesc = formData.get('shortDesc');
        const imageFile = formData.get('image');

        if (!id || !title || !description) {
            return NextResponse.json(
                { error: 'ID, title and description are required' },
                { status: 400 }
            );
        }

        const index = services.findIndex(s => s._id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        let imageUrl = services[index].image;

        // Upload new image if provided
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const timestamp = Date.now();
            const ext = imageFile.name.split('.').pop();
            const filename = `service-${timestamp}.${ext}`;

            const uploadDir = path.join(process.cwd(), 'public/uploads');
            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);
            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${filename}`;
        }

        services[index] = {
            ...services[index],
            title,
            description,
            shortDesc: shortDesc || description.slice(0, 60),
            image: imageUrl,
            updatedAt: new Date()
        };

        return NextResponse.json({ success: true, service: services[index] });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update service' },
            { status: 500 }
        );
    }
}