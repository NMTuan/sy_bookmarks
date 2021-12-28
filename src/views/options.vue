<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 08:46:21
 * @LastEditTime: 2021-12-28 14:04:04
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\views\options.vue
-->
<template>
  <div class="main_app">
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'options',
  data() {
    return {
      msg: 'options',
    }
  },
}
</script>
<style>
body {
  font-size: 100%;
}
</style>
