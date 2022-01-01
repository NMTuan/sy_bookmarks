/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 08:46:21
 * @LastEditTime: 2022-01-01 21:41:49
 * @LastEditors: NMTuan
 * @Description: 后台
 * @FilePath: \sy_bookmarks\src\entry\background.js
 */
import { faltObject } from '@/utils/flat'

// 事件处理
const handleEvents = {}
// 循环事件处理的独立文件
const eventFiles = require.context('./background', true, /\.js$/)
eventFiles.keys().map((path) => {
    const fileName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    handleEvents[fileName] = eventFiles(path).default
})

// 消息处理
const handleMessage = {
    // 切换事件的监听
    // 是否对chrome.bookmarks[eventName]开启、关闭事件监听
    // 监听的处理方法是handleEvents[eventName]
    changeListener({
        eventName, // 事件名称
        add // 是否添加监听
    }) {
        const chromeMethod = eventName.split('/').reduce((total, key) => {
            return total === undefined ? total : total[key]
        }, chrome)
        const handleMethod = handleEvents[eventName]
        // 如果不存在相关方法， 退出
        if (!chromeMethod || !handleMethod) {
            return
        }
        // 先检测是否已经监听
        const state = chromeMethod.hasListener(handleMethod)
        // // 如果已监听， 并且不是添加， 则执行：移除监听
        if (state && !add) {
            chromeMethod['removeListener'](handleMethod)
        }
        // // 如果未监听， 并且要添加， 则执行：添加监听
        if (!state && add) {
            chromeMethod['addListener'](handleMethod)
        }
    }
}

// 监听消息
// 如果handleMessage中存在action方法，则带payload参数去执行
chrome.runtime.onMessage.addListener(function ({
    action, // 动作
    payload // 数据
}) {
    if (handleMessage[action]) {
        handleMessage[action](payload)
    }
})

// 读本地配置
chrome.storage.sync.get(
    [
        // "baseUrl",
        // "token",
        // "noteBooks",
        // "noteBooksUpdateAt",
        // "noteBookId",
        'listenner'
    ],
    ({
        // baseUrl,
        // token,
        // noteBooks,
        // noteBooksUpdateAt,
        // noteBookId,
        listenner
    }) => {
        // 初始化事件， 为开启的配置， 手工执行监听
        const lestenerFlat = faltObject(listenner)
        Object.keys(lestenerFlat || {}).forEach((key) => {
            handleMessage['changeListener']({
                eventName: key,
                add: lestenerFlat[key]
            })
        })
    }
)

// 手工执行监听：点击扩展图标
handleMessage['changeListener']({
    eventName: 'browserAction/onClicked',
    add: true
})
