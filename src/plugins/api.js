/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 21:21:16
 * @LastEditTime: 2021-12-29 20:18:44
 * @LastEditors: NMTuan
 * @Description: api插件
 * @FilePath: \sy_bookmarks\src\plugins\api.js
 */

import api from '@/utils/api'

const plugin = {}

plugin.install = function (Vue) {
    Vue.prototype.api = api
}

export default plugin
