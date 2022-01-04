/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-31 08:59:21
 * @LastEditTime: 2022-01-04 14:58:24
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\src\utils\handler.js
 */
import api from '@/utils/api'

// url转siyuan存储路径 传参：bookmark对象
export const url2path = async function (bookmark) {
    let { title, parentId } = JSON.parse(JSON.stringify(bookmark))

    let path = '/'
    // 找文档，取文档的hpath，末尾加/，防止多加替换一下。
    // 0的是根目录，不用找
    if (parentId !== '0') {
        const docs = await findDocsById({
            id: parentId,
            maxTime: 10
        })
        if (docs[0]) {
            path = `${docs[0].hpath}/`.replace('//', '/')
        }
    }
    return path + title.replaceAll('/', '-') // 斜杠为目录，所以要过滤掉title中的斜杠
    // 过滤掉协议头；过滤掉query参数前面的/；过滤掉query参数；
    // const reg = /^.*?:\/\/(.*?)\/?(\?.*)?$/gi
    // 有url，则用url做路径，没有则用title（文件夹）
    // return path + (url ? url.replace(reg, '$1') : title)
}

// 创建GFM Markdown格式的超链接
export const url2md = function (url, title = '') {
    return `[${title || url}](${url})`
}

// 异步延时
export const sleep = (fn, payload, timer = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fn(payload)), timer)
    })
}

// 根据 bookmarkId 找到 doc
export const findDocsById = async ({ id, maxTime = 0 }) => {
    const { noteBookId } = await getStorage(['noteBookId'])
    return api
        .sql({
            // eslint-disable-next-line no-useless-escape
            stmt: `SELECT * FROM blocks WHERE box = '${noteBookId}' AND ial LIKE '%custom-bookMark-id=\"${id}\"%'  LIMIT 1`
        })
        .then(async (docs) => {
            //没找到，重试
            if (docs.length === 0 && maxTime > 0) {
                maxTime--
                return sleep(await findDocsById, {
                    id,
                    maxTime
                })
            }
            return docs
        })
}

// 根据 docId 找到 block
const findChildBlocksById = ({ id, maxTime = 0 }) => {
    return api
        .sql({
            stmt: `SELECT * FROM blocks WHERE root_id = '${id}' AND parent_id <> '' LIMIT 1`
        })
        .then((blocks) => {
            if (blocks.length === 0 && maxTime > 0) {
                maxTime--
                return sleep(findChildBlocksById, {
                    id,
                    maxTime
                })
            }
            return blocks
        })
}

// 循环插入文档
export const insertDocWithBookmarks = async ({ bookmarks, index = 0 }) => {
    window.postMessage({ syncIndex: index }, '*')
    if (index >= bookmarks.length) {
        return 
    }
    // 跳过root
    if (bookmarks[index].id === '0') {
        await insertDocWithBookmarks({
            bookmarks,
            index: ++index
        })
        return
    }
    console.log('------------------')
    console.log('开始同步第几条：', index)
    const findDocs = await findDocsById({
        id: bookmarks[index].id
    })
    console.log('是否已存在：', findDocs.length)
    // 如果存在，不延时，直接下一条
    if (findDocs.length > 0) {
        console.log('跳过')
        console.log('------------------')
        await insertDocWithBookmarks({
            bookmarks,
            index: ++index
        })
        return
    }
    console.log('开始插入')
    await insertDoc(bookmarks[index])
    console.log('插入完毕')
    console.log('------------------')
    return sleep(await insertDocWithBookmarks, {
        bookmarks,
        index: ++index
    })
}

// 把chrome.storage.sync.get的方法转为promise
const getStorage = (payload = []) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(payload, (res) => {
            resolve(res)
        })
    })
}
// const setStorage = (payload = []) => {
//     return new Promise((resolve) => {
//         chrome.storage.sync.set(payload, (res) => {
//             resolve(res)
//         })
//     })
// }

// 插入文档
export const insertDoc = async (bookmark) => {
    // const d = new Date().getTime()
    // console.log('开始写入', new Date().getTime() - d)
    const { noteBookId } = await getStorage(['noteBookId'])
    // console.log('取笔记本', new Date().getTime() - d)
    if (!noteBookId) {
        return
    }
    //是否为文件夹
    const isFolder = !bookmark.url
    // 构建数据体
    const data = {}
    data.notebook = noteBookId
    // console.log('url2path 1', new Date().getTime() - d)
    data.path = await url2path(bookmark)
    // console.log('url2path 2', new Date().getTime() - d)
    if (isFolder) {
        data.markdown = ''
    } else {
        data.markdown = url2md(bookmark.url, bookmark.title)
    }
    // 插入文档，并创建一个默认块（超链接）
    // console.log('createDocWithMd 1', new Date().getTime() - d)
    const docId = await api.createDocWithMd(data)
    // console.log('createDocWithMd 2', new Date().getTime() - d)
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
        attrs['icon'] = '1f4c1'
    } else {
        // console.log('findChildBlocksById 2', new Date().getTime() - d)
        // 找插入的那个默认块
        const blocks = await findChildBlocksById({
            id: docId,
            maxTime: 10
        })
        // console.log('findChildBlocksById 2', new Date().getTime() - d)

        attrs['custom-bookMark-url'] = bookmark.url
        attrs['icon'] = '1f517'
        attrs['custom-bookMark-blockId'] =
            Array.isArray(blocks) && blocks[0] ? blocks[0].id : ''
    }

    // console.log('setBlockAttrs', new Date().getTime() - d)
    return await api.setBlockAttrs({
        id: docId,
        attrs
    })
    // console.log('写入完毕', new Date().getTime() - d)
    // console.log('------------------')
}
