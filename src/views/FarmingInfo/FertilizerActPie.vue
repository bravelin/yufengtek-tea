<template>
    <div>
        <div ref="container"></div>
        <ul class="legend-list">
            <li v-for="item in legendData" :key="item.name"><div>{{ item.ratio }}</div><div>{{ item.name }}</div></li>
        </ul>
        <div class="total-data"><h3>{{ total }}</h3><span>{{ unit }}</span></div>
    </div>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'fertilizerActPieDatas'
    const fullProp = 'fertilizerFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'FarmingFertilizerActPie',
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
                container: null,
                chart: null, // 图表实例
                legendData: [],
                total: 0,
                unit: '吨'
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.container = that.$refs.container
                that.doInitOrRefreshChart()
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
                if (datas && datas.length) {
                    const container = that.container
                    if (container) {
                        const { seriesData, legendData } = that.handleChartData(datas)
                        const options = that.getBaseOptions(datas, seriesData)
                        that.fixOptions(options, datas, seriesData)
                        that.legendData = legendData
                        if (that.chart) { // 刷新
                            that.chart.setOption(options)
                            let resizeCount = 6
                            const timer = setInterval(() => {
                                --resizeCount > 0 ? that.chart.resize() : window.clearInterval(timer)
                            }, 150)
                        } else { // 初始化
                            that.chart = echarts.init(container)
                            that.chart.setOption(options)
                        }
                    }
                }
            },
            // 创建图表
            init (datas) {
                const that = this
                const container = that.container
                const { seriesData, legendData } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                that.legendData = legendData
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: { show: false },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '72%'],
                        center: ['32%', '50%'],
                        label: { show: false },
                        color: ['#ff5f6c', '#1cd782', '#fac720', '#294dd8', '#15467d'],
                        data: seriesData,
                        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 图表配置项
            getBaseOptions (datas, seriesData) {
                return {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: { show: false },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '72%'],
                        center: ['32%', '50%'],
                        minAngle: 5,
                        minShowLabelAngle: 720,
                        avoidLabelOverlap: false,
                        label: { show: false },
                        color: ['#ff5f6c', '#1cd782', '#fac720', '#294dd8', '#15467d'],
                        data: seriesData,
                        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, datas, seriesData) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        options.tooltip.textStyle.fontSize = 18
                    }
                    options.series[0].center = ['50%', '42%']
                } else {
                    if (that.miniScreen) {
                        options.series[0].center[0] = '27.7%'
                        options.series[0].radius = ['50%', '71%']
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        options.series[0].center[0] = '28%'
                        options.tooltip.textStyle.fontSize = 12
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                const totalData = datas.reduce((total, currItem) => total + currItem.weight, 0)
                that.total = totalData
                that.unit = '吨'
                if (that.total > 10000) {
                    that.total = (totalData / 10000).toFixed(2)
                    that.unit = '万吨'
                }
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.farm_model, value: item.weight })
                    legendData.push({ name: item.farm_model, ratio: ((item.weight / totalData) * 100).toFixed(2) + '%', value: item.weight })
                }
                return { legendData, seriesData }
            }
        }
    }
</script>