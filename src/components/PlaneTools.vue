<template>
    <div class="panel-tools">
        <i class="iconfont full-icon" v-html="full ? '&#xe621;' : '&#xe629;'" @click="change()" ></i>
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
        created() {
            
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
                let canvasDoms = pNode.querySelectorAll('.plane-content canvas')
                if (!canvasDoms.length) {
                    canvasDoms = pNode.querySelectorAll('.wuyishan-map-container canvas')
                }
                if (!canvasDoms.length) {
                    return
                }
                const title = pNode.querySelector('.plane-title')
                const fileName = title ? title.innerText : Math.random().toString(36).substr(2) // 获取图片文件名称
                let allWidth = 0
                let allHeight = 0
                canvasDoms.forEach(item => {
                    if (item.height > allHeight) {
                        allHeight = item.height
                    }
                    allWidth += item.width
                })
                // 20px的边距
                allWidth += 40 + 10 * (canvasDoms.length - 1)
                allHeight += 40
                // 在offlineCanvas上绘制，不然没有背景色
                const offlineCanvas = document.createElement('canvas')
                offlineCanvas.width = allWidth
                offlineCanvas.height = allHeight
                const ctx = offlineCanvas.getContext('2d')
                ctx.fillStyle = 'rgba(18, 35, 87, 0.98)'
                ctx.fillRect(0, 0, allWidth, allHeight)
                let preLeft = 20
                let canvas = null
                for (let i = 0; i < canvasDoms.length; i++) {
                    canvas = canvasDoms[i]
                    ctx.drawImage(canvas, preLeft, 20, canvas.width, canvas.height)
                    preLeft = preLeft + canvas.width + 10
                }
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