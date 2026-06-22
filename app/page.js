'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({
        name: '',
        location: '',
        text: '',
        rating: 5
    });
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewSubmitStatus, setReviewSubmitStatus] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    // Fetch approved reviews
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            const data = await res.json();
            const approved = data.filter(r => r.approved === true);
            setReviews(approved);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    // Submit review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!reviewForm.name || !reviewForm.text) {
            alert('Please fill in all required fields');
            return;
        }

        setReviewSubmitting(true);
        setReviewSubmitStatus(null);

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewForm)
            });

            const data = await res.json();

            if (data.success) {
                setReviewSubmitStatus('success');
                setReviewForm({ name: '', location: '', text: '', rating: 5 });
                fetchReviews();
            } else {
                setReviewSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewSubmitStatus('error');
        } finally {
            setReviewSubmitting(false);
        }
    };

    // Services with images
    const services = [
        {
            title: 'Home Cleaning',
            description: 'Complete home cleaning with attention to detail',
            image: '/images/service-home.jpg'
        },
        {
            title: 'Carpet Cleaning',
            description: 'Deep stain removal for all carpets',
            image: '/images/service-carpet.jpg'
        },
        {
            title: 'Office Cleaning',
            description: 'Professional commercial cleaning',
            image: '/images/service-office.jpg'
        }
    ];

    // Fade-up animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut'
            }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut'
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    return (
        <>
            {/* PREMIUM WELCOME CARD - MOBILE RESPONSIVE */}
            {showWelcome && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(42,157,143,0.4)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        padding: '20px'
                    }}
                >
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '32px',
                            background:
                                'linear-gradient(135deg, rgba(42,157,143,0.9), rgba(184,230,217,0.9), rgba(42,157,143,0.9))',
                            backgroundSize: '300% 300%',
                            boxShadow:
                                '0 25px 80px rgba(0,0,0,0.15), 0 0 40px rgba(42,157,143,0.2)',
                            animation:
                                'gradientMove 5s ease infinite, fadeSlide 4s ease-in-out forwards',
                            width: '100%',
                            maxWidth: '480px'
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.96)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '30px',
                                padding: 'clamp(30px, 6vw, 55px) clamp(20px, 5vw, 70px)',
                                textAlign: 'center',
                                width: '100%'
                            }}
                            className="welcome-card"
                        >
                            <div
                                style={{
                                    width: 'clamp(60px, 12vw, 100px)',
                                    height: 'clamp(60px, 12vw, 100px)',
                                    margin: '0 auto 20px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg,#2A9D8F,#B8E6D9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 'clamp(30px, 6vw, 48px)',
                                    color: '#fff',
                                    boxShadow: '0 15px 40px rgba(42,157,143,0.3)',
                                }}
                            >
                                ✨
                            </div>

                            <h1
                                style={{
                                    fontSize: 'clamp(32px, 8vw, 54px)',
                                    fontWeight: 800,
                                    color: '#1a2e2a',
                                    margin: 0,
                                    letterSpacing: '-1px',
                                }}
                            >
                                Spark<span style={{ color: '#2A9D8F' }}>Clean</span>
                            </h1>

                            <p
                                style={{
                                    marginTop: '10px',
                                    fontSize: 'clamp(16px, 4vw, 20px)',
                                    color: '#5a7a72',
                                    fontWeight: 500,
                                }}
                            >
                                Making Every Space Shine
                            </p>

                            <div
                                style={{
                                    width: 'clamp(60px, 12vw, 90px)',
                                    height: '4px',
                                    margin: '16px auto 0',
                                    borderRadius: '999px',
                                    background: 'linear-gradient(90deg,#2A9D8F,#B8E6D9)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* HERO SECTION - MOBILE RESPONSIVE */}
            <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover scale-105"
                        poster="/videos/hero-poster.jpg"
                        style={{
                            filter: 'blur(2px)',
                            transform: 'scale(1.05)'
                        }}
                    >
                        <source src="/videos/hero-video.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#2A9D8F]/30 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F]/20 to-[#1a2e2a]/30" />

                <div className="relative z-10 container-premium text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="hero-title" style={{
                            fontSize: 'clamp(2rem, 8vw, 8rem)',
                            fontWeight: 800,
                            marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)',
                            lineHeight: '1.1',
                            textShadow: '0 4px 40px rgba(0,0,0,0.6)'
                        }}>
                            Professional
                            <span style={{
                                color: '#34D399',
                                display: 'block',
                                fontSize: 'clamp(1.6rem, 6vw, 7rem)'
                            }}>Cleaning Services</span>
                        </h1>

                        <p className="hero-subtitle" style={{
                            fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
                            maxWidth: '950px',
                            margin: '0 auto clamp(1rem, 2vw, 2.5rem)',
                            lineHeight: '1.5',
                            textShadow: '0 2px 25px rgba(0,0,0,0.6)',
                            fontWeight: 500,
                            color: 'white',
                            letterSpacing: '0.5px',
                            padding: '0 10px'
                        }}>
                            Experience premium cleaning with eco-friendly products, professional team, and 100% satisfaction guarantee.
                        </p>

                        <Link
                            href="/contact"
                            className="hero-button"
                            style={{
                                display: 'inline-block',
                                backgroundColor: 'white',
                                color: '#2A9D8F',
                                padding: 'clamp(12px, 2vw, 20px) clamp(24px, 4vw, 56px)',
                                borderRadius: '9999px',
                                fontSize: 'clamp(0.9rem, 1.5vw, 1.8rem)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '0.5px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2A9D8F';
                                e.target.style.color = 'white';
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 30px 80px rgba(42,157,143,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = '#2A9D8F';
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 25px 70px rgba(0,0,0,0.35)';
                            }}
                        >
                            Get Free Quote
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES SECTION - MOBILE RESPONSIVE */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                style={{ padding: 'clamp(40px, 6vw, 64px) 20px', backgroundColor: '#F0F7F4' }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontSize: 'clamp(24px, 4vw, 32px)',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '8px',
                            color: '#1a2e2a'
                        }}
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            textAlign: 'center',
                            color: '#5a7a72',
                            marginBottom: 'clamp(30px, 5vw, 48px)',
                            fontSize: 'clamp(14px, 1.5vw, 18px)',
                            padding: '0 10px'
                        }}
                    >
                        Professional cleaning tailored to your needs
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="services-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'clamp(20px, 3vw, 32px)'
                        }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.3s ease',
                                    width: '100%'
                                }}
                                whileHover={{ y: -8 }}
                            >
                                <div
                                    style={{
                                        height: 'clamp(180px, 30vw, 220px)',
                                        backgroundColor: '#E8F3F0',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        className="hover:scale-105"
                                    />
                                </div>
                                <div style={{ padding: 'clamp(16px, 2vw, 24px)' }}>
                                    <h3
                                        style={{
                                            fontSize: 'clamp(18px, 2vw, 20px)',
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                            color: '#1a2e2a'
                                        }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p
                                        style={{
                                            color: '#5a7a72',
                                            margin: 0,
                                            fontSize: 'clamp(14px, 1.2vw, 16px)'
                                        }}
                                    >
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* REVIEWS SECTION */}
            {reviews.length > 0 && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    style={{
                        padding: 'clamp(40px, 6vw, 64px) 20px',
                        backgroundColor: '#FFFFFF'
                    }}
                >
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <motion.h2
                            variants={fadeUp}
                            style={{
                                fontSize: 'clamp(24px, 4vw, 32px)',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: '8px',
                                color: '#1a2e2a'
                            }}
                        >
                            What Our <span style={{ color: '#2A9D8F' }}>Clients Say</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            style={{
                                textAlign: 'center',
                                color: '#5a7a72',
                                marginBottom: 'clamp(30px, 5vw, 48px)',
                                fontSize: 'clamp(14px, 1.5vw, 18px)'
                            }}
                        >
                            Real reviews from our satisfied customers
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="reviews-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '24px'
                            }}
                        >
                            {reviews.slice(0, 6).map((review, index) => (
                                <motion.div
                                    key={review.id || index}
                                    variants={fadeUp}
                                    style={{
                                        backgroundColor: '#F0F7F4',
                                        borderRadius: '16px',
                                        padding: 'clamp(16px, 2vw, 24px)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{
                                            width: 'clamp(40px, 6vw, 48px)',
                                            height: 'clamp(40px, 6vw, 48px)',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #2A9D8F, #B8E6D9)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: 'clamp(16px, 2vw, 20px)',
                                            fontWeight: 'bold',
                                            flexShrink: 0
                                        }}>
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: '600', color: '#1a2e2a', fontSize: 'clamp(14px, 1.5vw, 16px)' }}>{review.name}</h4>
                                            <p style={{ fontSize: 'clamp(12px, 1.2vw, 13px)', color: '#5a7a72' }}>{review.location}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                                        {[...Array(review.rating || 5)].map((_, i) => (
                                            <span key={i} style={{ color: '#F59E0B', fontSize: 'clamp(16px, 1.5vw, 18px)' }}>★</span>
                                        ))}
                                    </div>
                                    <p style={{ color: '#1a2e2a', lineHeight: '1.6', fontSize: 'clamp(14px, 1.2vw, 15px)' }}>"{review.text}"</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* REVIEW FORM SECTION - MOBILE RESPONSIVE */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                style={{
                    padding: 'clamp(40px, 6vw, 64px) 20px',
                    backgroundColor: '#F0F7F4'
                }}
            >
                <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 10px' }}>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontSize: 'clamp(24px, 4vw, 28px)',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#1a2e2a',
                            marginBottom: '8px'
                        }}
                    >
                        Leave a <span style={{ color: '#2A9D8F' }}>Review</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            textAlign: 'center',
                            color: '#5a7a72',
                            marginBottom: 'clamp(24px, 3vw, 32px)',
                            fontSize: 'clamp(14px, 1.5vw, 16px)'
                        }}
                    >
                        Share your experience with us
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <form onSubmit={handleReviewSubmit} style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: 'clamp(20px, 3vw, 32px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
                        }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '16px'
                            }} className="review-grid">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={reviewForm.name}
                                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                    style={{
                                        padding: 'clamp(10px, 1.5vw, 14px) 16px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #E8F3F0',
                                        fontSize: 'clamp(13px, 1.2vw, 15px)',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#FAFDFC',
                                        width: '100%'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#2A9D8F'}
                                    onBlur={(e) => e.target.style.borderColor = '#E8F3F0'}
                                />
                                <input
                                    type="text"
                                    placeholder="Your Location (optional)"
                                    value={reviewForm.location}
                                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                                    style={{
                                        padding: 'clamp(10px, 1.5vw, 14px) 16px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #E8F3F0',
                                        fontSize: 'clamp(13px, 1.2vw, 15px)',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                        backgroundColor: '#FAFDFC',
                                        width: '100%'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#2A9D8F'}
                                    onBlur={(e) => e.target.style.borderColor = '#E8F3F0'}
                                />
                            </div>

                            {/* Star Rating */}
                            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                                <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: '#5a7a72', marginBottom: '8px' }}>Rating</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            style={{
                                                fontSize: 'clamp(24px, 4vw, 28px)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: star <= reviewForm.rating ? '#F59E0B' : '#E5E7EB',
                                                transition: 'transform 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <textarea
                                placeholder="Write your review..."
                                required
                                rows="4"
                                value={reviewForm.text}
                                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(10px, 1.5vw, 14px) 16px',
                                    borderRadius: '12px',
                                    border: '1.5px solid #E8F3F0',
                                    fontSize: 'clamp(13px, 1.2vw, 15px)',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.3s ease',
                                    backgroundColor: '#FAFDFC',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#2A9D8F'}
                                onBlur={(e) => e.target.style.borderColor = '#E8F3F0'}
                            />

                            <button
                                type="submit"
                                disabled={reviewSubmitting}
                                style={{
                                    width: '100%',
                                    marginTop: '16px',
                                    padding: 'clamp(12px, 1.5vw, 16px)',
                                    background: reviewSubmitting ? '#94A3B8' : '#2A9D8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                                    fontWeight: 600,
                                    cursor: reviewSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!reviewSubmitting) e.target.style.background = '#238276';
                                }}
                                onMouseLeave={(e) => {
                                    if (!reviewSubmitting) e.target.style.background = '#2A9D8F';
                                }}
                            >
                                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>

                            {reviewSubmitStatus && (
                                <p style={{
                                    marginTop: '12px',
                                    textAlign: 'center',
                                    fontSize: 'clamp(13px, 1.2vw, 14px)',
                                    color: reviewSubmitStatus === 'success' ? '#065F46' : '#991B1B'
                                }}>
                                    {reviewSubmitStatus === 'success' ? '✅ Thank you! Your review has been submitted for approval.' : '❌ Failed to submit review. Please try again.'}
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA SECTION - MOBILE RESPONSIVE */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                style={{
                    padding: 'clamp(40px, 6vw, 64px) 20px',
                    background: 'linear-gradient(135deg, #2A9D8F, #238276)',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontSize: 'clamp(24px, 4vw, 32px)',
                            fontWeight: 'bold',
                            marginBottom: '16px'
                        }}
                    >
                        Ready for a Clean Space?
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            marginBottom: '24px',
                            opacity: 0.9,
                            fontSize: 'clamp(14px, 1.5vw, 18px)',
                            padding: '0 10px'
                        }}
                    >
                        Contact us today for a free quote
                    </motion.p>
                    <motion.div variants={fadeUp}>
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-block',
                                backgroundColor: 'white',
                                color: '#2A9D8F',
                                padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 4vw, 40px)',
                                borderRadius: '9999px',
                                fontSize: 'clamp(14px, 1.5vw, 18px)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#B8E6D9';
                                e.target.style.color = '#1a2e2a';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = '#2A9D8F';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes fadeSlide {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) translateY(30px);
                    }
                    15% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    85% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.9) translateY(-30px);
                    }
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .review-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .services-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .reviews-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .hero-section {
                        height: 70vh !important;
                        min-height: 400px !important;
                    }
                    
                    .container-premium {
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                    }

                    .welcome-card {
                        padding: 30px 20px !important;
                    }

                    .hero-title {
                        font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
                    }

                    .hero-subtitle {
                        font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important;
                    }

                    .hero-button {
                        padding: 12px 28px !important;
                        font-size: 0.95rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .welcome-card {
                        padding: 20px 16px !important;
                    }
                    
                    .hero-title {
                        font-size: 1.6rem !important;
                    }
                    
                    .hero-subtitle {
                        font-size: 0.85rem !important;
                    }
                    
                    .hero-button {
                        padding: 10px 20px !important;
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
        </>
    );
}