'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        letterSpacing: '-1px'
                    }}>
                        Get In <span style={{ color: '#B8E6D9' }}>Touch</span>
                    </h1>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.85)',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section style={{
                padding: '60px 20px',
                backgroundColor: '#F0F7F4'
            }}>
                <div style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '50px'
                }} className="contact-grid">
                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '40px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
                        }}
                    >
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#1a2e2a',
                            marginBottom: '6px'
                        }}>
                            Send a Message
                        </h2>
                        <p style={{
                            fontSize: '14px',
                            color: '#5a7a72',
                            marginBottom: '28px'
                        }}>
                            Fill in the form below and we'll get back to you
                        </p>

                        {submitStatus && (
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                backgroundColor: submitStatus.type === 'success' ? '#D1FAE5' : '#FEE2E2',
                                color: submitStatus.type === 'success' ? '#065F46' : '#991B1B',
                                border: `1px solid ${submitStatus.type === 'success' ? '#34D399' : '#FCA5A5'}`
                            }}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
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
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
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
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Your Phone Number"
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
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '14px',
                                    border: '1.5px solid #E8F3F0',
                                    fontSize: '15px',
                                    marginBottom: '20px',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.3s ease',
                                    backgroundColor: '#FAFDFC',
                                    fontFamily: 'inherit',
                                    color: '#1a2e2a'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#2A9D8F'}
                                onBlur={(e) => e.target.style.borderColor = '#E8F3F0'}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: isSubmitting ? '#94A3B8' : '#2A9D8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '14px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor = '#238276';
                                        e.target.style.transform = 'scale(1.02)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor = '#2A9D8F';
                                        e.target.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#1a2e2a',
                            marginBottom: '4px'
                        }}>
                            Contact Information
                        </h2>
                        <p style={{
                            fontSize: '14px',
                            color: '#5a7a72',
                            marginBottom: '16px'
                        }}>
                            Reach out to us through any of these channels
                        </p>

                        {/* Phone */}
                        <div
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '18px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}
                            >
                                📞
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#5a7a72', margin: 0 }}>Phone</p>
                                <a
                                    href={`tel:${settings.phone}`}
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#1a2e2a',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#2A9D8F'}
                                    onMouseLeave={(e) => e.target.style.color = '#1a2e2a'}
                                >
                                    {settings.phone}
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '18px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}
                            >
                                ✉
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#5a7a72', margin: 0 }}>Email</p>
                                <a
                                    href={`mailto:${settings.email}`}
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#1a2e2a',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#2A9D8F'}
                                    onMouseLeave={(e) => e.target.style.color = '#1a2e2a'}
                                >
                                    {settings.email}
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '18px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}
                            >
                                📍
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#5a7a72', margin: 0 }}>Address</p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#1a2e2a',
                                        margin: 0
                                    }}
                                >
                                    {settings.location}
                                </p>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '18px 22px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    flexShrink: 0
                                }}
                            >
                                🕐
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#5a7a72', margin: 0 }}>Working Hours</p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#1a2e2a',
                                        margin: 0
                                    }}
                                >
                                    {settings.workingHours}
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <div style={{ marginTop: '8px' }}>
                            <a
                                href={`https://wa.me/${settings.phone.replace(/\s/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    padding: '14px 24px',
                                    borderRadius: '16px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 16px rgba(37,211,102,0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.02)';
                                    e.target.style.boxShadow = '0 8px 30px rgba(37,211,102,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)';
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="white"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 30px !important;
                    }
                }
            `}</style>
        </>
    );
}