<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:57:49
 * @LastEditTime: 2022-01-03 19:05:54
 * @LastEditors: NMTuan
 * @Description: 蓝图
 * @FilePath: \sy_bookmarks\src\views\options\roadmap.vue
-->
<template>
    <div>
        <div
            v-for="(item, index) in roadMapList"
            :key="`rm${index}`"
            class="flex items-center mb-2"
        >
            <input
                type="checkbox"
                disabled
                class="mr-2"
                :checked="item[1] === 1"
            />
            {{ item[0] }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            roadMapList: [
                ['同步书签至笔记本。', 1],
                ['监听书签的添加、编辑、移动、删除。', 1],
                ['搜索思源数据']
            ]
        }
    }
}
</script>
