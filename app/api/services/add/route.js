import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(req) {
    try {
        // Parse JSON body (not form-data)
        const body = await req.json();
        const { title, description, shortDesc, image } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('sparkclean');

        const newService = {
            title,
            description,
            shortDesc: shortDesc || description.slice(0, 60),
            image: image || '/images/service-home.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('services').insertOne(newService);

        return NextResponse.json({
            success: true,
            id: result.insertedId,
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