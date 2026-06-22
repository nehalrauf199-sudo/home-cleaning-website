import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { headers } from 'next/headers';

export const metadata = {
    title: 'SparkClean - Professional Cleaning Services',
    description: 'Premium cleaning services for your home and office',
};

export default function RootLayout({ children }) {
    // Check if we're on admin page
    const isAdminPage = false; // We'll use client-side detection

    return (
        <html lang="en">
            <body style={{
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Navbar />
                <main style={{
                    flex: 1,
                    paddingTop: '70px'
                }}>
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
            </body>
        </html>
    );
}