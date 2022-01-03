/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 08:46:21
 * @LastEditTime: 2022-01-01 21:41:53
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\src\entry\options.js
 */
import Vue from 'vue'
import App from '@/views/options.vue'
import router from '@/router/options.js'
import api from '@/plugins/api'
import '@/assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(api)

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
