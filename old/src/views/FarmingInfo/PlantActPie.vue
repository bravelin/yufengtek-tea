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
    const dataProp = 'plantActPieDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'plantFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'farming-plant-act-pie',
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}亩 ({d}%)',
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
                        minAngle: 5,
                        minShowLabelAngle: 720,
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            align: 'left',
                            position: 'inside',
                            normal: {
                                show: true,
                                position: 'inside',
                                textStyle: { color: 'rgba(255, 255, 255, 1)' },
                                formatter: '{d}%',
                            },
                            formatter: '{d}%',
                        },
                        color: ['#15467d', '#87d0f6', '#4775b7', '#91acd4', '#2663bc'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
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
                    seriesData.push({ name: item.plant_varieties, value: item.area })
                    legendData.push(item.plant_varieties)
                }
                return { legendData, seriesData }
            }
        }
    }
</script>