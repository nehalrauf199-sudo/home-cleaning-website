import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
    try {
        console.log('🔍 Testing MongoDB connection...');
        const client = await clientPromise;
        console.log('✅ Connected to MongoDB');

        const db = client.db('sparkclean');

        // Ping to confirm connection
        await db.command({ ping: 1 });
        console.log('✅ Ping successful');

        // Get collections
        const collections = await db.listCollections().toArray();

        return NextResponse.json({
            success: true,
            message: '✅ MongoDB connected successfully!',
            collections: collections.map(c => c.name)
        });
    } catch (error) {
        console.error('❌ Connection error:', error);
        return NextResponse.json(
            {
                error: error.message,
                type: error.name,
                details: error.stack
            },
            { status: 500 }
        );
    }
}