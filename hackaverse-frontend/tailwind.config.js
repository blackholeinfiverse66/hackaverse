/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0D1128',
        'navy': '#15193B',
        'purple-primary': '#BF40BF',
        'magenta-primary': '#C030D8',
        'cyan-accent': '#00F2EA',
        'text-light': '#EAEAF2',
        // Legacy support
        'bhiv-black': '#0D1128',
        'uni-white': '#ffffff',
        'accent-cyan': '#00F2EA',
        'accent-purple': '#BF40BF',
        'accent-gold': '#ffd700',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #BF40BF, #00F2EA)',
        'gradient-glow': 'linear-gradient(135deg, #C030D8, #00F2EA)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(191, 64, 191, 0.3), 0 0 60px rgba(0, 242, 234, 0.2)',
        'glow-cyan': '0 0 40px rgba(0, 242, 234, 0.4)',
        'glow-purple': '0 0 40px rgba(191, 64, 191, 0.4)',
      },
    },
  },
  plugins: [],
}

