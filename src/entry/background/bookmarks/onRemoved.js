/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:06
 * @LastEditTime: 2022-01-01 20:53:40
 * @LastEditors: NMTuan
 * @Description: 移除
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onRemoved.js
 */

import api from '@/utils/api'
import {
    findDocsById,
} from '@/utils/handler'


export default async function (id, removeInfo) {
    const docs = await findDocsById({
        id,
        maxTime: 10
    })

    if (!docs[0]) {
        return
    }

    // 如果找到，则标记为删除
    if (Array.isArray(docs) && docs[0].box) {
        api.renameDoc({
            notebook: docs[0].box,
            path: docs[0].path,
            title: `[已删除]${docs[0].content}`
        })
    }
}
