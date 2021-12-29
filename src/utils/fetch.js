/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 20:28:02
 * @LastEditTime: 2021-12-29 17:21:46
 * @LastEditors: NMTuan
 * @Description: 异步
 * @FilePath: \sy_bookmarks\src\utils\fetch.js
 */

export default function (url, params = {}) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['baseUrl', 'token'], ({
            baseUrl,
            token
        }) => {
            if (!baseUrl) {
                reject(new Error('missing siyuan api url'))
                return
            }
            if (!token) {
                reject(new Error('missing siyuan api token'))
                return
            }
            fetch(baseUrl + url, {
                    method: 'post',
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                    body: JSON.stringify(params),
                })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw res
                    }
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    })
}
