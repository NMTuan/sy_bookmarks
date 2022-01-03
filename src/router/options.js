/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:48:49
 * @LastEditTime: 2022-01-03 14:37:40
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\src\router\options.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '设置',
        component: () => import('../views/options/index.vue')
    },
    {
        path: '/about',
        name: '关于',
        component: () => import('../views/options/about.vue')
    },
    {
        path: '/roadmap',
        name: '蓝图',
        component: () => import('../views/options/roadmap.vue')
    },
    {
        path: '/log',
        name: '日志',
        component: () => import('../views/options/log.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
