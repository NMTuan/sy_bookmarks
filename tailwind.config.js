/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-03 11:42:31
 * @LastEditTime: 2022-01-16 16:04:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\tailwind.config.js
 */
module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#d23f31',
        secondPrimary: '#3b3e43'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
