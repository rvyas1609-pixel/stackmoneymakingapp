import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a1428',
          secondary: '#0d1b2a',
          card: '#132d44',
          elevated: '#1a3a52',
        },
        border: '#2d5a7a',
        gold: {
          DEFAULT: '#d4af37',
          light: '#e6c547',
          dark: '#c9a961',
        },
        'dark-blue': {
          DEFAULT: '#0f2f4f',
          light: '#1e40af',
        },
        'gold-glow': '#d4af37',
        accent: '#e6c547',
        text: {
          primary: '#ffffff',
          secondary: '#c9b8a0',
          muted: '#7a8a9a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #d4af37, #e6c547)',
        'gradient-luxury': 'linear-gradient(135deg, #0a1428, #1a3a52, #d4af37)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212,175,55,0.5)',
        'premium': '0 20px 60px rgba(212,175,55,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
