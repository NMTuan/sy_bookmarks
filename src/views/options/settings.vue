<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-12-28 13:58:56
 * @LastEditTime: 2021-12-31 11:39:07
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

    <h3>3. 同步配置</h3>
    <div>3.1 手工同步：同步目前收藏夹数据至所选笔记本</div>
    <div>3.2 监听</div>
    <div>
      <label>
        <input
          type="checkbox"
          name="listennerBookmarks"
          v-model="listenner.bookmarks.onCreated"
        />
        新增书签时，同步至笔记本
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          name="listennerBookmarks"
          v-model="listenner.bookmarks.onRemoved"
        />
        删除书签时，同步至笔记本（添加删除标记，并不会删除内容）
      </label>
    </div>
    <pre>{{ listenner }}</pre>
  </div>
</template>
<script>
import flat from "@/utils/flat";
export default {
  data() {
    return {
      baseUrl: "", // 思源笔记本 url 地址
      token: "", // 思源笔记本 api token
      noteBooks: [], // 笔记本列表
      noteBooksUpdateAt: 0, //笔记本列表更新时间
      noteBookId: "", // 选中的笔记本
      eventSwitch: {}, // 事件开关
      // 监听事件
      listenner: {
        bookmarks: {},
      },
    };
  },
  mounted() {
    chrome.storage.sync.get(
      [
        "baseUrl",
        "token",
        "noteBooks",
        "noteBooksUpdateAt",
        "noteBookId",
        "listenner",
      ],
      ({
        baseUrl,
        token,
        noteBooks,
        noteBooksUpdateAt,
        noteBookId,
        listenner,
      }) => {
        this.baseUrl = baseUrl || "http://192.168.192.110:6806";
        this.token = token || "";
        this.noteBooks = noteBooks || [];
        this.noteBooksUpdateAt = noteBooksUpdateAt || 0;
        this.noteBookId = noteBookId || "";
        this.listenner = listenner || {
          bookmarks: {},
        };
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
    listennerStatus(value, old) {
      // 保存新值
      chrome.storage.sync.set({
        listenner: value,
      });
      const valueFlat = flat(value);
      const oldFlat = flat(old);
      // 循环对比，仅触发变更的事件
      Object.keys(valueFlat).forEach((key) => {
        if (valueFlat[key] !== oldFlat[key]) {
          chrome.runtime.sendMessage({
            action: "changeListener",
            payload: {
              eventName: key,
              add: valueFlat[key],
            },
          });
        }
      });
    },
  },
  computed: {
    listennerStatus() {
      // 为了watch能对比出变换的 key
      return JSON.parse(JSON.stringify(this.listenner));
    },
  },
  methods: {
    // 获取笔记本
    lsNotebooks() {
      this.api
        .lsNotebooks()
        .then((res) => {
          this.noteBooks = res.notebooks;
          this.noteBooksUpdateAt = new Date().getTime();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  @apply font-bold;
}
h3 {
  @apply my-4 font-bold bg-gray-200;
}
input,
button {
  @apply border-gray-400;
}
</style>
