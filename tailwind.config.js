/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#FAF7F2',
        blush:   '#FFF0F5',
        petal:   '#F4A7B9',
        'petal-dark': '#E8809A',
        gold:    '#E8B86D',
        'gold-dark': '#C8943A',
        navy:    '#1A1F4B',
        'navy-mid': '#2D2460',
        'navy-light': '#3D3085',
        sakura:  '#6B4B8A',
        ink:     '#3D3450',
        muted:   '#8A7A9B',
        leaf:    '#8DB87A',
        star:    '#F5C842',
        border:  'rgba(244,167,185,0.35)',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        lato:   ['Lato', 'sans-serif'],
      },
      animation: {
        'float':    'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'twinkle':  'twinkle 3s ease-in-out infinite',
        'fall':     'fall 7s linear infinite',
        'fade-up':  'fadeUp 0.6s ease forwards',
        'spin-slow':'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.4)' },
        },
        fall: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '0' },
          '10%':  { opacity: '0.7' },
          '90%':  { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
