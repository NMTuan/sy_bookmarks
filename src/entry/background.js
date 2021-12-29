/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 08:46:21
 * @LastEditTime: 2021-12-30 07:29:29
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\entry\background.js
 */

import api from '@/utils/api'
console.log(api)

// 事件处理
const handleEvents = {
    // 添加书签
    onCreated() {
        console.log(123)
        // api.lsNotebooks()
        //     .then(res => {
        //         console.log('res', res)
        //     })
    }
}

// 切换事件的监听
// const changeListener = function (eventName, add) {
//     console.log('change', eventName, add)
// }

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request);
    console.log(sender);
    sendResponse(JSON.stringify({
        a: 1
    }));
});

// 点击扩展
chrome.browserAction.onClicked.addListener(function (tab) {
    console.log('onClicked', tab)
    chrome.runtime.openOptionsPage((res) => {
        console.log(res)
    })
});

// 修改书签
// 注意： 修改位置时，监听不到
chrome.bookmarks.onChanged.addListener(function (id, changeInfo) {
    console.log('onChanged', id, changeInfo)
    changeInfo = {
        title: "百度翻译-200种语言互译、沟通全世界！1",
        url: "https://fanyi.baidu.com/"
    }
});

// 顺序改变 没找到触发事件
chrome.bookmarks.onChildrenReordered.addListener(function (id, reorderInfo) {
    console.log('onChildrenReordered', id, reorderInfo)

});

// 添加
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

// 移动
chrome.bookmarks.onMoved.addListener(function (id, moveInfo) {
    console.log('onMoved', id, moveInfo)
    moveInfo = {
        index: 7,
        oldIndex: 8,
        oldParentId: "1",
        parentId: "1"
    }
});

// 移除
chrome.bookmarks.onRemoved.addListener(function (id, removeInfo) {
    console.log('onMoved', id, removeInfo)
    removeInfo = {
        index: 8,
        node: {
            dateAdded: 1640653826094,
            id: "1343",
            title: "百度翻译-200种语言互译、沟通全世界！",
            url: "https://fanyi.baidu.com/",
        },

        parentId: "1"
    }

});


// 读配置
chrome.storage.sync.get(
    [
        // "baseUrl",
        // "token",
        // "noteBooks",
        // "noteBooksUpdateAt",
        // "noteBookId",
        "eventSwitch",
    ],
    ({
        // baseUrl,
        // token,
        // noteBooks,
        // noteBooksUpdateAt,
        // noteBookId,
        eventSwitch,
    }) => {
        // 初始化事件
        console.log(eventSwitch)
        Object.keys(eventSwitch).forEach(key => {
            if (eventSwitch[key]) {
                chrome.bookmarks[key].addListener(handleEvents[key])
            }
        })
    }
);
