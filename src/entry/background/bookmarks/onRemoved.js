/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:06
 * @LastEditTime: 2022-01-01 12:59:45
 * @LastEditors: NMTuan
 * @Description: 移除
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onRemoved.js
 */

import api from '@/utils/api'
import {
    sleep
} from '@/utils/handler'

// 找文档，新插入的可能无法立即找到
// 由于新插入思源的数据需要等待一下才能查到，所以这里做了延时重试。
const findDoc = ({
    id,
    maxTime = 0
}) => {
    return api.sql({
            'stmt': `SELECT * FROM blocks WHERE ial LIKE '%custom-bookMark-id=\"${id}\"%'  LIMIT 1`
        })
        .then(docs => {
            //没找到，重试
            if (docs.length === 0 && maxTime > 0) {
                maxTime--
                return sleep(findDoc, {
                    id,
                    maxTime
                })
            }
            return docs
        })
}

export default async function (id, removeInfo) {
    const docs = await findDoc({
        id,
        maxTime: 10
    })
    if (docs.length === 0) {
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
