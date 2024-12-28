/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './public/**/*.html',  
  ],
  theme: {
    extend: {
      colors: {
        'tan-300': '#D2B48C',
        beige: {
          200: '#F5F5DC', // ここに希望の色を設定します
        },
      },
      screens: {
        'sm': {'min': '375px', 'max': '430px'},  // スマホの範囲
        'md': {'min': '768px', 'max': '1024px'}, // タブレットの範囲
      },
    },
  },
  plugins: [],
}

