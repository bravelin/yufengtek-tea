<!--溯源排行-->
<template>
    <Plane class="origin-wrap" :full="originDataFullState">
        <PlaneTitle>溯源排行</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !cityDatas.length }"></div>
        <PlaneTools v-show="cityDatas.length" :full="originDataFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!cityDatas.length" class="iconfont null-data-tag">&#xe642;</div>
        <div class="pop-tip" :style="{ left: tip.x, top: tip.y }" :class="{ active: tip.isShow }">{{ tip.content }}</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import Bubble from './bubble'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'cityDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'originDataFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeOriginData',
        computed: {
            ...thisMapState([fullProp, dataProp]),
            ...mapState(['smallScreen', 'miniScreen'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () {
                this.doInitOrRefreshChart()
            },
            [resizeStateProp] () {
                this.doInitOrRefreshChart()
            }
        },
        data () {
            return {
                tip: {
                    x: '0',
                    y: '0',
                    isShow: false,
                    content: ''
                },
                container: null,
                chart: null // 图表实例
            }
        },
        created () {
            const that = this
            document.addEventListener('showTip', that.doShowTip)
            document.addEventListener('hideTip', that.doHideTip)
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.container = that.$refs.container
                const datas = that[dataProp]
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
                if (datas && datas.length) {
                    if (that.container) {
                        that.chart ? that.refresh(datas) : that.init(datas)
                    }
                }
            },
            // 创建图表
            init (datas) {
                const that = this
                that.chart = new Bubble(that.container)
                that.chart.draw(datas)
            },
            // 刷新图表
            refresh (datas) {
                setTimeout(() => {
                    this.chart.refresh(datas)
                }, 300)
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp, state: payload
                })
            },
            doShowTip (event) {
                const { x, y, text } = event.payload
                const tip = this.tip
                tip.x = (x - 20) + 'px'
                tip.y = (y - 20) + 'px'
                tip.content = text
                tip.isShow = true
            },
            doHideTip (event) {
                const tip = this.tip
                tip.isShow = false
            }
        },
        beforeDestroy () {
            const that = this
            document.removeEventListener('showTip', that.doShowTip)
            document.removeEventListener('hideTip', that.doHideTip)
        }
    }
</script>