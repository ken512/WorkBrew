/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './public/**/*.html',  
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'], // Pacificoフォントを追加
      },
      colors: {
        'tan-300': '#D2B48C',
        'custom-red': '#F66464',
        'custom-blue': '#1B8DFF',
        'custom-green': '#1EF0BC',
        "custom-orange": '#F5A623',
        "customOrange": '#C95807',
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

