/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './public/**/*.html',  
  ],
  theme: {
    extend: {
<<<<<<< HEAD
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
=======
      colors: {
        'tan-300': '#D2B48C',
>>>>>>> parent of bed149f (Merge pull request #3 from ken512/feature/user_account)
        beige: {
          200: '#F5F5DC', // ここに希望の色を設定します
        },
      },
      screens: {
        sm: {'min': '360px', 'max': '600px'},  // スマホの範囲
        md: {'min': '601px', 'max': '1024px'}, // タブレットの範囲
        lg: {'min':'1024px', 'max':'1440px'}, //ノートPC
      },
    },
  },
  plugins: [],
}

