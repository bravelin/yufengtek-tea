<template>
    <div class="panel-tools">
        <i class="iconfont full-icon" v-html="full ? '&#xe621;' : '&#xe629;'" @click="change()"></i>
        <i class="iconfont download-icon" @click="download()">&#xe620;</i>
    </div>
</template>
<script>
    export default {
        name: 'PlaneTools',
        props: {
            full: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            change () {
                const that = this
                that.$emit('change', !that.full)
            },
            download () { // 下载成图片
                const that = this
                const el = that.$el
                const pNode = el.parentNode
                let canvas = pNode.querySelector('.plane-content canvas')
                if (!canvas) {
                    canvas = pNode.querySelector('.wuyishan-map-container canvas')
                }
                if (!canvas) {
                    return
                }
                const title = pNode.querySelector('.plane-title')
                const fileName = title ? title.innerText : Math.random().toString(36).substr(2) // 获取图片文件名称

                // 在offlineCanvas上绘制，不然没有背景色
                const offlineCanvas = document.createElement('canvas')
                offlineCanvas.width = canvas.width
                offlineCanvas.height = canvas.height
                const ctx = offlineCanvas.getContext('2d')
                ctx.fillStyle = 'rgba(18, 35, 87, 0.98)'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)

                // 创建download元素，下载完删除之
                const domA = document.createElement('a')
                domA.download = fileName
                domA.href = offlineCanvas.toDataURL('image/png')
                document.body.appendChild(domA)
                domA.click()
                domA.remove()
            }
        }
    }
</script>