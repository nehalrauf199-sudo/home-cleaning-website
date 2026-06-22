'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
    { src: '/gallery-1.jpg', alt: 'Clean Home' },
    { src: '/gallery-2.jpg', alt: 'Clean Office' },
    { src: '/gallery-3.jpg', alt: 'Clean Carpet' },
    { src: '/gallery-4.jpg', alt: 'Clean Windows' },
    { src: '/gallery-5.jpg', alt: 'Deep Cleaning' },
    { src: '/gallery-6.jpg', alt: 'Premium Service' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function Gallery() {
    return (
        <section className="section-padding bg-white">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">Gallery</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                        Our <span className="text-[#2563EB]">Work</span>
                    </h2>
                    <p className="text-lg text-[#111827]/60 leading-relaxed mt-2">
                        See the quality of our premium cleaning services
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            className="relative h-64 rounded-[20px] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gray-200">
                                {/* Placeholder - replace with actual images */}
                                <div className="w-full h-full bg-gradient-to-br from-[#2563EB]/20 to-[#10B981]/20 flex items-center justify-center">
                                    <span className="text-4xl opacity-30">📸</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="font-semibold">{image.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}