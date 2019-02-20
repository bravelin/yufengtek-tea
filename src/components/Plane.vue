<template>
    <div class="plane">
        <canvas ref="bg"></canvas>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'plane',
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.draw()
                window.addEventListener('resize', () => {
                    that.draw()
                })
            })
        },
        methods: {
            draw () {
                const that = this
                const el = that.$el
                const elStyle = getComputedStyle(el, null)
                const w = parseInt(elStyle.width)
                const h = parseInt(elStyle.height)
                const canvas = that.$refs.bg
                canvas.width = w
                canvas.height = h
                const ctx = canvas.getContext('2d')
                ctx.clearRect(0, 0, w, h)
                const radius = 12
                const top = 0.5
                ctx.strokeStyle = 'rgba(53, 121, 255, 0.15)'
                ctx.fillStyle = 'rgba(18, 35, 87, 0.1)'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(radius, top)
                ctx.lineTo(w - radius - 0.5, top)
                ctx.quadraticCurveTo(w - 0.5, top, w - 0.5, top + radius)
                ctx.lineTo(w - 0.5, h - radius)
                ctx.quadraticCurveTo(w - 0.5, h - 0.5, w - radius - 0.5, h - 0.5)
                ctx.lineTo(radius, h - 0.5)
                ctx.quadraticCurveTo(0.5, h - 0.5, 0.5, h - radius - 0.5)
                ctx.lineTo(0.5, radius)
                ctx.quadraticCurveTo(0.5, top, radius, top)
                ctx.stroke()
                ctx.fill()
                // 绘制四个角
                const len = 9
                ctx.strokeStyle = 'rgba(53, 121, 255, 0.2)'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(0.5, radius + len)
                ctx.lineTo(0.5, radius)
                ctx.quadraticCurveTo(0.5, top, radius, top)
                ctx.lineTo(radius + len, top)
                ctx.moveTo(w - radius - 0.5 - len, top)
                ctx.lineTo(w - radius - 0.5, top)
                ctx.quadraticCurveTo(w - 0.5, top, w - 0.5, top + radius)
                ctx.lineTo(w - 0.5, top + radius + len)
                ctx.moveTo(w - 0.5, h - radius - len)
                ctx.lineTo(w - 0.5, h - radius)
                ctx.quadraticCurveTo(w - 0.5, h - 0.5, w - radius - 0.5, h - 0.5)
                ctx.lineTo(w - radius - 0.5 - len, h - 0.5)
                ctx.moveTo(radius + len, h - 0.5)
                ctx.lineTo(radius, h - 0.5)
                ctx.quadraticCurveTo(0.5, h - 0.5, 0.5, h - radius - 0.5)
                ctx.lineTo(0.5, h - radius - 0.5 - len)
                ctx.stroke()
            }
        }
    }
</script>