<!--山场品质-->
<template>
    <Plane class="tea-farm-wrap">
        <PlaneTitle>山场品质</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <div class="chart-title"><h4>山场比例</h4><div>{{ farmTotalArea }}<span>亩</span></div></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'teaFarmTypeDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`

    export default {
        name: 'plant-tea-farm',
        computed: {
            ...thisMapState(['farmTotalArea'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
                this.doInitOrRefreshChart()
            }
        },
        data () {
            return {
                container: null,
                chart: null
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
            // 初始化图表
            init (datas) {
                const that = this
                const container = that.container
                const { seriesData, legendData } = that.doHandlerData(datas)
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}亩 ({d}%)'
                    },
                    legend: {
                        show: true,
                        data: legendData,
                        orient: 'vertical',
                        right: '3%',
                        top: 10,
                        itemGap: 15,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: 14,
                            padding: [2, 0, 0, 4]
                        }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '88%'],
                        center: ['44%', '50%'],
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                            fontSize: 12
                        },
                        color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
                const { seriesData, legendData } = that.doHandlerData(datas)
                const currOption = chart.getOption()
                const series = currOption.series
                const legend = currOption.legend
                series[0].data = seriesData
                legend.data = legendData
                chart.setOption({ series, legend })
                setTimeout(() => { chart.resize() }, 10)
            },
            doHandlerData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.label, value: item.value })
                    legendData.push(item.label)
                }
                return { legendData, seriesData }
            }
        }
    }
</script>
