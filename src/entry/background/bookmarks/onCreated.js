/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2022-01-02 20:33:05
 * @LastEditors: NMTuan
 * @Description: 添加书签
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onCreated.js
 */
import { insertDoc } from '@/utils/handler'

//     bookmark = {
//         dateAdded: 1640653298335,
//         id: "1342",
//         index: 17,
//         parentId: "459",
//         title: "百度翻译-200种语言互译、沟通全世界！",
//         url: "https://fanyi.baidu.com/"
//     }

export default function (id, bookmark) {
    insertDoc(bookmark)
}
