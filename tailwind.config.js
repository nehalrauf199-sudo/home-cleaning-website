/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'soft-blue': '#E8F4FD',
                'soft-green': '#E8F5E9',
                'aqua': '#B2EBF2',
                'primary-blue': '#0288D1',
                'primary-blue-dark': '#01579B',
                'primary-green': '#388E3C',
                'primary-green-light': '#4CAF50',
                'light-gray': '#F5F5F5',
                'warm-white': '#FAFAFA',
            },
            fontFamily: {
                'elegant': ['Georgia', 'serif'],
            },
            animation: {
                'fade-slide': 'fadeSlide 4s ease-in-out forwards',
                'fade-in': 'fadeIn 0.8s ease-in forwards',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                fadeSlide: {
                    '0%': { opacity: 0, transform: 'translateY(-30px)' },
                    '20%': { opacity: 1, transform: 'translateY(0)' },
                    '80%': { opacity: 1, transform: 'translateY(0)' },
                    '100%': { opacity: 0, transform: 'translateY(-30px)' },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}