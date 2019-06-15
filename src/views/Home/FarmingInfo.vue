<!--农事信息-->
<template>
    <Plane class="farming-info-wrap" :full="farmingInfoFullState">
        <PlaneTitle>施肥信息</PlaneTitle>
        <div class="chart-unit">单位：kg</div>
        <div :class="{ hide: !farmingActdatas.length }" class="plane-content" ref="container"></div>
        <PlaneTools v-show="farmingActdatas.length" :full="farmingInfoFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!farmingActdatas.length" class="iconfont null-data-tag">&#xe642;</div>
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
    const dataProp = 'farmingActdatas'
    const fullProp = 'farmingInfoFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeFarmingInfo',
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
                chart: null // 图表实例
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
                        const { values, titles } = that.handleChartData(datas)
                        const options = that.getBaseOptions(values, titles)
                        that.fixOptions(options, titles, values)
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
            getBaseOptions (values, titles) {
                const { min, max, interval } = computedChartDataInterval(values, 4, 0.5)
                return {
                    grid: { top: 18, left: 12, right: 12, bottom: 3, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + 'kg',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238, 238, 238, 0.4)' } },
                        textStyle: { fontSize: 14 }
                    },
                    xAxis: {
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    },
                    yAxis: {
                        show: true,
                        min,
                        max,
                        interval,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)', width: 0.5 } },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { show: true, margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    },
                    series: [{
                        smooth: true,
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: { normal: { color: '#02b9e1', label: { show: true, position: 'outside', fontSize: 12, color: '#ffffff' } } },
                        data: values,
                        lineStyle: { width: 2, color: 'rgb(153, 227, 253)' },
                        areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(153, 228, 253, 0.6)' }, { offset: 1, color: 'rgba(45, 80, 131, 0.1)' }], false) } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, titles, values) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 6, 0.5)
                        options.grid = { top: 30, left: 25, right: 25, bottom: 20, containLabel: true }
                        options.series[0].symbolSize = 14
                        options.series[0].itemStyle.normal.label.fontSize = 14
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.tooltip.textStyle.fontSize = 18
                    } else {
                        options.grid = { top: 25, left: 25, right: 25, bottom: 20, containLabel: true }
                    }
                } else {
                    if (that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 3, 0.5)
                        options.grid = { top: 14, left: 2, right: 8, bottom: 3, containLabel: true }
                        options.series[0].symbolSize = 6
                        options.series[0].itemStyle.normal.label.fontSize = 10
                        options.series[0].lineStyle.width = 1
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        const { min, max, interval } = computedChartDataInterval(values, 3, 0.5)
                        options.grid = { top: 16, left: 6, right: 8, bottom: 3, containLabel: true }
                        options.series[0].symbolSize = 9
                        options.series[0].itemStyle.normal.label.fontSize = 11
                        options.xAxis.axisLabel.margin = 9
                        options.xAxis.axisLabel.textStyle.fontSize = 11
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 9
                        options.yAxis.axisLabel.textStyle.fontSize = 11
                        options.tooltip.textStyle.fontSize = 12
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = []
                datas.forEach(item => {
                    titles.push(item.label + '月')
                    values.push(item.value.toFixed(0) - 0)
                })
                return { titles, values }
            },
            // full state change
            doFullStateChange (payload) {
                this.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
