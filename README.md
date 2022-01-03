<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-03 11:42:31
 * @LastEditTime: 2022-01-03 20:05:43
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \sy_bookmarks\README.md
-->

![icon128.png](https://s2.loli.net/2022/01/03/2YrBPLAgoR1zfu6.png)

# 思源书签

思源书签：未经官方授权个人开发的第三方插件。

计划上架 chrome 插件市场 和 edge 插件市场，目前还在等审。

该插件仅对您浏览器的书签做读取和监听操作，不会做任何修改操作，所以 Ta 不会搞乱你的收藏夹。

但该插件会对您的思源笔记进行写入和编辑操作，建议您选择一个新的笔记本进行尝试，以免搞乱笔记数据。

如果您有多个浏览器的书签要维护，请为每个浏览器单独创建一个笔记本，以免造成数据缺失与混乱。

感谢 D & V 出品的思源笔记。

## 预览

![Snipaste_2022-01-02_23-10-57.png](https://s2.loli.net/2022/01/03/Yn8GrJFzp14WfRt.png)

## 如何使用

安装插件后，会自动打开设置页面，根据指引配置即可。

### 未上架应用市场前该如何使用？

如果您本地有 node.js 开发环境，可检出项目，执行`npm run build`打包插件。
然后在浏览器的“[扩展程序](chrome://extensions/)”页面，选择“加载已解压的扩展程序”，找到打包后生成的`dist`目录即可。

如果您本地没有 node.js 开发环境，可在[release](https://github.com/NMTuan/sy_bookmarks/releases)页面下载最新的`dist`文件，解压到本地。然后在浏览器的“[扩展程序](chrome://extensions/)”页面，选择“加载已解压的扩展程序”，找到解压后的`dist`目录即可。

## 致谢

-   思源笔记
-   Vue.js
