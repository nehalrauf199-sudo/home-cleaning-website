import { NextResponse } from 'next/server';

// In-memory storage for reviews
let reviews = [
    {
        id: '1',
        name: 'Sarah Ahmed',
        location: 'Karachi',
        text: 'Absolutely outstanding service! SparkClean transformed my entire home. The team was professional, thorough, and incredibly detailed.',
        rating: 5,
        approved: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Usman Khan',
        location: 'Lahore',
        text: 'Best cleaning service I have ever used. They removed stains I thought were permanent. My carpets look brand new!',
        rating: 5,
        approved: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Fatima Ali',
        location: 'Islamabad',
        text: 'The office cleaning service is exceptional. Our workplace has never been this clean and organized. Highly recommended!',
        rating: 5,
        approved: true,
        createdAt: new Date().toISOString()
    }
];

export async function GET() {
    return NextResponse.json(reviews);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, location, text, rating } = body;

        if (!name || !text) {
            return NextResponse.json(
                { error: 'Name and review text are required' },
                { status: 400 }
            );
        }

        const newReview = {
            id: Date.now().toString(),
            name,
            location: location || '',
            text,
            rating: rating || 5,
            approved: false,
            createdAt: new Date().toISOString()
        };

        reviews.unshift(newReview);

        return NextResponse.json({
            success: true,
            data: newReview
        });

    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json(
            { error: 'Failed to add review' },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, action } = body;

        if (!id) {
            return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
        }

        const index = reviews.findIndex(r => r.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        if (action === 'approve') {
            reviews[index].approved = true;
        } else if (action === 'delete') {
            reviews = reviews.filter(r => r.id !== id);
        }

        return NextResponse.json({ success: true, data: reviews[index] });
    } catch (error) {
        console.error('Error updating review:', error);
        return NextResponse.json(
            { error: 'Failed to update review' },
            { status: 500 }
        );
    }
}