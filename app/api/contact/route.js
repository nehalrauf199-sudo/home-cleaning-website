import { NextResponse } from 'next/server';

// In-memory storage for contact messages
let messages = [];

export async function GET() {
    return NextResponse.json(messages);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email and message are required' },
                { status: 400 }
            );
        }

        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            phone: phone || '',
            message,
            createdAt: new Date().toISOString(),
            read: false
        };

        messages.unshift(newMessage);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
            data: newMessage
        });

    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
        }

        messages = messages.filter(m => m.id !== id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}