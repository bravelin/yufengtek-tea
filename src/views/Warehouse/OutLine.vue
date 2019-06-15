<!--出库信息-->
<template>
    <Plane class="out-line-wrap" :full="outLineChartFullState">
        <PlaneTitle>今年出库信息</PlaneTitle>
        <div class="chart-unit" v-show="thisYearOutDatas.length">单位：吨</div>
        <div class="plane-content" ref="container" :class="{ hide: !thisYearOutDatas.length }"></div>
        <PlaneTools :full="outLineChartFullState" @change="doFullStateChange" v-show="thisYearOutDatas.length"></PlaneTools>
        <div v-show="!thisYearOutDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'thisYearOutDatas'
    const fullProp = 'outLineChartFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'WarehouseOutLine',
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
                        const { titles, lineDatas } = that.handleChartData(datas)
                        const options = that.getBaseOptions(titles, lineDatas)
                        that.fixOptions(options, titles, lineDatas)
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
            getBaseOptions (titles, lineDatas) {
                const { min, max, interval } = computedChartDataInterval(lineDatas, 4)
                return {
                    grid: { top: 20, left: 12, right: 10, bottom: 0, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + '吨',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238,238,238,0.4)' } },
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
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)' } },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { show: true, margin: 8, textStyle: { fontSize: 12, color: '#fff' } }
                    },
                    series: [
                    {
                        type: 'line',
                        data: lineDatas,
                        smooth: true,
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: { normal: { color: '#02b9e1', label: { show: false } } },
                        lineStyle: { width: 2, color: 'rgb(153, 227, 253)' },
                        areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(153, 228, 253, 0.6)' }, { offset: 1, color: 'rgba(45, 80, 131, 0.1)' }], false) } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, titles, lineDatas) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(lineDatas, 6)
                        options.grid = { top: 30, left: 25, right: 25, bottom: 20, containLabel: true }
                        options.series[0].symbolSize = 14
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
                        const { min, max, interval } = computedChartDataInterval(lineDatas, 3)
                        options.grid = { top: 14, left: 2, right: 8, bottom: 3, containLabel: true }
                        options.series[0].symbolSize = 6
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
                        const { min, max, interval } = computedChartDataInterval(lineDatas, 3)
                        options.grid = { top: 16, left: 6, right: 8, bottom: 3, containLabel: true }
                        options.series[0].symbolSize = 9
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
                const that = this
                const titles = []
                const lineDatas = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    titles.push(item.label + '月')
                    lineDatas.push(item.value)
                }
                return { titles, lineDatas }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
