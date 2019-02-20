<!--茶叶入库茶叶出库-->
<template>
    <Plane class="app-warehouse-wrap">
        <div class="wrap-title">
            <PlaneTitle>茶叶入库</PlaneTitle>
            <PlaneTitle>茶叶出库</PlaneTitle>
        </div>
        <div class="charts">
            <div ref="in"></div>
            <div ref="out"></div>
        </div>
    </Plane>
</template>
<script>
    import Plane from '@/components/Plane'
    import PlaneTitle from '@/components/PlaneTitle'
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartInDatasProp = `$store.state.${moduleNameSpace}.inDatas`
    const chartOutDatasProp = `$store.state.${moduleNameSpace}.outDatas`

    export default {
        name: 'app-warehouse',
        components: {
            Plane, PlaneTitle
        },
        computed: {
            ...thisMapState(['inDatas', 'outDatas', 'unit'])
        },
        watch: {
            [chartInDatasProp] () {
                this.doInitOrRefreshChart('in')
            },
            [chartOutDatasProp] () {
                this.doInitOrRefreshChart('out')
            }
        },
        data () {
            return {
                containerIn: null,
                chartIn: null,
                containerOut: null,
                chartOut: null
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.containerIn = that.$refs.in
                that.containerOut = that.$refs.out
                const inDatas = that.$store.state[moduleNameSpace].inDatas
                if (inDatas.length && !that.chartIn) {
                    that.init(inDatas, 'in')
                }
                const outDatas = that.$store.state[moduleNameSpace].outDatas
                if (outDatas.length && !that.chartOut) {
                    that.init(outDatas, 'out')
                }
            })
        },
        methods: {
            doInitOrRefreshChart (type) {
                const that = this
                const datas = that.$store.state[moduleNameSpace][`${type}Datas`]
                const container = type == 'in' ? that.containerIn : that.containerOut
                const chart = type == 'in' ? that.chartIn : that.chartOut
                if (datas && datas.length) {
                    if (container) {
                        chart ? that.refresh(datas, type) : that.init(datas, type)
                    }
                }
            },
            // 创建图表
            init (datas, type) {
                const that = this
                const container = type == 'in' ? that.containerIn : that.containerOut
                const { titles, values } = that.handleChartData(datas)
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + that.unit,
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        }
                    },
                    grid: {
                        top: 15,
                        bottom: 2,
                        left: 5,
                        right: 5,
                        containLabel: true
                    },
                    xAxis: {
                        data: titles,
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { margin: 10, interval: 0, rotate: 0, color: '#fff', fontSize: 12 }
                    },
                    yAxis: {
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { interval: 0, color: '#fff' },
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.1)', width: 0.5 }
                        }
                    },
                    series: [{
                        name: 'bar',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00EFF8' }, { offset: 1, color: '#005DBE' }])
                            }
                        },
                        data: values
                    }]
                }
                if (type == 'in') {
                    that.chartIn = echarts.init(container)
                    that.chartIn.setOption(options)
                } else {
                    that.chartOut = echarts.init(container)
                    that.chartOut.setOption(options)
                }
            },
            // 刷新图表
            refresh (datas, type) {
                const that = this
                const chart = type == 'in' ? that.chartIn : that.chartOut
                const { titles, values } = that.handleChartData(datas)
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                xAxis[0].data = titles
                series[0].data = values
                chart.setOption({ series, xAxis })
                setTimeout(() => { chart.resize() }, 10)
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = []
                datas.forEach(item => {
                    titles.push(item.date)
                    values.push(item.data)
                })
                return { titles, values }
            }
        }
    }
</script>