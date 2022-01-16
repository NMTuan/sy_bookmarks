<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-01-08 16:43:53
 * @LastEditTime: 2022-01-16 17:18:07
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \sy_bookmarks\src\views\content.vue
-->
<template>
    <div
        ref="syPopover"
        v-show="popoverStatus"
        class="sy_popover"
        :style="popoverStyle"
    >
        <div class="sy_popover__button">标记</div>
        <div class="sy_popover__button">评论</div>
        <div class="sy_popover__button">等等</div>
        <div class="sy_popover__button">等等</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            popoverStatus: false, // 显示状态
            popoverPos: {
                // 位置
                x: 0,
                y: 0
            }
        }
    },
    computed: {
        popover() {
            return this.$refs.syPopover
        },
        popoverStyle() {
            return {
                top: this.popoverPos.y + 'px',
                left: this.popoverPos.x + 'px'
            }
        }
    },
    mounted() {
        window.addEventListener('pointerup', (e) => {
            const selection = document.getSelection()
            this.popoverStatus = !selection.isCollapsed
            setTimeout(() => {
                // 水平位置， 超出窗口右侧，按窗口右侧-容器宽度算， 20为滚动条的尺寸
                if (window.innerWidth < e.pageX + this.popover.offsetWidth) {
                    this.popoverPos.x =
                        window.innerWidth - this.popover.offsetWidth - 20
                } else {
                    this.popoverPos.x = e.pageX
                }

                //垂直位置，超出窗口上沿，按窗口滚动高度算， 48为当前行上方一行左右
                if (window.scrollY > e.pageY - 48) {
                    this.popoverPos.y = window.scrollY + 48
                } else {
                    this.popoverPos.y = e.pageY - 48
                }
                console.log(selection)
            }, 100)
        })
        // this.hl.run()
        this.hl.on(this.HL.event.CREATE, (context) => {
            console.log(1, context)
        })
    }
}
</script>
<style lang="scss" scoped>
.sy_popover {
    // @apply   divide-x  transition-all;
    display: flex;
    background-color: #3b3e43;
    border-radius: 4px; // 0.25rem
    overflow: hidden;
    color: #fff;
    opacity: 0.75;
    line-height: 1;
    user-select: none;
    position: absolute;
    z-index: 50;
    transition: all 0.15;
    &:hover {
        opacity: 1;
        z-index: 65535;
    }
    font-size: 16px;
    &__button {
        flex-shrink: 0;
        font-size: 12px; // 0.75rem/* 12px */;
        line-height: 16px; // 1rem/* 16px */;
        padding: 8px 12px; // 0.5rem  0.75rem
        cursor: pointer;
        &:hover {
            background-color: #d23f31;
        }
    }
}
</style>
