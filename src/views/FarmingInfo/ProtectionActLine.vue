<template>
    <div ref="container"></div>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'protectionActLineDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'protectionFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'farming-fertilizer-act-line',
        computed: {
            ...thisMapState([fullProp])
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
                const { titles, lineDatas } = that.handleChartData(datas)
                const { min, max, interval } = computedChartDataInterval(lineDatas, 5)
                const options = {
                    grid: { top: 10, left: 0, right: 0, bottom: 0, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + '吨',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        },
                        textStyle: { fontSize: 14 }
                    },
                    xAxis: [{
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: true },
                        axisLine: { lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    yAxis: [{
                        show: true,
                        min,
                        max,
                        interval,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.3)' } },
                        axisTick: { show: true },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { show: true, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    color: ['rgb(67, 81, 124)'],
                    series: [
                    {
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        showSymbol: true,
                        type: 'line',
                        data: lineDatas,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(67, 81, 124, 0.3)' }, { offset: 0.85, color: 'rgba(67, 81, 124, 0.1)' }], false)
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
                const { titles, lineDatas } = that.handleChartData(datas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        grid: { top: 32, left: 20, right: 20, bottom: 20 },
                        series: [{ data: lineDatas }],
                        xAxis: [{ axisLabel: { margin: 12, fontSize: 15 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 12, fontSize: 15 } }],
                        tooltip: { textStyle: { fontSize: 18 } },
                    }
                } else {
                    options = {
                        grid: { top: 10, left: 0, right: 0, bottom: 0 },
                        series: [{ data: lineDatas }],
                        xAxis: [{ axisLabel: { margin: 8, fontSize: 12 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 8, fontSize: 12 } }],
                        tooltip: { textStyle: { fontSize: 14 } }
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
                const titles = []
                const lineDatas = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    titles.push(item.month + '月')
                    lineDatas.push(item.weight)
                }
                return { titles, lineDatas }
            }
        }
    }
</script>