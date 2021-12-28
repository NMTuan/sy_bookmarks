/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 21:21:16
 * @LastEditTime: 2021-12-29 06:51:57
 * @LastEditors: NMTuan
 * @Description: api插件
 * @FilePath: \sy_bookmarks\src\plugins\api.js
 */

import fetch from '@/utils/fetch'
import api from '@/utils/api'

const plugin = {}

plugin.install = function (Vue) {
    Vue.prototype.api = Object.keys(api).reduce((total, key) => {
        total[key] = (params) => fetch(api[key], params)
        return total
    }, {})
}

export default plugin
