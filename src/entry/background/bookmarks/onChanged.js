/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:26
 * @LastEditTime: 2021-12-31 16:43:18
 * @LastEditors: NMTuan
 * @Description: 修改
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onChanged.js
 */

/**
 * 1. 通过bookmarkId找到doc和自定义属性
 * 2. 通过doc的自定义属性拼接出[title](url)，sql找到该subDoc。修改成新的[title](url)
 * 3. 修改doc的自定义属性为新的数据
 */

import api from '@/utils/api'

//     changeInfo = {
//         title: "百度翻译-200种语言互译、沟通全世界！1",
//         url: "https://fanyi.baidu.com/"
//     }
chrome.bookmarks.onChanged.addListener(async function (id, changeInfo) {
    console.log('onChanged', id, changeInfo)

    const docs = await api.sql({
        "stmt": `SELECT * FROM blocks WHERE ial LIKE '%custom-type=\"bookmark\"%custom-bookMark-id=\"${id}\"%' LIMIT 1`
    })

    console.log('docs', docs)
    const doc = docs[0] || {}

    const attrs = await api.getBlockAttrs({
        id: doc.id
    })
    console.log('attrs', attrs)
    
    const md = `[${attrs['custom-bookMakr-title']}](${attrs['custom-bookMark-url']})`

    console.log(md)
    const blocks = await api.sql({
        "stmt": `SELECT * FROM blocks WHERE markdown = '${md}' LIMIT 1`
    })
    console.log(blocks)

    // 找文档
    // api.sql({
    //         "stmt": `SELECT * FROM blocks WHERE ial LIKE '%custom-type=\"bookmark\"%custom-id=\"${id}\"%' LIMIT 99`
    //     })
    //     .then(res => {
    //         console.log('sql', res)
    //         if (res.code !== 0 || res.data.length === 0) {
    //             return
    //         }
    //         const docId = res.data[0].id
    //         // 找自定义属性
    //         return api.getBlockAttrs({
    //             id: docId
    //         })
    //     })
    //     .then(res => {
    //         console.log('getBlockAttrs', res)
    //         if (res.code !== 0 || res.data.length === 0) {
    //             return
    //         }
    //     })
});
