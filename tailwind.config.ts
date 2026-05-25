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
        bg: '#0C0C0B',
        surface: '#141413',
        card: '#1C1C1A',
        border: 'rgba(255,255,255,0.07)',
        'border-hover': 'rgba(255,255,255,0.13)',
        text: {
          primary: '#F2F0E8',
          secondary: '#8A8880',
          tertiary: '#3E3C3A',
        },
        gold: '#C8A869',
        'gold-bg': 'rgba(200,168,105,0.1)',
        'gold-border': 'rgba(200,168,105,0.3)',
        green: '#34C792',
        'green-bg': 'rgba(52,199,146,0.1)',
        'green-border': 'rgba(52,199,146,0.3)',
        blue: '#6B9EFF',
        'blue-bg': 'rgba(107,158,255,0.1)',
        red: '#FF6B6B',
        'red-bg': 'rgba(255,107,107,0.1)',
        purple: '#A78BFA',
        'purple-bg': 'rgba(167,139,250,0.1)',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease both',
        spin: 'spin 0.7s linear infinite',
        dot: 'dot 0.9s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        dot: {
          '0%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
