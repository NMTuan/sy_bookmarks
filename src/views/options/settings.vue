<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:58:56
 * @LastEditTime: 2021-12-29 17:27:28
 * @LastEditors: NMTuan
 * @Description: 设置
 * @FilePath: \sy_bookmarks\src\views\options\Settings.vue
-->
<template>
  <div>
    <h2>设置</h2>
    <h3>1. 配置api信息</h3>
    <div>
      <div>思源笔记 url 地址：</div>
      <input type="text" class="border w-96 p-2" v-model="baseUrl" />
      <div>默认为：http://192.168.192.110:6806</div>
    </div>

    <div>
      <div>思源笔记 API token：</div>
      <input type="text" class="border w-96 p-2" v-model="token" />
      <div>打开思源笔记的“设置（alt+p）”，切换至“关于”页签，即可找到</div>
    </div>
    <button @click="lsNotebooks" class="p-2 border">获取笔记本列表</button>

    <hr />
    <h3>2. 选择保存位置</h3>
    <ul>
      <li v-for="(item, index) in noteBooks" :key="`nb${index}`">
       <label>
          <input type="radio" name="noteBook" :value="item.id" v-model="noteBook">
          {{item.name}}
        </label>
      </li>
    </ul>
    <hr>
    <pre>{{$data}}</pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: "", // 思源笔记本 url 地址
      token: "", // 思源笔记本 api token
      noteBooks: [], // 笔记本列表
      noteBook: ''  // 选中的笔记本
    };
  },
  mounted() {
    chrome.storage.sync.get(["baseUrl", "token"], ({ baseUrl, token }) => {
      this.baseUrl = baseUrl || "http://192.168.192.110:6806";
      this.token = token || "";
    });
  },
  watch: {
    baseUrl(value) {
      chrome.storage.sync.set({
        baseUrl: value,
      });
    },
    token(value) {
      chrome.storage.sync.set({
        token: value,
      });
    },
  },
  methods: {
    // 获取笔记本
    lsNotebooks() {
      this.api
        .lsNotebooks()
        .then((res) => {
          this.noteBooks = res.data.notebooks;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
