<!--茶树排行-->
<template>
    <Plane class="amount-rank-wrap" :full="amountRankFullState">
        <PlaneTitle>茶树排行</PlaneTitle>
        <div class="chart-unit">单位：{{ amountRankUnit }}</div>
        <div class="plane-content" ref="container" :class="{ hide: !amountRankDatas.length }"></div>
        <PlaneTools v-show="amountRankDatas.length" :full="amountRankFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!amountRankDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'amountRankDatas'
    const fullProp = 'amountRankFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeAmountRank',
        computed: {
            ...thisMapState(['amountRankUnit', fullProp, dataProp]),
            ...mapState(['smallScreen', 'miniScreen'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
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
                chart: null
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
                        const { titles, values, serialData } = that.handleChartData(datas)
                        const options = that.getBaseOptions(datas, titles, values, serialData)
                        that.fixOptions(options, datas, titles, values)
                        if (that.chart) { // 刷新
                            setTimeout(() => {
                                that.chart.resize()
                                that.chart.setOption(options)
                                that.chart.resize()
                            }, 200)
                        } else { // 初始化
                            that.chart = echarts.init(container)
                            that.chart.setOption(options)
                        }
                    }
                }
            },
            // 图表配置项
            getBaseOptions (datas, titles, values, serialData) {
                const { min, max, interval } = computedChartDataInterval(values, 6)
                const colors = ['#ff5f6c', '#fac720', '#1cd782']
                return {
                    grid: { top: 8, left: 10, right: 30, bottom: 3, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter (params) {
                            return datas[params[0].dataIndex].town + '：' + params[0].data + '亩'
                        },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238, 238, 238, 0.4)' } },
                        textStyle: { fontSize: 14 }
                    },
                    xAxis: {
                        show: true,
                        min,
                        max,
                        interval,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)', width: 0.5 } },
                        axisLine: { show: false },
                        axisLabel: { margin: 2, textStyle: { color: '#fff', fontSize: 11 } }
                    },
                    yAxis: {
                        show: true,
                        data: titles,
                        inverse: true,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color (item, index) { return colors[index] || '#fff' }, textStyle: { fontSize: 11 }, margin: 8 }
                    },
                    series: [
                        {
                            type: 'bar',
                            barGap: '-100%',
                            data: datas.map(item => max),
                            barWidth: 9,
                            silent: true,
                            itemStyle: { normal: { barBorderRadius: 30, color: '#0a3189' } }
                        },
                        {
                            type: 'bar',
                            yAxisIndex: 0,
                            data: serialData,
                            barWidth: 9,
                            itemStyle: { normal: { barBorderRadius: 30, color: '#1b99f0' } },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideLeft',
                                    formatter (item) { return `${item.value} 亩` },
                                    color: '#fff',
                                    fontSize: 12,
                                    offset: [10, 1]
                                }
                            }
                        }
                    ]
                }
            },
            // 响应式修正options
            fixOptions (options, datas, titles, values) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 10)
                        options.grid = { top: 18, left: 20, right: 45, bottom: 18, containLabel: true }
                        options.series[0].barWidth = 18
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 18
                        options.series[1].label.normal.fontSize = 16
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                        options.tooltip.textStyle.fontSize = 18
                    } else {
                        options.grid = { top: 25, left: 20, right: 50, bottom: 20, containLabel: true }
                        const { min, max, interval } = computedChartDataInterval(values, 8)
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.series[0].data = datas.map(item => max)
                    }
                } else {
                    if (that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 3)
                        options.grid = { top: 2, left: 6, right: 18, bottom: 0, containLabel: true }
                        options.series[0].barWidth = 6
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 6
                        options.series[1].label.normal.fontSize = 7
                        options.yAxis.axisLabel.margin = 2
                        options.yAxis.axisLabel.textStyle.fontSize = 8
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 0
                        options.xAxis.axisLabel.textStyle.fontSize = 8
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 4, 0.1)
                        options.grid = { top: 5, left: 6, right: 20, bottom: 0, containLabel: true }
                        options.series[0].barWidth = 8
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 8
                        options.series[1].label.normal.fontSize = 8
                        options.yAxis.axisLabel.margin = 2
                        options.yAxis.axisLabel.textStyle.fontSize = 8
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 2
                        options.xAxis.axisLabel.textStyle.fontSize = 8
                        options.tooltip.textStyle.fontSize = 12
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = []
                const serialData = []
                const colors = ['#ff5f6c', '#fac720', '#1cd782']
                datas.forEach((item, index) => {
                    if (item.town.length <= 4) {
                        titles.push(item.town)
                    } else {
                        titles.push(item.town.slice(0, 4) + '...')
                    }
                    values.push(item.area)
                    serialData.push({
                        value: item.area,
                        itemStyle: { color: colors[index] || '#1b99f0' }
                    })
                })
                return { titles, values, serialData }
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
