/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2021-12-31 07:46:23
 * @LastEditors: NMTuan
 * @Description: 添加书签
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onCreated.js
 */
import api from '@/utils/api'

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
        const params = {
            "notebook": noteBookId,
            "path": "/" + bookmark.url,
            "markdown": bookmark.url
        }
        console.log(params)
        api.createDocWithMd(params)
            .then(res => {
                console.log('1', res)
            })

    })
}

// chrome.bookmarks.onCreated.addListener(function (id, bookmark) {
//     console.log('onCreated', id, bookmark)
//     // 1340
//     bookmark = {
//         dateAdded: 1640653298335,
//         id: "1342",
//         index: 17,
//         parentId: "459",
//         title: "百度翻译-200种语言互译、沟通全世界！",
//         url: "https://fanyi.baidu.com/"
//     }
// });
