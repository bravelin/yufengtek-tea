<template>
    <div ref="container"></div>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'fertilizerActPieDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'fertilizerFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'farming-fertilizer-act-pie',
        computed: {
            ...thisMapState([fullProp]),
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
                const datas = that.$store.state[moduleNameSpace][dataProp]
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace][dataProp]
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
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
                        right: 0,
                        top: 0,
                        itemGap: miniScreen ? 5 : 10,
                        textStyle: { color: '#d0d0d0', fontSize: 12, padding: [2, 0, 0, 2] }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['40%', '80%'],
                        center: ['36%', '50%'],
                        label: { show: true, position: 'inside', formatter: '{d}%', fontSize: 12 },
                        color: ['#15467d', '#87d0f6', '#4775b7', '#91acd4', '#2663bc'],
                        data: seriesData,
                        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
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
                        series: [{ center: ['47%', '50%'], data: seriesData, label: { fontSize: 18 } }],
                        legend: { data: legendData, right: 15, itemGap: 20, top: 15, textStyle: { fontSize: 15 } },
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ center: ['36%', '50%'], data: seriesData, label: { fontSize: 12 } }],
                        legend: { data: legendData, right: 0, itemGap: miniScreen ? 5 : 10, top: 0, textStyle: { fontSize: 12 } },
                    }
                }
                chart.setOption(options)
                let resizeCount = 6
                const timer = setInterval(() => {
                    --resizeCount > 0 ? chart.resize() : window.clearInterval(timer)
                }, 150)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.farm_model, value: item.weight })
                    legendData.push(item.farm_model)
                }
                return { legendData, seriesData }
            }
        }
    }
</script>