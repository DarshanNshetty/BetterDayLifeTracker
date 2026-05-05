/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)' },
                    '50%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
            },
            backdropFilter: {
                'xs': 'blur(2px)',
                'sm': 'blur(4px)',
                'md': 'blur(8px)',
                'lg': 'blur(12px)',
                'xl': 'blur(16px)',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}