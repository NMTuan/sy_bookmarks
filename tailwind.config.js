/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-03 11:42:31
 * @LastEditTime: 2022-01-03 16:29:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\tailwind.config.js
 */
module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#d23e30'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
