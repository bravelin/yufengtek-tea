<!--入库出库-->
<template>
    <Plane class="warehouse-info-wrap" :full="warehouseFullState">
        <PlaneTitle>入库出库</PlaneTitle>
        <div class="chart-unit">单位：{{ warehouseUnit }}</div>
        <ul class="total-data">
            <li><i></i><i></i><div>{{ outStockWeight }}</div><div>总出库</div></li>
            <li><i></i><i></i><div>{{ inStockWeight }}</div><div>总入库</div></li>
        </ul>
        <div class="plane-content" ref="container" :class="{ hide: !warehouseDatas.in.length }"></div>
        <PlaneTools v-show="warehouseDatas.in.length" :full="warehouseFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!warehouseDatas.in.length" class="iconfont null-data-tag">&#xe642;</div>
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
    const dataProp = 'warehouseDatas'
    const fullProp = 'warehouseFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeWarehouse',
        computed: {
            ...thisMapState(['warehouseUnit', fullProp, dataProp, 'inStockWeight', 'outStockWeight']),
            ...mapState(['smallScreen', 'miniScreen'])
        },
        watch: {
            [chartDataProp] () {
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
                if (datas) {
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
                const unit = this.warehouseUnit
                const { min, max, interval } = computedChartDataInterval([...values[0], ...values[1]], 4, 0.2)
                return {
                    tooltip: {
                        trigger: 'axis',
                        formatter (params) {
                            return params.map(item => item.name + item.seriesName + '：' + item.value + unit).join('<br/>')
                        },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238,238,238,0.4)' } },
                        textStyle: { fontSize: 14 }
                    },
                    grid: { top: 60, bottom: 10, left: 160, right: 12, containLabel: true },
                    xAxis: {
                        data: titles,
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    },
                    yAxis: {
                        min,
                        max,
                        interval,
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } },
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)', width: 0.5 } }
                    },
                    color: ['#00e0ef', '#e2b53d'],
                    series: [{
                        name: '入库',
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        data: values[0],
                        lineStyle: { width: 2 },
                        itemStyle: { normal: { label: { color: '#fff', show: true, position: 'outside', fontSize: 11 } } },
                        areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0, 224, 239, 0.6)' }, { offset: 1, color: 'rgba(0, 224, 239, 0.1)' }], false) } }
                    }, {
                        name: '出库',
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        data: values[1],
                        lineStyle: { width: 2 },
                        itemStyle: { normal: { label: { color: '#fff', show: true, position: 'outside', fontSize: 11, offset: [0, 28] } } },
                        areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(226, 181, 61, 0.6)' }, { offset: 1, color: 'rgba(226, 181, 61, 0.1)' }], false) } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, titles, values) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval([...values[0], ...values[1]], 8, 0.2)
                        options.grid = { top: 65, bottom: 20, left: 260, right: 25, containLabel: true }
                        options.tooltip.textStyle.fontSize = 18
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.series[0].itemStyle.normal.label.fontSize = 14
                        options.series[1].itemStyle.normal.label.fontSize = 14
                    } else {
                        options.grid = { top: 65, bottom: 20, left: 260, right: 25, containLabel: true }
                    }
                } else {
                    if (that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval([...values[0], ...values[1]], 3, 0.2)
                        options.grid = { top: 60, bottom: 0, left: 115, right: 8, containLabel: true }
                        options.tooltip.textStyle.fontSize = 10
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.series[0].itemStyle.normal.label.show = false
                        options.series[1].itemStyle.normal.label.show = false
                        options.series[0].symbolSize = 6
                        options.series[1].symbolSize = 6
                        options.series[0].lineStyle.width = 1
                        options.series[1].lineStyle.width = 1
                    } else if (that.smallScreen) {
                        const { min, max, interval } = computedChartDataInterval([...values[0], ...values[1]], 3, 0.2)
                        options.grid = { top: 55, bottom: 0, left: 120, right: 8, containLabel: true }
                        options.tooltip.textStyle.fontSize = 12
                        options.xAxis.axisLabel.margin = 9
                        options.xAxis.axisLabel.textStyle.fontSize = 11
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 9
                        options.yAxis.axisLabel.textStyle.fontSize = 11
                        options.series[0].itemStyle.normal.label.show = false
                        options.series[1].itemStyle.normal.label.show = false
                        options.series[0].symbolSize = 9
                        options.series[1].symbolSize = 9
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = [[], []]
                datas.in.forEach(item => {
                    titles.push(item.omonth + '月')
                    values[0].push(item.weight ? item.weight.toFixed(2) - 0 : 0)
                })
                datas.out.forEach(item => {
                    values[1].push(item.weight ? item.weight.toFixed(2) - 0 : 0)
                })
                return { titles, values }
            },
            // full state change
            doFullStateChange (payload) {
                this.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp, state: payload
                })
            }
        }
    }
</script>