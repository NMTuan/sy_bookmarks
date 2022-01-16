/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-15 23:01:03
 * @LastEditTime: 2022-01-15 23:09:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\plugins\highlighter.js
 */
import Highlighter from 'web-highlighter'

const highlighter = {}

highlighter.install = function (Vue) {
    Vue.prototype.hl = new Highlighter()
    Vue.prototype.HL = Highlighter
}

export default highlighter
