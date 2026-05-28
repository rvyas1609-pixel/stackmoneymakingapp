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
          card: '#132d44',
          elevated: '#1a3a52',
        },
        gold: {
          DEFAULT: '#d4af37',
          accent: '#e6c547',
        },
        text: {
          primary: '#ffffff',
          secondary: '#c9b8a0',
        },
        border: '#2d5a7a',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #d4af37 0%, #e6c547 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a1428 0%, #132d44 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #0a1428 0%, #1a3a52 50%, #d4af37 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'premium': '0 10px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
