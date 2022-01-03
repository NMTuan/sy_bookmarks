<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:58:56
 * @LastEditTime: 2022-01-03 19:14:41
 * @LastEditors: NMTuan
 * @Description: 设置
 * @FilePath: \sy_bookmarks\src\views\options\index.vue
-->
<template>
    <div>
        <h3>配置api信息</h3>
        <form-item title="思源笔记 url 地址" v-model="baseUrl">
            <template #tips>默认为：http://192.168.192.110:6806</template>
        </form-item>

        <form-item title="思源笔记 API token" v-model="token">
            <template #tips>
                打开思源笔记的“设置（alt+p）”，切换至“关于”页签，即可找到
            </template>
        </form-item>

        <form-item title="选择笔记本" v-model="token">
            <button
                @click="lsNotebooks"
                class="mr-4 px-4 py-1 rounded text-sm bg-primary text-white cursor-pointer hover:bg-opacity-90"
            >
                获取笔记本
            </button>
            <select
                name=""
                v-model="noteBookId"
                class="border my-1 px-4 py-1 w-64 border-gray-300 rounded"
            >
                <option
                    v-for="(item, index) in noteBooks"
                    :key="`nb${index}`"
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
            <template #tips>
                先点击“获取笔记本”按钮，然后选择书签的保存位置。
            </template>
        </form-item>

        <h3 class="mt-10">
            选择初始化方式
            <span class="ml-10" v-if="syncIndex !== syncMax"
                >{{ syncIndex }} / {{ syncMax }}</span
            >
        </h3>
        <div class="mb-4 flex items-center">
            <button
                @click="init"
                class="px-4 py-1 rounded text-sm bg-primary text-white cursor-pointer hover:bg-opacity-90"
            >
                初始化
            </button>
            <span
                class="inline-block px-1 ml-2 bg-gray-400 text-white rounded-full leading-none text-center"
            >
                ?
            </span>
            <span class="text-gray-400 text-sm ml-2">
                仅生成浏览器默认的两个目录（书签栏、其它书签）；添加书签时，若找不到父节点，则会添加至根目录。
            </span>
        </div>
        <div class="mb-4 flex items-center">
            <button
                @click="sync"
                class="px-4 py-1 rounded text-sm bg-primary text-white cursor-pointer hover:bg-opacity-90"
            >
                同步
            </button>
            <span
                class="inline-block px-1 ml-2 bg-gray-400 text-white rounded-full leading-none text-center"
            >
                ?
            </span>
            <span class="text-gray-400 text-sm ml-2">
                同步浏览器所有书签，如果书签量比较大，可能需要花一些时间。
            </span>
        </div>

        <h3 class="mt-10">配置同步规则</h3>
        <div class="text-sm mb-2">
            <label>
                <input
                    type="checkbox"
                    name="listennerBookmarks"
                    v-model="listenner.bookmarks.onCreated"
                />
                新增书签时，同步至笔记本
            </label>
        </div>
        <div class="text-sm mb-2">
            <label>
                <input
                    type="checkbox"
                    name="listennerBookmarks"
                    v-model="listenner.bookmarks.onRemoved"
                />
                删除书签时，同步至笔记本（仅添加【已删除】标记，并不会删除数据）
            </label>
        </div>
        <div class="text-sm mb-2">
            <label>
                <input
                    type="checkbox"
                    name="listennerBookmarks"
                    v-model="listenner.bookmarks.onChanged"
                />
                修改书签时，同步至笔记本（建议 siyuan v1.6.0+）
            </label>
        </div>
        <div class="text-sm mb-2">
            <label>
                <input
                    type="checkbox"
                    name="listennerBookmarks"
                    v-model="listenner.bookmarks.onMoved"
                />
                移动书签时，同步至笔记本
            </label>
        </div>
    </div>
</template>
<script>
import { faltObject, faltArray } from '@/utils/flat'
import { insertDocWithBookmarks } from '@/utils/handler'
import formItem from '@/components/formItem.vue'

export default {
    components: { formItem },
    data() {
        return {
            baseUrl: '', // 思源笔记本 url 地址
            token: '', // 思源笔记本 api token
            noteBooks: [], // 笔记本列表
            noteBookId: '', // 选中的笔记本
            eventSwitch: {}, // 事件开关
            // 监听事件
            listenner: {
                bookmarks: {}
            },
            syncMax: 0,
            syncIndex: 0
        }
    },
    mounted() {
        chrome.storage.sync.get(
            [
                'baseUrl',
                'token',
                'noteBooks',
                'noteBookId',
                'listenner'
            ],
            ({
                baseUrl,
                token,
                noteBooks,
                noteBookId,
                listenner
            }) => {
                this.baseUrl = baseUrl || 'http://192.168.192.110:6806'
                this.token = token || ''
                this.noteBooks = noteBooks || []
                this.noteBookId = noteBookId || ''
                this.listenner = listenner || {
                    bookmarks: {}
                }
            }
        )

        // 接收其它脚本发来的事件
        window.addEventListener(
            'message',
            (e) => {
                const data = e.data || {}
                // 更新同步进度
                if (data.syncIndex !== undefined) {
                    this.syncIndex = data.syncIndex
                }
            },
            false
        )
    },
    watch: {
        baseUrl(value) {
            chrome.storage.sync.set({
                baseUrl: value
            })
        },
        token(value) {
            chrome.storage.sync.set({
                token: value
            })
        },
        noteBooks(value) {
            chrome.storage.sync.set({
                noteBooks: value
            })
        },
        noteBookId(value) {
            chrome.storage.sync.set({
                noteBookId: value
            })
        },
        listennerStatus(value, old) {
            // 保存新值
            chrome.storage.sync.set({
                listenner: value
            })
            const valueFlat = faltObject(value)
            const oldFlat = faltObject(old)
            // 循环对比，仅触发变更的事件
            Object.keys(valueFlat).forEach((key) => {
                if (valueFlat[key] !== oldFlat[key]) {
                    chrome.runtime.sendMessage({
                        action: 'changeListener',
                        payload: {
                            eventName: key,
                            add: valueFlat[key]
                        }
                    })
                }
            })
        }
    },
    computed: {
        listennerStatus() {
            // 为了watch能对比出变换的 key
            return JSON.parse(JSON.stringify(this.listenner))
        }
    },
    methods: {
        // 获取笔记本
        lsNotebooks() {
            this.api
                .lsNotebooks()
                .then((res) => {
                    this.noteBooks = res.notebooks
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        // 初始化笔记本
        init() {
            // 插入两个文件夹，书签栏，其它书签
            chrome.bookmarks.getChildren('0', async (bookmarks) => {
                this.syncMax = bookmarks.length
                bookmarks.sort((a, b) => {
                    return a.id - b.id
                })
                insertDocWithBookmarks({ bookmarks })
            })
        },
        // 同步所有书签
        sync() {
            chrome.bookmarks.getTree(async (res) => {
                const bookmarks = faltArray(res)
                this.syncMax = bookmarks.length
                bookmarks.sort((a, b) => {
                    return a.id - b.id
                })
                insertDocWithBookmarks({ bookmarks })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
h3 {
    @apply mb-4 pl-3 border-l-4 border-primary;
}
button {
    @apply border-gray-400;
}
</style>
