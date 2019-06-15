<!--溯源排行-->
<template>
    <Plane class="origin-wrap" :full="originDataFullState">
        <PlaneTitle>溯源排行</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !cityDatas.length }"></div>
        <PlaneTools v-show="cityDatas.length" :full="originDataFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!cityDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    require('echarts-wordcloud')
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'cityDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'originDataFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'home-origin-data',
        computed: {
            ...thisMapState([fullProp, dataProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
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
                container: null,
                chart: null // 图表实例
            }
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
                const container = that.container
                const miniScreen = that.miniScreen
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    series: [{
                        type: 'wordCloud',
                        gridSize: 10,
                        sizeRange: miniScreen ? [12, 22] : [14, 30],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        autoSize: { enable: true, minSize: 12 },
                        data: datas,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'hsla(' + [
                                        207 + Math.round(Math.random() * 10),
                                        (75 + Math.round(Math.random() * 12)) + '%',
                                        (60 + Math.round(Math.random() * 10)) + '%',
                                        0.2 + Math.random()
                                    ].join(',') + ')'
                                }
                            },
                            emphasis: { shadowBlur: 10, shadowColor: '#333' }
                        }
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const miniScreen = that.miniScreen
                let options = null
                if (that[fullProp]) {
                    options = {
                        series: [{ data: datas, gridSize: 20, sizeRange: [14, 50] }],
                        tooltip: { textStyle: { fontSize: 18 } }
                    }
                } else {
                    options = {
                        series: [{ data: datas, gridSize: 10, sizeRange: miniScreen ? [12, 22] : [14, 30] }],
                        tooltip: { textStyle: { fontSize: 14 } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp, state: payload
                })
            }
        }
    }
</script>