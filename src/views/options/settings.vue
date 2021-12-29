<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:58:56
 * @LastEditTime: 2021-12-30 07:36:43
 * @LastEditors: NMTuan
 * @Description: 设置
 * @FilePath: \sy_bookmarks\src\views\options\settings.vue
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
          <input
            type="radio"
            name="noteBook"
            :value="item.id"
            v-model="noteBookId"
          />
          {{ item.name }}
        </label>
      </li>
    </ul>
    <hr />

    <h3>3. 同步配置</h3>
    <div>3.1 手工同步：同步目前收藏夹数据至所选笔记本</div>
    <div>3.2 监听</div>
    <div>
      <label>
        <input
          type="checkbox"
          name="eventSwitch"
          value="onCreated"
          v-model="eventSwitch.onCreated"
        />
        新增书签时，同步至所选笔记本
      </label>
    </div>
    <pre>{{ eventSwitch }}</pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: "", // 思源笔记本 url 地址
      token: "", // 思源笔记本 api token
      noteBooks: [], // 笔记本列表
      noteBooksUpdateAt: 0, //笔记本列表更新时间
      noteBookId: "", // 选中的笔记本
      eventSwitch: {}, // 事件开关
    };
  },
  mounted() {
    // const bg = chrome.extension.getBackgroundPage();
    // console.log("bg", bg.abc);
    chrome.storage.sync.get(
      [
        "baseUrl",
        "token",
        "noteBooks",
        "noteBooksUpdateAt",
        "noteBookId",
        "eventSwitch",
      ],
      ({
        baseUrl,
        token,
        noteBooks,
        noteBooksUpdateAt,
        noteBookId,
        eventSwitch,
      }) => {
        this.baseUrl = baseUrl || "http://192.168.192.110:6806";
        this.token = token || "";
        this.noteBooks = noteBooks || [];
        this.noteBooksUpdateAt = noteBooksUpdateAt || 0;
        this.noteBookId = noteBookId || "";
        this.eventSwitch = eventSwitch || {};
      }
    );
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
    noteBooks(value) {
      chrome.storage.sync.set({
        noteBooks: value,
      });
    },
    noteBooksUpdateAt(value) {
      chrome.storage.sync.set({
        noteBooksUpdateAt: value,
      });
    },
    noteBookId(value) {
      chrome.storage.sync.set({
        noteBookId: value,
      });
    },
    eventSwitchStatus: {
      deep: true,
      handler(value, old) {
        console.log(value, old);
        // 保存新值
        chrome.storage.sync.set({
          eventSwitch: value,
        });
        // 循环对比，仅触发变更的事件
        chrome.runtime.sendMessage({ abc: 123 }, function (response) {
          console.log("收到来自后台的回复：" + response);
        });
      },
    },
  },
  computed: {
    eventSwitchStatus() {
      // 为了watch能对比出变换的 key
      return JSON.parse(JSON.stringify(this.eventSwitch));
    },
  },
  methods: {
    // 获取笔记本
    lsNotebooks() {
      this.api
        .lsNotebooks()
        .then((res) => {
          this.noteBooks = res.data.notebooks;
          this.noteBooksUpdateAt = new Date().getTime();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
