/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 15:19:15
 * @LastEditTime: 2021-12-29 20:26:38
 * @LastEditors: NMTuan
 * @Description: api
 * @FilePath: \sy_bookmarks\src\utils\api.js
 */

import fetch from '@/utils/fetch'

// https://github.com/siyuan-note/siyuan/blob/master/API.md
const api = {
    // 列出笔记本
    lsNotebooks: '/api/notebook/lsNotebooks',
    // 打开笔记本
    openNotebook: '/api/notebook/openNotebook',
    // 关闭笔记本
    closeNotebook: '/api/notebook/closeNotebook',
    // 重命名笔记本
    renameNotebook: '/api/notebook/renameNotebook',
    // 创建笔记本
    createNotebook: '/api/notebook/createNotebook',
    // 删除笔记本
    removeNotebook: '/api/notebook/removeNotebook',
    // 获取笔记本配置
    getNotebookConf: '/api/notebook/getNotebookConf',
    // 保存笔记本配置
    setNotebookConf: '/api/notebook/setNotebookConf',

    // 通过 Markdown 创建文档
    createDocWithMd: '/api/filetree/createDocWithMd',
    // 重命名文档
    renameDoc: '/api/filetree/renameDoc',
    // 删除文档
    removeDoc: '/api/filetree/removeDoc',
    // 移动文档
    moveDoc: '/api/filetree/moveDoc',
    // 根据路径获取人类可读路径
    getHPathByPath: '/api/filetree/getHPathByPath',

    // 上传资源文件
    upload: '/api/asset/upload',

    // 插入块
    insertBlock: '/api/block/insertBlock',
    //插入前置子块
    prependBlock: '/api/block/prependBlock',
    //插入后置子块
    appendBlock: '/api/block/appendBlock',
    // 更新快
    updateBlock: '/api/block/updateBlock',
    // 删除块
    deleteBlock: '/api/block/deleteBlock',

    // 设置块属性
    setBlockAttrs: '/api/attr/setBlockAttrs',
    // 获取块属性
    getBlockAttrs: '/api/attr/getBlockAttrs',

    // SQL 查询
    sql: '/api/query/sql',

    // 渲染模板

    // 导出 Markdown 文本
    exportMdContent: '/api/export/exportMdContent',

    // 获取启动进度
    bootProgress: '/api/system/bootProgress',
    // 获取系统版本
    version: '/api/system/version',
    // 获取系统当前时间
    currentTime: '/api/system/currentTime'
}

export default Object.keys(api).reduce((total, key) => {
    total[key] = (params) => fetch(api[key], params)
    return total
}, {})
