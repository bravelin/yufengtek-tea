<!--茶树排行-->
<template>
    <Plane class="amount-rank-wrap">
        <PlaneTitle>茶树排行</PlaneTitle>
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
    const chartDataProp = `$store.state.${moduleNameSpace}.amountRankDatas`

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
                const datas = that.$store.state[moduleNameSpace].amountRankDatas
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].amountRankDatas
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
                        top: 0, left: 60, right: 20, bottom: 15
                    },
                    xAxis: {
                        show: true,
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.2)', width: 0.5 }
                        },
                        axisLine: { lineStyle: { color: 'rgba(0,0,0,0)' } },
                        axisLabel: { margin: 2, interval: 0, rotate: 0, color: '#fff', fontSize: 12 }
                    },
                    yAxis: [{
                        show: true,
                        data: titles,
                        inverse: true,
                        axisLine: {
                            show: false
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
                            margin: 10
                        }
                    }],
                    series: [{
                        type: 'bar',
                        yAxisIndex: 0,
                        data: values,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#00EFF8' }, { offset: 1, color: '#005DBE' }])
                            }
                        }
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'insideRight',
                        //         formatter (item) {
                        //             return `${item.value} ${that.amountRankUnit}`
                        //         },
                        //         color: '#fff',
                        //         fontSize: 12,
                        //         offset: [0, 2]
                        //     }
                        // }
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
                const yAxis = currOption.yAxis
                series[0].data = values
                yAxis[0].data = titles
                chart.setOption({ series, yAxis })
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