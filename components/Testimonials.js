'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Sarah Ahmed',
        location: 'Karachi',
        text: 'Absolutely outstanding service! CleanHome transformed my entire home. The team was professional, thorough, and incredibly detailed.',
        rating: 5,
        avatar: '/avatar-1.jpg'
    },
    {
        name: 'Usman Khan',
        location: 'Lahore',
        text: 'Best cleaning service I have ever used. They removed stains I thought were permanent. My carpets look brand new!',
        rating: 5,
        avatar: '/avatar-2.jpg'
    },
    {
        name: 'Fatima Ali',
        location: 'Islamabad',
        text: 'The office cleaning service is exceptional. Our workplace has never been this clean and organized. Highly recommended!',
        rating: 5,
        avatar: '/avatar-3.jpg'
    },
    {
        name: 'Ahmed Raza',
        location: 'Karachi',
        text: 'I hired them for deep cleaning before moving in. The attention to detail was amazing. Worth every penny!',
        rating: 5,
        avatar: '/avatar-4.jpg'
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const testimonial = testimonials[currentIndex];

    return (
        <section className="section-padding bg-[#F8FAFC]">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                        What Our <span className="text-[#2563EB]">Clients Say</span>
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-xl text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-full bg-[#2563EB] mx-auto mb-6 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-3xl font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-[#F59E0B] text-2xl">★</span>
                                    ))}
                                </div>

                                {/* Text - FIXED: Removed extra quotes */}
                                <p className="text-xl md:text-2xl text-[#111827] leading-relaxed mb-6">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                {/* Name */}
                                <p className="font-bold text-[#111827] text-lg">{testimonial.name}</p>
                                <p className="text-[#111827]/60">{testimonial.location}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-[#2563EB] w-8'
                                        : 'bg-[#2563EB]/20 hover:bg-[#2563EB]/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}