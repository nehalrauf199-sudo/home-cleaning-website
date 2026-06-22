'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'cleanhome2026') {
            localStorage.setItem('adminAuth', 'true');
            router.push('/admin');
        } else {
            setError('Invalid password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F0F7F4',
                padding: '20px'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    padding: '48px 56px',
                    maxWidth: '420px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                {/* Icon */}
                <div
                    style={{
                        width: '72px',
                        height: '72px',
                        margin: '0 auto 20px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        color: 'white'
                    }}
                >
                    ✦
                </div>

                <h2
                    style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#1a2e2a',
                        marginBottom: '6px'
                    }}
                >
                    Admin Login
                </h2>
                <p
                    style={{
                        fontSize: '15px',
                        color: '#5a7a72',
                        marginBottom: '28px'
                    }}
                >
                    Enter your password to access the dashboard
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: '14px',
                            border: '1.5px solid #E8F3F0',
                            fontSize: '15px',
                            marginBottom: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            backgroundColor: '#FAFDFC',
                            color: '#1a2e2a'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2A9D8F'}
                        onBlur={(e) => e.target.style.borderColor = '#E8F3F0'}
                        required
                    />
                    {error && (
                        <p
                            style={{
                                color: '#EF4444',
                                fontSize: '14px',
                                marginBottom: '16px'
                            }}
                        >
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#2A9D8F',
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#238276';
                            e.target.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#2A9D8F';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Login
                    </button>
                </form>

                <p
                    style={{
                        marginTop: '20px',
                        fontSize: '13px',
                        color: '#9CA3AF'
                    }}
                >
                    Default password: <span style={{ fontWeight: 600, color: '#2A9D8F' }}>cleanhome2026</span>
                </p>
            </motion.div>
        </div>
    );
}