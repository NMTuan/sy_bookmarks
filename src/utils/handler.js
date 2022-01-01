/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-31 08:59:21
 * @LastEditTime: 2022-01-01 16:39:45
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\utils\handler.js
 */

// url转siyuan存储路径
export const url2path = function ({
    url,
    title,
    parentId
}) {
    let path = '/';
    if (parentId === '1') {
        path += '书签栏/'
    }
    if (parentId === '2') {
        path += '其它书签/'
    } else {
        // TODO 根据parentId找到路径
    }
    const reg = /^.*?:\/\/(.*?)\/?$/ig // 过滤掉协议头和最后的/
    // 有url，则用url做路径，没有则用title（文件夹）
    return path + (url ? url.replace(reg, '$1') : title)
}

export const url2md = function (url, title = '') {
    return `[${title || url}](${url})`
}

// 异步延时
export const sleep = (fn, payload, timer = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fn(payload)), timer)
    })
}
