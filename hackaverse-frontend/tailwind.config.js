/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Consolidated theme colors (deduped)
        'bg-primary': '#0A0F25',
        'bg-secondary': '#121A3A',
        'bg-card': '#1A2445',
        'text-primary': '#FFFFFF',
        'text-secondary': '#E6E6FA',
        'text-muted': '#B0B0C0',
        'cyan': '#00CED1',
        'cyan-light': '#00F2EA',
        'violet': '#8A2BE2',
        'lime': '#32CD32',
        'success': '#32CD32',
        'warning': '#FF8C00',
        'error': '#FF4500',
        'deep-navy': '#0A0F25',
        'navy': '#121A3A',
        'primary-purple': '#8A2BE2',
        'primary-magenta': '#DC143C',
        'secondary-cyan': '#00CED1',
        'accent-gold': '#FFD700',
        'success-green': '#32CD32',
        'warning-orange': '#FF8C00',
        'error-red': '#FF4500',
        // Brand palettes
        'brand': {
          '50': '#ECF3FF',
          '200': '#9EC2FF',
          '400': '#6CCAFF',
          '500': '#4AA8FF',
          '600': '#338AFF',
          '700': '#1B6AEC'
        },
        'plasma': {
          '400': '#8A6CFF',
          '500': '#7C4DFF'
        },
        'ink': {
          '900': '#0B1422',
          '800': '#0F1C2C'
        },
        'panel': {
          'bg': 'rgba(255,255,255,0.03)',
          'border': 'rgba(255,255,255,0.10)'
        },
        // Legacy / utility
        'bhiv-black': '#0D1128',
        'uni-white': '#FFFFFF',
        'accent-cyan': '#00F2EA',
        'accent-purple': '#BF40BF',
        'charcoal': '#0D1128',
        'gunmetal': '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8A2BE2, #00CED1)',
        'gradient-glow': 'linear-gradient(135deg, #DC143C, #00CED1)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(138, 43, 226, 0.3), 0 0 60px rgba(0, 206, 209, 0.2)',
        'glow-cyan': '0 0 40px rgba(0, 206, 209, 0.4)',
        'glow-purple': '0 0 40px rgba(138, 43, 226, 0.4)',
        'card': '0 10px 30px -15px rgba(0,0,0,.6)',
        'glow-brand': '0 0 0 1px rgba(108,202,255,.25), 0 10px 30px -12px rgba(124,77,255,.35)'
      },
    },
  },
  plugins: [],
}