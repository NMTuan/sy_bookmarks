/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2021-12-31 10:13:42
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
    chrome.storage.sync.get([
        'noteBookId'
    ], ({
        noteBookId
    }) => {
        if (!noteBookId) {
            new Error('请先选择保存位置')
            return
        }
        console.log(321, id, bookmark, location)
        // 插入文档
        api.createDocWithMd({
                "notebook": noteBookId,
                "path": url2path(bookmark.url),
                "markdown": url2md(bookmark.url, bookmark.title)
            })
            .then(res => {
                const docId = res.data

                // 保存属性
                return api.setBlockAttrs({
                    id: docId,
                    attrs: {
                        'custom-type': 'bookmark',
                        'custom-id': bookmark.id,
                        'custom-url': bookmark.url,
                        'custom-title': bookmark.title.toString(),
                        'custom-dateAdded': bookmark.dateAdded.toString()
                    }
                })
            })
            .then(() => {})
    })
}
