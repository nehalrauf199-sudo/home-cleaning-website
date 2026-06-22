'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav style={{
            backgroundColor: '#2A9D8F',
            boxShadow: '0 2px 20px rgba(42,157,143,0.15)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            padding: '0 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '70px'
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    textDecoration: 'none'
                }}>
                    Spark<span style={{ color: '#B8E6D9' }}>Clean</span>
                </Link>

                {/* Desktop Menu */}
                <div style={{
                    display: 'flex',
                    gap: '30px',
                    alignItems: 'center'
                }} className="desktop-menu">
                    <Link href="/" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        opacity: 0.9,
                        transition: 'opacity 0.3s ease'
                    }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                    >Home</Link>
                    <Link href="/services" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        opacity: 0.9,
                        transition: 'opacity 0.3s ease'
                    }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                    >Services</Link>
                    <Link href="/contact" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        opacity: 0.9,
                        transition: 'opacity 0.3s ease'
                    }}
                        onMouseEnter={(e) => e.target.style.opacity = '1'}
                        onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                    >Contact</Link>
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                    className="mobile-btn"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div style={{
                    backgroundColor: '#2A9D8F',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }} className="mobile-menu">
                    <Link href="/" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: '8px 0',
                        opacity: 0.9
                    }} onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/services" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: '8px 0',
                        opacity: 0.9
                    }} onClick={() => setIsOpen(false)}>Services</Link>
                    <Link href="/contact" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: '8px 0',
                        opacity: 0.9
                    }} onClick={() => setIsOpen(false)}>Contact</Link>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
        </nav>
    );
}