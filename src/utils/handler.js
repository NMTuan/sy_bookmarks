/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-31 08:59:21
 * @LastEditTime: 2022-01-01 21:42:48
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\src\utils\handler.js
 */
import api from '@/utils/api'

// url转siyuan存储路径 传参：bookmark对象
export const url2path = function ({ url, title, parentId }) {
    let path = '/'
    if (parentId === '1') {
        path += '书签栏/'
    }
    if (parentId === '2') {
        path += '其它书签/'
    } else {
        // TODO 根据parentId找到路径
    }
    const reg = /^.*?:\/\/(.*?)\/?$/gi // 过滤掉协议头和最后的/
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

// 根据 bookmarkId 找到 doc
export const findDocsById = ({ id, maxTime = 0 }) => {
    return api
        .sql({
            stmt: `SELECT * FROM blocks WHERE ial LIKE '%custom-bookMark-id=\"${id}\"%'  LIMIT 1`
        })
        .then((docs) => {
            //没找到，重试
            if (docs.length === 0 && maxTime > 0) {
                maxTime--
                return sleep(findDocsById, {
                    id,
                    maxTime
                })
            }
            return docs
        })
}
