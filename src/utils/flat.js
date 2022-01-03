/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-30 14:50:52
 * @LastEditTime: 2022-01-01 22:48:02
 * @LastEditors: NMTuan
 * @Description: 拍平
 * @FilePath: \sy_bookmarks\src\utils\flat.js
 */

// 把对象拍平

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
export const faltObject = function (data = {}, parent = '', total = {}) {
    return Object.keys(data).reduce((total, key) => {
        const p = !parent ? key : `${parent}/${key}`
        if (typeof data[key] === 'object') {
            faltObject(data[key], p, total)
        } else {
            total[p] = data[key]
        }
        return total
    }, total)
}

// 把数组拍平
// [children: []]
export const faltArray = (tree, total = [], childrenKey = 'children') => {
    return tree.reduce((total, item) => {
        if (item[childrenKey]) {
            faltArray(item[childrenKey], total)
        }
        const clone = JSON.parse(JSON.stringify(item))
        delete clone[childrenKey]
        total.push(clone)
        return total
    }, total)
}
