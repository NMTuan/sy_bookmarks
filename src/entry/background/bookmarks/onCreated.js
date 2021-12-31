/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2021-12-31 17:29:12
 * @LastEditors: NMTuan
 * @Description: 添加书签
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onCreated.js
 */
import api from '@/utils/api'
import {
    url2path,
    url2md
} from '@/utils/handler'

//     bookmark = {
//         dateAdded: 1640653298335,
//         id: "1342",
//         index: 17,
//         parentId: "459",
//         title: "百度翻译-200种语言互译、沟通全世界！",
//         url: "https://fanyi.baidu.com/"
//     }
export default function (id, bookmark) {
    chrome.storage.sync.get(['noteBookId'], async ({
        noteBookId
    }) => {
        if (!noteBookId) {
            new Error('请先选择保存位置')
            return
        }

        // 插入文档
        const docId = await api.createDocWithMd({
            notebook: noteBookId,
            path: url2path(bookmark.url),
            markdown: url2md(bookmark.url, bookmark.title),
        })
        if (!docId) {
            return
        }

        // 找到子块，记录子块id，后续修改操作使用。
        const findBlocks = async (maxTime = 0) => {
            if (maxTime <= 0) {
                return
            }
            maxTime--
            const blocks = await api.sql({
                "stmt": `SELECT * FROM blocks WHERE root_id = '${docId}' AND parent_id <> '' LIMIT 1`
            })
            if (blocks.length === 0) {
                setTimeout(() => {
                    findBlocks(maxTime)
                }, 1000)
                return
            }
            // 设置文档属性
            await api.setBlockAttrs({
                id: docId,
                attrs: {
                    'custom-type': 'bookmark',
                    'custom-bookMark-id': bookmark.id,
                    'custom-bookMark-url': bookmark.url,
                    'custom-bookMakr-title': bookmark.title.toString(),
                    'custom-bookMark-dateAdded': bookmark.dateAdded.toString(),
                    'custom-bookMark-blockId': blocks[0].id,
                }
            })
        }

        findBlocks(10);
    })
}
