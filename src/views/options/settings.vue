<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:58:56
 * @LastEditTime: 2021-12-29 07:05:16
 * @LastEditors: NMTuan
 * @Description: 设置
 * @FilePath: \sy_bookmarks\src\views\options\settings.vue
-->
<template>
  <div>
    <h2>设置</h2>
    <div>
      <div>思源笔记 url 地址：</div>
      <input type="text" class="border" v-model="url" />
      <div>默认为：http://192.168.192.110:6806</div>
    </div>

    <div>
      <div>思源笔记 API token：</div>
      <input type="text" class="border" v-model="token" />
      <div>默认为：http://192.168.192.110:6806</div>
    </div>

    <button @click="handleAccess">接入</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: '',
      token: ''
    }
  },
  mounted(){
    const url = localStorage.getItem('syUrl')
    const token = localStorage.getItem('syToken')
    this.url = url || 'http://192.168.192.110:6806'
    this.token = token || ''
  },
  watch: {
    url(value){
      console.log('watch url', value)
      localStorage.setItem('syUrl', value)
    },
    token(value){
      console.log('watch token', value)
      localStorage.setItem('syToken', value)
    }
  },
  methods: {
    // 尝试接入
    handleAccess() {
      this.api.lsNotebooks()
      .then(res=>{
        console.log('res', res)
      })
      .catch(err=>{
        console.log('err', err)
      })
    },
  },
}
</script>
