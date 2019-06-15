<!--历史出库对比-->
<template>
    <Plane class="out-constrast-wrap" :full="outConstrastFullState">
        <PlaneTitle>历史出库对比</PlaneTitle>
        <div class="chart-unit" v-show="historyOutDatas.length">单位：吨</div>
        <div class="plane-content" ref="container" :class="{ hide: !historyOutDatas.length }"></div>
        <PlaneTools :full="outConstrastFullState" @change="doFullStateChange" v-show="historyOutDatas.length"></PlaneTools>
        <div v-show="!historyOutDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'historyOutDatas'
    const fullProp = 'outConstrastFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'WarehouseOutConstrast',
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
                        const { titles, lineDatas, legends } = that.handleChartData(datas)
                        const options = that.getBaseOptions(titles, lineDatas, legends)
                        that.fixOptions(options, titles, lineDatas, legends)
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
            getBaseOptions (titles, lineDatas, legends) {
                const that = this
                const { min, max, interval } = computedChartDataInterval([...lineDatas[0].list, ...lineDatas[1].list], 4)
                return {
                    grid: { top: 25, left: 12, right: 10, bottom: 0, containLabel: true },
                    legend: {
                        data: legends,
                        right: 4,
                        top: 0,
                        itemGap: 10,
                        itemWidth: 9,
                        textStyle: { color: '#ffffff', fontSize: 11, padding: [2, 0, 0, 2] }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter (params) {
                            return params.map((item, index) => {
                                return legends[index].name + '年' + item.name + '：' + item.value + '吨'
                            }).join('<br/>')
                        },
                        textStyle: { fontSize: 14 },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238,238,238,0.4)' } }
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
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255,0.2)' } },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { margin: 8, show: true, textStyle: { color: '#fff', fontSize: 12 } }
                    },
                    series: that.getSeries(lineDatas)
                }
            },
            getSeries (lineDatas) {
                return lineDatas.map((item, index) => {
                    return {
                        name: item.year,
                        data: item.list,
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        showSymbol: true,
                        itemStyle: { normal: { color: index == 1 ? '#02b9e1' : '#fac720', label: { show: false } } },
                        lineStyle: { width: 2, color: index == 1 ? 'rgb(153, 227, 253)' : '#dbb32f' },
                        areaStyle: index == 0 ? {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(91, 96, 87, 0.6)' }, { offset: 1, color: 'rgba(91, 96, 87, 0.1)' }], false)
                            }
                        } : {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(153, 228, 253, 0.6)' }, { offset: 1, color: 'rgba(45, 80, 131, 0.1)' }], false)
                            }
                        }
                    }
                })
            },
            // 响应式修正options
            fixOptions(options, titles, lineDatas, legends) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval([...lineDatas[0].list, ...lineDatas[1].list], 8)
                        options.grid = { top: 40, left: 20, right: 20, bottom: 20, containLabel: true }
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.tooltip.textStyle.fontSize = 18
                        options.legend.top = 8
                        options.legend.right = 20
                        options.legend.itemWidth = 12
                        options.legend.textStyle.fontSize = 15
                        options.legend.textStyle.padding = [5, 0, 0, 5]
                    } else {
                        options.grid = { top: 40, left: 20, right: 20, bottom: 20, containLabel: true }
                        options.legend.top = 12
                        options.legend.right = 24
                    }
                } else {
                    if (that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval([...lineDatas[0].list, ...lineDatas[1].list], 3)
                        options.grid = { top: 22, left: 6, right: 8, bottom: 3, containLabel: true }
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.tooltip.textStyle.fontSize = 12
                        options.legend.itemWidth = 6
                        options.legend.textStyle.fontSize = 9
                        options.series[0].symbolSize = 6
                        options.series[0].lineStyle.width = 1
                        options.series[1].symbolSize = 6
                        options.series[1].lineStyle.width = 1
                    } else if (that.smallScreen) {
                        const { min, max, interval } = computedChartDataInterval([...lineDatas[0].list, ...lineDatas[1].list], 3)
                        options.grid = { top: 22, left: 6, right: 8, bottom: 3, containLabel: true }
                        options.xAxis.axisLabel.margin = 9
                        options.xAxis.axisLabel.textStyle.fontSize = 11
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 9
                        options.yAxis.axisLabel.textStyle.fontSize = 11
                        options.tooltip.textStyle.fontSize = 12
                        options.legend.itemWidth = 7
                        options.legend.textStyle.fontSize = 10
                        options.series[0].symbolSize = 9
                        options.series[0].lineStyle.width = 1
                        options.series[1].symbolSize = 9
                        options.series[1].lineStyle.width = 1
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const lineDatas = []
                let item = null
                const titleObjs = {}
                let dataItem = null
                let lineObj = null
                const legends = []
                var titles = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                if (datas[0].list.length != 12) {
                    var ss = datas[0].list[0].label
                    for (let j = 1; j < ss; j++) {
                        datas[0].list.unshift({ label: j, value: 0 })
                    }
                }
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    lineObj = { year: item.year, list: [] }
                    legends.push({ name: item.year, icon: 'circle' })
                    for (let j = 0; j < item.list.length; j++) {
                        dataItem = item.list[j]
                        lineObj.list.push(dataItem.value)
                    }
                    lineDatas.push(lineObj)
                }
                return { titles, lineDatas, legends }
            },
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
