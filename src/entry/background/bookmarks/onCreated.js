/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 11:57:11
 * @LastEditTime: 2021-12-30 15:03:14
 * @LastEditors: NMTuan
 * @Description: 添加书签
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onCreated.js
 */
// import api from '@/utils/api'

export default function (id, bookmark) {
    console.log(321, id, bookmark)
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
