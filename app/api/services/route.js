import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('sparkclean');
        const services = await db.collection('services').find({}).toArray();
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch services' },
            { status: 500 }
        );
    }
}