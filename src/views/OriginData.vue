<!--溯源数据-->
<template>
    <Plane class="app-origin-data-wrap">
        <PlaneTitle>溯源数据</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import Plane from '@/components/Plane'
    import PlaneTitle from '@/components/PlaneTitle'
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    require('echarts-wordcloud')
    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.cityDatas`

    export default {
        name: 'app-origin-data',
        components: {
            Plane, PlaneTitle
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
                const datas = that.$store.state[moduleNameSpace].cityDatas
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].farmingActdatas
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
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}'
                    },
                    series: [{
                        type: 'wordCloud',
                        gridSize: 10,
                        sizeRange: [14, 40],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        autoSize: {
                            enable: true,
                            minSize: 12
                        },
                        data: datas,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'hsla(' + [
                                        207 + Math.round(Math.random() * 10),
                                        (75 + Math.round(Math.random() * 12)) + '%',
                                        (60 + Math.round(Math.random() * 10)) + '%',
                                        0.2 + Math.random()
                                    ].join(',') + ')'
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const currOption = chart.getOption()
                const series = currOption.series
                const legend = currOption.legend
                series[0].data = seriesData
                legend.data = legendData
                chart.setOption({ series, legend })
                setTimeout(() => { chart.resize() }, 10)
            },
            // full state change
            doSwitchFullState () {
                const that = this
            }
        }
    }
</script>