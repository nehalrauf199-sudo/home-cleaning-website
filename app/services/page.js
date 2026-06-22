'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();

            // Make sure data is an array
            if (Array.isArray(data)) {
                setServices(data);
            } else {
                setServices([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid #2A9D8F',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '40px 20px'
            }}>
                <h2 style={{ fontSize: '24px', color: '#1a2e2a' }}>No Services Available</h2>
                <p style={{ color: '#5a7a72' }}>Please check back later for our services.</p>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section style={{
                padding: '80px 20px 60px',
                background: 'linear-gradient(135deg, #2A9D8F, #238276)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '12px' }}>
                        Our <span style={{ color: '#B8E6D9' }}>Services</span>
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto' }}>
                        Premium cleaning solutions tailored to your needs
                    </p>
                </div>
            </section>

            {/* Services Grid - 3 per row */}
            <section style={{ padding: '60px 20px', backgroundColor: '#F0F7F4' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '30px'
                    }} className="services-grid">
                        {services.map((service) => {
                            const isHovered = hoveredId === service._id;
                            return (
                                <div
                                    key={service._id || service.id || Math.random()}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: isHovered
                                            ? '0 20px 60px rgba(42,157,143,0.15)'
                                            : '0 10px 30px rgba(0,0,0,0.06)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={() => setHoveredId(service._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Image */}
                                    <div style={{
                                        height: '220px',
                                        backgroundColor: '#E8F3F0',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={service.image || '/images/service-home.jpg'}
                                            alt={service.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.6s ease',
                                                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: '24px 28px' }}>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            color: '#1a2e2a',
                                            margin: '0 0 10px 0'
                                        }}>
                                            {service.title}
                                        </h3>

                                        <p style={{
                                            fontSize: '15px',
                                            color: '#5a7a72',
                                            lineHeight: '1.6',
                                            margin: '0 0 16px 0',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            height: isHovered ? 'auto' : '48px',
                                            transition: 'height 0.3s ease'
                                        }}>
                                            {isHovered ? service.description : service.shortDesc}
                                        </p>

                                        <Link
                                            href="/contact"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: '#2A9D8F',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                transition: 'all 0.3s ease',
                                                opacity: isHovered ? 1 : 0.6,
                                                transform: isHovered ? 'translateX(0)' : 'translateX(-4px)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.color = '#238276';
                                                e.target.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.color = '#2A9D8F';
                                                e.target.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            Book Now →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </>
    );
}