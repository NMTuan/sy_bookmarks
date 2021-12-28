/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:48:49
 * @LastEditTime: 2021-12-28 14:02:51
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
    name: 'Index',
    component: ()=> import('../views/options/index.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/options/settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
