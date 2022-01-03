/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-27 17:26:58
 * @LastEditTime: 2022-01-03 17:18:57
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\vue.config.js
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')

// Generate pages object
const pages = {}

function getEntryFile(entryPath) {
    let files = fs.readdirSync(entryPath)
    return files
}

const chromeName = getEntryFile(path.resolve(`src/entry`))

function getFileExtension(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
chromeName.forEach((name) => {
    const fileExtension = getFileExtension(name)
    const fileName = name.replace('.' + fileExtension, '')
    pages[fileName] = {
        entry: `src/entry/${name}`,
        template: 'public/index.html',
        filename: `${fileName}.html`
    }
})

module.exports = {
    pages,
    filenameHashing: false,
    configureWebpack: {
        plugins: [
            CopyWebpackPlugin([
                {
                    // from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
                    from: path.resolve(`src/manifest.json`),
                    to: `${path.resolve('dist')}/manifest.json`
                }
            ])
        ],
        output: {
            filename: `js/[name].js`,
            chunkFilename: `[name].js`
        }
    },

    // 关闭sourceMap
    productionSourceMap: false
}
