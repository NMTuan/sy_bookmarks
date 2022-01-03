<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 08:46:21
 * @LastEditTime: 2022-01-03 16:59:50
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\views\options.vue
-->
<template>
    <div>
        <div class="mx-auto mt-10 max-w-6xl rounded bg-white shadow">
            <div class="text-2xl p-6 pt-8">
                {{ manifest.name }}
                <sup class="text-sm">{{ manifest.version }}</sup>
            </div>
            <div class="flex bg-gray-100">
                <router-link class="px-8 py-4" :class="current('/')" to="/"
                    >设置</router-link
                >
                <router-link
                    class="px-8 py-4"
                    :class="current('/about')"
                    to="/about"
                    >关于</router-link
                >
                <router-link
                    class="px-8 py-4"
                    :class="current('/roadmap')"
                    to="/roadmap"
                    >蓝图</router-link
                >
                <router-link
                    class="px-8 py-4"
                    :class="current('/log')"
                    to="/log"
                    >日志</router-link
                >
            </div>
            <router-view class="px-6 py-8" />
        </div>
        <div class='my-4 text-center text-sm text-gray-600'>
            <a href="https://b3log.org/siyuan/" class='mx-4' target="_blank">siyuan</a>
            <a href="https://github.com/NMTuan/sy_bookmarks" class='mx-4' target="_blank">github</a>
        </div>
    </div>
</template>

<script>
import manifest from '@/manifest.json'
export default {
    name: 'options',
    data() {
        return {
            msg: 'options',
            manifest: {}
        }
    },
    mounted() {
        this.manifest = manifest
    },
    methods: {
        current(path) {
            let className = ''
            if (this.$route.path === path) {
                className = 'bg-primary text-white'
            }
            return className
        }
    }
}
</script>
<style>
body {
    @apply bg-gray-100 overflow-y-scroll;
    font-size: 100%;
}
</style>
