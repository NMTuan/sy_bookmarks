/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:26
 * @LastEditTime: 2022-01-01 15:41:00
 * @LastEditors: NMTuan
 * @Description: 修改
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onChanged.js
 */

import api from '@/utils/api'
import {
    url2md,
} from '@/utils/handler'

//     changeInfo = {
//         title: "百度翻译-200种语言互译、沟通全世界！1",
//         url: "https://fanyi.baidu.com/"
//     }

export default async function (id, changeInfo) {
    const docs = await api.sql({
        "stmt": `SELECT * FROM blocks WHERE ial LIKE '%custom-bookMark-id=\"${id}\"%' LIMIT 1`
    })

    if (!docs[0]) {
        return
    }

    // 找文档的属性
    const attrs = await api.getBlockAttrs({
        id: docs[0].id
    })

    // 找文档中，记录超链接的块id
    if (!attrs['custom-bookMark-blockId']) {
        return
    }

    // 更新块的内容
    api.updateBlock({
        id: attrs['custom-bookMark-blockId'],
        dataType: 'markdown',
        data: url2md(changeInfo.url, changeInfo.title)
    })

    // 更新文档属性
    api.setBlockAttrs({
        id: docs[0].id,
        attrs: {
            'custom-type': 'bookMark',
            'custom-bookMark-id': attrs['custom-bookMark-id'],
            'custom-bookMark-url': changeInfo.url,
            'custom-bookMakr-title': changeInfo.title,
            'custom-bookMark-dateAdded': attrs['custom-bookMark-dateAdded'],
            'custom-bookMark-blockId': attrs['ustom-bookMark-blockId'],
        }
    })
}
