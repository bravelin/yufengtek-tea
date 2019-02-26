<!--出库信息-->
<template>
    <Plane class="out-line-wrap">
        <PlaneTitle>今年出库信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'thisYearOutDatas'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`

    export default {
        name: 'warehouse-out-line',
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
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
                const options = {
                    grid: { top: 10, left: 0, right: 5, bottom: 0, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + '吨',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 15, textStyle: { color: '#fff' } }
                    }],
                    yAxis: [{
                        show: true,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.3)' } },
                        axisTick: { show: false },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { show: true, color: '#fff' }
                    }],
                    color: ['#821eff'],
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
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(130, 30, 255, 0.7)' }, { offset: 0.85, color: 'rgba(130, 30, 255, 0.3)' }], false)
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
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                const tooltip = currOption.tooltip
                series[0].data = lineDatas
                xAxis[0].data = titles
                chart.setOption({ series, xAxis, tooltip })
                setTimeout(() => { chart.resize() }, 10)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const titles = []
                const lineDatas = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    titles.push(item.label)
                    lineDatas.push(item.value)
                }
                return { titles, lineDatas }
            }
        }
    }
</script>
