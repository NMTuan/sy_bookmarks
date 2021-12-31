/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-31 08:59:21
 * @LastEditTime: 2021-12-31 09:14:38
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\utils\handler.js
 */

// url转siyuan存储路径
export const url2path = function (url, path = '/') {
    const reg = /^.*?:\/\/(.*?)\/?$/ig // 过滤掉协议头和最后的/
    if (path.indexOf('/') !== 0) {
        path = '/' + path
    }
    return path + url.replace(reg, '$1')
}

export const url2md = function (url, title = '') {
    return `[${title || url}](${url})`
}
