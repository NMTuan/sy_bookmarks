/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2022-01-01 21:41:18
 * @LastEditors: NMTuan
 * @Description: 添加书签
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onCreated.js
 */
import api from '@/utils/api'
import { url2path, url2md, sleep } from '@/utils/handler'

const findBlocks = ({ id, maxTime = 0 }) => {
    return api
        .sql({
            stmt: `SELECT * FROM blocks WHERE root_id = '${id}' AND parent_id <> '' LIMIT 1`
        })
        .then((blocks) => {
            if (blocks.length === 0 && maxTime > 0) {
                maxTime--
                return sleep(findBlocks, {
                    id,
                    maxTime
                })
            }
            return blocks
        })
}

//     bookmark = {
//         dateAdded: 1640653298335,
//         id: "1342",
//         index: 17,
//         parentId: "459",
//         title: "百度翻译-200种语言互译、沟通全世界！",
//         url: "https://fanyi.baidu.com/"
//     }

export default function (id, bookmark) {
    chrome.storage.sync.get(['noteBookId'], async ({ noteBookId }) => {
        if (!noteBookId) {
            // new Error('请先选择保存位置')
            return
        }

        const isFolder = !bookmark.url && bookmark.dateGroupModified
        // 构建数据体
        const data = {}
        data.notebook = noteBookId
        data.path = url2path(bookmark)
        if (!isFolder) {
            data.markdown = url2md(bookmark.url, bookmark.title)
        } else {
            data.markdown = ''
        }
        // 插入文档，并创建一个默认块（超链接）
        const docId = await api.createDocWithMd(data)
        if (!docId) {
            // new Error('插入文档异常')
            return
        }

        // 设置文档属性
        const attrs = {}
        attrs['custom-type'] = 'bookMark'
        attrs['custom-bookMark-id'] = bookmark.id
        attrs['custom-bookMark-title'] = bookmark.title.toString()
        attrs['custom-bookMark-dateAdded'] = bookmark.dateAdded.toString()

        if (isFolder) {
            attrs['custom-bookMark-dateGroupModified'] =
                bookmark.dateGroupModified.toString()
        } else {
            // 找插入的那个默认块
            const blocks = await findBlocks({
                id: docId,
                maxTime: 10
            })
            attrs['custom-bookMark-url'] = bookmark.url
            attrs['custom-bookMark-blockId'] =
                Array.isArray(blocks) && blocks[0] ? blocks[0].id : ''
        }

        await api.setBlockAttrs({
            id: docId,
            attrs
        })
    })
}
