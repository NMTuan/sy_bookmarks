<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:57:49
 * @LastEditTime: 2022-01-03 17:01:16
 * @LastEditors: NMTuan
 * @Description: 日志
 * @FilePath: \sy_bookmarks\src\views\options\log.vue
-->
<template>
    <div>
        <dl>
            <dt>2022.01.02 <sup>v1.0.0</sup></dt>
            <dd>完成基本功能逻辑，尝试打包并提交应用市场。</dd>
            <dt>2021.12.27</dt>
            <dd>
                尝试调用 api ，验证 idea 可行性。<br />
                边学 chrome 扩展开发，边尝试开发。
            </dd>
            <dt>2021.10</dt>
            <dd>
                初次接触思源笔记，看到有 api 机制，感觉同步浏览器书签的 idea
                终于可以落地了。
            </dd>
        </dl>
    </div>
</template>
<style lang="scss" scoped>
dt {
    @apply mb-2 pl-3 border-l-4 border-primary;
}
dd {
    @apply mb-8;
}
sup {
    @apply px-2 ml-2 rounded bg-gray-400 text-white text-xs;
}
</style>
