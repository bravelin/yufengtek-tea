<template>
    <div class="app-title">
        <canvas ref="bg"></canvas>
        <h3>武夷山市智慧茗茶数据平台</h3>
    </div>
</template>
<script>
    export default {
        name: 'app-title',
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.draw()
                window.addEventListener('resize', that.draw)
            })
        },
        methods: {
            draw () {
                const that = this
                const style = window.getComputedStyle(that.$el, null)
                const allWidth = parseInt(style.width)
                const allHeight = parseInt(style.height)
                if (isNaN(allWidth) || isNaN(allHeight)) {
                    setTimeout(() => { that.draw() }, 1000)
                } else {
                    const canvas = that.$refs.bg
                    canvas.width = allWidth
                    canvas.height = allHeight
                    const ctx = canvas.getContext('2d')
                    const right = allWidth - 2
                    const bottom = allHeight - 1
                    ctx.clearRect(0, 0, allWidth, allHeight)
                    ctx.beginPath()
                    ctx.strokeStyle = 'rgba(53, 121, 255, 0.25)'
                    ctx.lineWidth = 2
                    ctx.moveTo(right, bottom)
                    ctx.lineTo(24, bottom)
                    ctx.lineTo(0, 49.5)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.lineWidth = 4
                    ctx.moveTo(19, bottom - 9)
                    ctx.lineTo(right, bottom - 9)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.lineWidth = 6
                    ctx.moveTo(0, bottom - 1)
                    ctx.lineTo(6, bottom - 1)
                    ctx.stroke()
                }
            }
        },
        beforeDestroy () {
            const that = this
            window.removeEventListener('resize', that.draw)
        }
    }
</script>
