<template>
    <header class="app-title">
        <canvas ref="bg" height="70" :width="winWidth"></canvas>
        <h1>武夷山市智慧茗茶数据平台</h1>
    </header>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'AppTitle',
        computed: {
            ...mapState(['winWidth'])
        },
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
                const canvas = that.$refs.bg
                const ctx = canvas.getContext('2d')
                const allHeight = 70
                const allWidth = canvas.width
                const titleWidth = 900
                const corner1 = 40
                const corner2 = 20
                const corner3 = 55
                ctx.clearRect(0, 0, allWidth, allHeight)
                // 绘制底部线条
                const lineTop = 34
                const tx1 = (allWidth - titleWidth) / 2
                const tx2 = tx1 + titleWidth - 16
                const grd = ctx.createLinearGradient(0, 0, allWidth, 0)
                grd.addColorStop(0, 'rgba(25, 42, 70, 0.5)')
                grd.addColorStop(0.4, 'rgba(20, 17, 223, 0.9)')
                grd.addColorStop(0.6, 'rgba(20, 17, 223, 0.9)')
                grd.addColorStop(1, 'rgba(25, 42, 70, 0.5)')
                ctx.beginPath()
                ctx.strokeStyle = grd
                ctx.lineWidth = 1
                ctx.moveTo(0, lineTop)
                ctx.lineTo(tx1, lineTop)
                ctx.bezierCurveTo(tx1 + corner1, lineTop, tx1 + corner2, allHeight, tx1 + corner2 + corner3, allHeight)
                ctx.lineTo(tx2 - corner2 - corner3, allHeight)
                ctx.bezierCurveTo(tx2 - corner2, allHeight, tx2 - corner1, lineTop, tx2, lineTop)
                ctx.lineTo(allWidth, lineTop)
                // 绘制包围线条
                const fillGrd = ctx.createLinearGradient(0, 0, 0, allHeight)
                fillGrd.addColorStop(0, 'rgba(59, 138, 159, 0.1)')
                fillGrd.addColorStop(1, 'rgba(20, 17, 223, 0.5)')
                ctx.fillStyle = fillGrd
                ctx.moveTo(allWidth, lineTop)
                ctx.lineTo(allWidth, 0)
                ctx.lineTo(0, 0)
                ctx.lineTo(0, lineTop)
                ctx.stroke()
                ctx.fill()
            }
        }
    }
</script>