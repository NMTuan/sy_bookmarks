/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 15:23:42
 * @LastEditTime: 2021-12-28 20:24:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\plugins\fetch.js
 */
const fetch = {}

import api from '@/utils/api.js'

// const f = function (url, params) {
//     return new Promise((resolve, reject) => {
//         fetch(url, {
//                 method: 'post',
//                 headers: {
//                     Authorization: 'Token ',
//                 },
//                 body: JSON.stringify(params)
//             })
//             .then((res) => {
//                 if (res.status === 200) {
//                     return res.json()
//                 } else {
//                     throw res
//                 }
//             })
//             .then((res) => {
//                 resolve(res)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

fetch.install = function (Vue, options = {}) {
    console.log(api, options)
    // Vue.prototype.fetch = function (url, params){
    //     fetch()
    // }
}

export default fetch
