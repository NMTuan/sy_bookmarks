/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-08 15:37:45
 * @LastEditTime: 2022-01-08 23:15:21
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\entry\content.js
 */

import Vue from 'vue'
import App from '@/views/content.vue'
import '@/assets/tailwind.css'

let element = document.createElement('div');
let attr = document.createAttribute('id');
attr.value = 'sy_bookmarks';
element.setAttributeNode(attr);
document.getElementsByTagName('body')[0].appendChild(element);

new Vue({
    render: h => h(App)
}).$mount("#sy_bookmarks");
