<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-03 17:22:52
 * @LastEditTime: 2022-01-03 18:25:17
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\components\formItem.vue
-->
<template>
    <div class="text-sm mb-4">
        <div v-if='title'>{{ title }}</div>
        <slot>
            <input
                type="text"
                class="border my-1 px-4 py-1 w-64 border-gray-300 rounded"
                :value="value"
                @input="$emit('input', $event.target.value)"
            />
        </slot>
        <div class="text-gray-400">
            <slot name="tips" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    }
}
</script>
