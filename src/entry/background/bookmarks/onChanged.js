/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 15:04:26
 * @LastEditTime: 2022-01-01 22:31:52
 * @LastEditors: NMTuan
 * @Description: 修改
 * @FilePath: \sy_bookmarks\src\entry\background\bookmarks\onChanged.js
 */

import api from '@/utils/api'
import { findDocsById, url2md } from '@/utils/handler'

//     changeInfo = {
//         title: "百度翻译-200种语言互译、沟通全世界！1",
//         url: "https://fanyi.baidu.com/"
//     }

export default async function (id, changeInfo) {
    const isFolder = changeInfo.url === undefined
    const docs = await findDocsById({
        id,
        maxTime: 10
    })

    if (!docs[0]) {
        return
    }

    // 找文档的属性
    const attrs = await api.getBlockAttrs({
        id: docs[0].id
    })

    const newAttrs = {}
    newAttrs['custom-bookMark-title'] = changeInfo.title

    if (isFolder) {
        // 文件夹要重命名
        api.renameDoc({
            notebook: docs[0].box,
            path: docs[0].path,
            title: changeInfo.title
        })
    } else {
        // 文档要修改block
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

        newAttrs['custom-bookMark-url'] = changeInfo.url
    }

    // 更新文档属性
    api.setBlockAttrs({
        id: docs[0].id,
        attrs: newAttrs
    })
}
