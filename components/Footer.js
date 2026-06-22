'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [settings, setSettings] = useState({
        phone: '+92 300 1234567',
        email: 'info@cleanhome.com',
        location: 'Karachi, Pakistan',
        workingHours: 'Mon-Sun: 8:00 AM - 8:00 PM'
    });

    // Load settings from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('siteSettings');
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch (e) { }
        }
    }, []);

    return (
        <footer
            style={{
                backgroundColor: '#2A9D8F',
                padding: '60px 20px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                marginTop: '64px'
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                {/* Brand Name - Brighter */}
                <h2
                    style={{
                        fontSize: '30px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        margin: 0,
                        letterSpacing: '-0.5px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    Spark<span style={{ color: '#B8E6D9' }}>Clean</span>
                </h2>

                {/* Subtitle - Brighter */}
                <p
                    style={{
                        fontSize: '16px',
                        color: '#F0F7F4',
                        marginTop: '6px',
                        fontWeight: 400,
                        opacity: 0.95
                    }}
                >
                    Professional Cleaning Services
                </p>

                {/* Contact Info - Brighter */}
                <div
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                        fontSize: '15px',
                        color: '#FFFFFF'
                    }}
                >
                    <span style={{ color: '#FFFFFF', fontWeight: 500 }}>📞 {settings.phone}</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>|</span>
                    <Link
                        href="/contact"
                        style={{
                            color: '#E8F5E9',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#FFFFFF';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#E8F5E9';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        WhatsApp
                    </Link>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>|</span>
                    <Link
                        href="/contact"
                        style={{
                            color: '#E8F5E9',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#FFFFFF';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#E8F5E9';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Email
                    </Link>
                </div>

                {/* Divider Line - Brighter */}
                <div
                    style={{
                        width: '60px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #B8E6D9, #FFFFFF)',
                        margin: '24px auto 20px',
                        borderRadius: '999px',
                        opacity: 0.8
                    }}
                />

                {/* Copyright with Admin Star - Brighter */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.7)',
                            margin: 0,
                            fontWeight: 400
                        }}
                    >
                        &copy; 2026 SparkClean. All rights reserved.
                    </p>

                    {/* Admin Star - Brighter */}
                    <Link
                        href="/admin-login"
                        style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px 8px',
                            borderRadius: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#B8E6D9';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                            e.target.style.transform = 'scale(1.2) rotate(180deg)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = 'rgba(255,255,255,0.4)';
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.transform = 'scale(1) rotate(0deg)';
                        }}
                        title="Admin Login"
                    >
                        ✦
                    </Link>
                </div>
            </div>
        </footer>
    );
}