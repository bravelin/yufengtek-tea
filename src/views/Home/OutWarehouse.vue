<!--出库信息-->
<template>
    <Plane class="out-warehouse-wrap">
        <PlaneTitle>出库信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <FullScreenButton :link="{ name: 'farming' }" :full="screenFullState"></FullScreenButton>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.outWarehouseDatas`

    export default {
        name: 'home-out-warehouse',
        computed: {
            ...thisMapState(['warehouseUnit'])
        },
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
                const datas = that.$store.state[moduleNameSpace].outWarehouseDatas
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].outWarehouseDatas
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
                const { titles, values } = that.handleChartData(datas)
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + that.warehouseUnit,
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
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.2)', width: 0.5 }
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
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
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
            },
            // full state change
            doSwitchFullState () {
                const that = this
            }
        }
    }
</script>