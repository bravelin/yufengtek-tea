<template>
    <canvas class="app-bg"></canvas>
</template>
<script>
    import Star from '@/lib/star'
    const win = window
    export default {
        data () {
            return {
                stars: [],
                ctx: null,
                hue: 0,
                w: 0,
                h: 0,
                requestId: null
            }
        },
        created () {
            console.log(win.requestAnimationFrame)
            win.requestAnimationFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame
            win.cancelAnimationFrame = win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.msCancelAnimationFrame
        },
        mounted () {
            let that = this
            that.$nextTick(() => {
                let el = that.$el
                that.ctx = el.getContext('2d')
                that.draw()
            })
            win.addEventListener('resize', that.doResize)
        },
        methods: {
            doResize () {
                const that = this
                if (that.requestId) {
                    win.cancelAnimationFrame(that.requestId)
                }
                that.ctx.clearRect(0, 0, that.w, that.h)
                that.draw()
            },
            draw () {
                let that = this
                let el = that.$el
                let ctx = that.ctx
                let w = that.w = el.width = window.innerWidth
                let h = that.h = el.height = window.innerHeight
                let hue = that.hue = 217
                let maxStars = 680
                let canvas2 = document.createElement('canvas')
                let ctx2 = canvas2.getContext('2d')
                canvas2.width = 100
                canvas2.height = 100
                let half = canvas2.width / 2
                let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
                gradient2.addColorStop(0.025, '#fff')
                gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
                gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
                gradient2.addColorStop(1, 'transparent')
                // gradient2.addColorStop(1, 'red')
                ctx2.fillStyle = gradient2
                ctx2.beginPath()
                ctx2.arc(half, half, half, 0, Math.PI * 2)
                ctx2.fill()
                that.stars = []
                for (var i = 0; i < maxStars; i++) {
                    that.stars.push(new Star(w, h, ctx, ctx2, canvas2))
                }
                that.animation()
            },
            animation () {
                let that = this
                let ctx = that.ctx
                ctx.globalCompositeOperation = 'source-over'
                ctx.globalAlpha = 0.8
                ctx.fillStyle = 'hsla(' + that.hue + ', 64%, 6%, 0.9)'
                ctx.fillRect(0, 0, that.w, that.h)
                ctx.globalCompositeOperation = 'lighter'
                for (var i = 1, l = that.stars.length; i < l; i++) {
                    that.stars[i].draw()
                }
                that.requestId = win.requestAnimationFrame(that.animation)
            }
        },
        beforeDestroy () {
            const that = this
            if (that.requestId) {
                win.cancelAnimationFrame(that.requestId)
            }
            window.removeEventListener('onresize', that.doResize)
        }
    }
</script>
