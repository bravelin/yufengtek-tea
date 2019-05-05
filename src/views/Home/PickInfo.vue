<!--采摘信息-->
<template>
    <Plane class="pick-info-wrap" :full="pickInfoFullState">
        <PlaneTitle>采摘信息</PlaneTitle>
        <div class="plane-content" :class="{ hide: !pickDatas.length }">
            <div ref="container" class="chart-container"></div>
            <div class="chart-title" v-show="pickDatas.length"><h4>茶叶总产量</h4><div>{{ teaTotalAmount }}<span>吨</span></div></div>
        </div>
        <PlaneTools v-show="pickDatas.length" :full="pickInfoFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!pickDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.pickDatas`
    const fullProp = 'pickInfoFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'home-pick-info',
        computed: {
            ...thisMapState(['teaTotalAmount', fullProp, 'pickDatas']),
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
                const datas = that.$store.state[moduleNameSpace].pickDatas
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].pickDatas
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: {
                        show: true,
                        data: legendData,
                        orient: 'vertical',
                        right: miniScreen ? 0 : '3%',
                        top: 10,
                        itemGap: miniScreen ? 5 : 15,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: miniScreen ? 12 : 14,
                            padding: [2, 0, 0, miniScreen ? 0 : 4]
                        }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['45%', miniScreen ? '80%' : '88%'],
                        center: [miniScreen ? '38%' : '44%', '50%'],
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                            fontSize: 12
                        },
                        color: ['#43517c', '#87d0f6', '#4775b7', '#91acd4', '#15467d'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
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
                const { seriesData, legendData } = that.handleChartData(datas)
                let options = null
                const miniScreen = that.miniScreen
                if (that[fullProp]) {
                    options = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ center: [miniScreen ? '38%' : '44%', '50%'], radius: ['45%', '88%'], data: seriesData, label: { fontSize: 16 } }],
                        legend: { data: legendData, right: '3.5%', itemGap: 20, top: 20, textStyle: { fontSize: 16 } },
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ center: [miniScreen ? '38%' : '44%', '50%'], radius: ['45%', miniScreen ? '80%' : '88%'], data: seriesData, label: { fontSize: 12 } }],
                        legend: { data: legendData, right: miniScreen ? 0 : '3%', itemGap: miniScreen ? 5 : 15, top: 10, textStyle: { fontSize: miniScreen ? 12 : 14, padding: [2, 0, 0, miniScreen ? 0 : 4] } },
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.label, value: item.value })
                    legendData.push(item.label)
                }
                return { legendData, seriesData }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>