<!--茶树排行-->
<template>
    <Plane class="amount-rank-wrap">
        <PlaneTitle>茶树排行</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <FullScreenButton :link="{ name: 'farming' }"></FullScreenButton>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'amountRankDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`

    export default {
        name: 'home-amount-rank',
        computed: {
            ...thisMapState(['amountRankUnit'])
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
                const { titles, values } = that.handleChartData(datas)
                const options = {
                    grid: {
                        top: 10, left: 5, right: 10, bottom: 0, containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + '亩',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        }
                    },
                    yAxis: [{
                        show: true,
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.2)', width: 0.5 }
                        },
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { margin: 8, interval: 0, rotate: 0, color: '#fff', fontSize: 12 }
                    }],
                    xAxis: {
                        show: true,
                        data: titles,
                        inverse: true,
                        axisLine: {
                            lineStyle: { color: '#0c3b71' }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 12,
                            margin: 5,
                            formatter (params) {
                                return params.split('').join('\n')
                            }
                        }
                    },
                    series: [{
                        type: 'bar',
                        yAxisIndex: 0,
                        data: values,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#003366' }, { offset: 1, color: '#2663bc' }])
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
                const { titles, values } = that.handleChartData(datas)
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                series[0].data = values
                xAxis[0].data = titles
                chart.setOption({ series, xAxis })
                setTimeout(() => { chart.resize() }, 10)
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = []
                datas.forEach(item => {
                    titles.push(item.place)
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