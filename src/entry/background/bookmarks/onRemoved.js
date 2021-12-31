/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:06
 * @LastEditTime: 2021-12-31 10:39:29
 * @LastEditors: NMTuan
 * @Description: 移除
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onRemoved.js
 */

import api from '@/utils/api'

// 删除， bookmarkId， 重试次数
// 由于新插入思源的数据需要等待一下才能查到，所以这里做了延时重试。
const remove = (id, maxTime = 0) => {
    if (maxTime === 0) {
        return
    }
    maxTime--
    api.sql({
            'stmt': `SELECT * FROM blocks WHERE ial LIKE '%custom-type=\"bookmark\"%custom-id=\"${id}\"%'  LIMIT 1`
        })
        .then(res => {
            // {
            //     "code": 0,
            //     "msg": "",
            //     "data": [{
            //         "alias": "",
            //         "box": "20211227104254-a0gvhbc",
            //         "content": "extensions-zp4tqre",
            //         "created": "20211231101040",
            //         "hash": "62b7551",
            //         "hpath": "/extensions-zp4tqre",
            //         "ial": "{: id=\"20211231101040-6gv0bae\" title=\"extensions-zp4tqre\" updated=\"20211231101040\" custom-url=\"chrome://extensions/\" custom-title=\"扩展程序\" custom-dateAdded=\"1640916744134\" custom-type=\"bookmark\" custom-id=\"1376\"}",
            //         "id": "20211231101040-6gv0bae",
            //         "length": 0,
            //         "markdown": "",
            //         "memo": "",
            //         "name": "",
            //         "parent_id": "",
            //         "path": "/20211231101040-6gv0bae.sy",
            //         "root_id": "20211231101040-6gv0bae",
            //         "sort": 0,
            //         "subtype": "",
            //         "type": "d",
            //         "updated": "20211231101040"
            //     }]
            // }
            if (res.code !== 0 || res.data.length === 0) {
                setTimeout(() => {
                    remove(id, maxTime)
                }, 1000)
                return
            }
            api.renameDoc({
                notebook: res.data[0].box,
                path: res.data[0].path,
                title: `[已删除]${res.data[0].content}`
            })
        })
}

//     removeInfo = {
//         index: 8,
//         node: {
//             dateAdded: 1640653826094,
//             id: "1343",
//             title: "百度翻译-200种语言互译、沟通全世界！",
//             url: "https://fanyi.baidu.com/",
//         },

//         parentId: "1"
//     }

chrome.bookmarks.onRemoved.addListener(function (id, removeInfo) {
    remove(id, 10)
});
