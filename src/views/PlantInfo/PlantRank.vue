<!--种植排行-->
<template>
    <Plane class="plant-rank-wrap" :full="plantRankFullState">
        <PlaneTitle>种植排行</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !amountRankDatas.length }"></div>
        <PlaneTools v-show="amountRankDatas.length" :full="plantRankFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!amountRankDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'amountRankDatas'
    const fullProp = 'plantRankFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'PlantAmountRank',
        computed: {
            ...thisMapState(['amountRankUnit', fullProp, dataProp]),
            ...mapState(['smallScreen', 'miniScreen'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () {
                console.log('fullStateProp...')
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
                        console.log('options.....', options)
                        that.fixOptions(options, datas, titles, values)
                        if (that.chart) { // 刷新
                            that.chart.setOption(options)
                            setTimeout(() => { that.chart.resize() }, 200)
                        } else { // 初始化
                            that.chart = echarts.init(container)
                            that.chart.setOption(options)
                        }
                    }
                }
            },
            // 图表配置项
            getBaseOptions (datas, titles, values, serialData) {
                const { min, max, interval } = computedChartDataInterval(values, 6, 0.1)
                const colors = ['#ff5f6c', '#fac720', '#1cd782']
                console.log('min, max, interval...', min, max, interval)
                return {
                    grid: { top: 10, left: 10, right: 30, bottom: 5, containLabel: true },
                    xAxis: {
                        show: true,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)', width: 0.5 } },
                        axisLine: { show: false },
                        axisLabel: { margin: 12, textStyle: { color: '#fff', fontSize: 12 } }
                    },
                    yAxis: {
                        show: true,
                        data: titles,
                        inverse: true,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color (item, index) { return colors[index] || '#fff' }, textStyle: { fontSize: 12 }, margin: 8 }
                    },
                    series: [
                        {
                            type: 'bar',
                            barGap: '-100%',
                            data: datas.map(item => max),
                            barWidth: 14,
                            silent: true,
                            itemStyle: { normal: { barBorderRadius: 30, color: '#0a3189' } }
                        },
                        {
                            type: 'bar',
                            yAxisIndex: 0,
                            data: serialData,
                            barWidth: 14,
                            itemStyle: { normal: { barBorderRadius: 30, color: '#1b99f0' } },
                            label: {
                                normal: {
                                    show: true,
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
                        const { min, max, interval } = computedChartDataInterval(values, 10, 0.1)
                        options.grid = { top: 25, left: 25, right: 50, bottom: 20, containLabel: true }
                        options.series[0].barWidth = 25
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 25
                        options.series[1].label.normal.fontSize = 16
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                    } else {
                        options.grid = { top: 25, left: 20, right: 50, bottom: 20, containLabel: true }
                        const { min, max, interval } = computedChartDataInterval(values, 8, 0.1)
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.series[0].data = datas.map(item => max)
                    }
                } else {
                    if (that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 3, 0.1)
                        options.grid = { top: 5, left: 0, right: 18, bottom: 2, containLabel: true }
                        options.series[0].barWidth = 11
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 11
                        options.series[1].label.normal.fontSize = 10
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                    } else if (that.smallScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 4, 0.1)
                        options.grid = { top: 8, left: 4, right: 25, bottom: 2, containLabel: true }
                        options.series[0].barWidth = 12
                        options.series[0].data = datas.map(item => max)
                        options.series[1].barWidth = 12
                        options.series[1].label.normal.fontSize = 11
                        options.yAxis.axisLabel.margin = 9
                        options.yAxis.axisLabel.textStyle.fontSize = 11
                        options.xAxis.min = min
                        options.xAxis.max = max
                        options.xAxis.interval = interval
                        options.xAxis.axisLabel.margin = 9
                        options.xAxis.axisLabel.textStyle.fontSize = 11
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
                    titles.push(item.gardenName)
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
                that.$store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
