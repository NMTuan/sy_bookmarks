/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:03:40
 * @LastEditTime: 2022-01-01 21:41:24
 * @LastEditors: NMTuan
 * @Description: 移动
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onMoved.js
 */
import api from '@/utils/api'
import { findDocsById } from '@/utils/handler'

//     moveInfo = {
//         index: 7,
//         oldIndex: 8,
//         oldParentId: "1",
//         parentId: "1"
//     }
export default async function (id, moveInfo) {
    const parentId = moveInfo.parentId
    if (!parentId) {
        return
    }

    // 找当前文档
    const docs = await findDocsById({
        id,
        maxTime: 10
    })

    if (!docs[0]) {
        return
    }

    // 找父文档
    const parentDocs = await findDocsById({
        id: parentId
    })

    if (parentDocs.length === 0) {
        return
    }
    api.moveDoc({
        fromNotebook: docs[0].box,
        fromPath: docs[0].path,
        toNotebook: docs[0].box,
        toPath: parentDocs[0].path
    })
}
