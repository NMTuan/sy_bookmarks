/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 14:50:52
 * @LastEditTime: 2022-01-01 21:42:40
 * @LastEditors: NMTuan
 * @Description: 把对象拍平
 * @FilePath: \sy_bookmarks\src\utils\flat.js
 */
// {
//     a: {
//         b: {
//             c: {
//                 d: 1
//             }
//         },
//         e: 2,
//     }
// }
// result
// {
//     'a/b/c/d': 1,
//     'a/e': 2
// }

const flat = function (data = {}, parent = '', total = {}) {
    return Object.keys(data).reduce((total, key) => {
        const p = !parent ? key : `${parent}/${key}`
        if (typeof data[key] === 'object') {
            flat(data[key], p, total)
        } else {
            total[p] = data[key]
        }
        return total
    }, total)
}

export default flat
