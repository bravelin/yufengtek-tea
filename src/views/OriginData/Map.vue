<template>
    <Plane class="map-wrap">
        <PlaneTitle>溯源分布</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import MapStyleJson from './mapStyle'

    const moduleNameSpace = ns.ORIGIN
    const dataProp = 'mapDatas'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`

    export default {
        name: 'origin-map',
        watch: {
            // [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
            //     this.doInitOrRefreshChart()
            // }
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
                const options = {
                    tooltip: { trigger: 'item' },
                    bmap: {
                        center: [104.114129, 37.550339],
                        zoom: 5,
                        roam: true,
                        mapStyle: {
                            styleJson: MapStyleJson
                        }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'bmap',
                            data: datas,
                            symbolSize (val) {
                                return val[2] / 15
                            },
                            label: {
                                normal: {
                                    formatter: '{b}', position: 'right', show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(8, 175, 156, 0.75)'
                                }
                            }
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'bmap',
                            data: datas.sort((a, b) => { return b.value - a.value }).slice(0, 6),
                            symbolSize (val) {
                                return val[2] / 15
                            },
                            showEffectOn: 'emphasis',
                            rippleEffect: { brushType: 'stroke' },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(8, 175, 156, 0.75)',
                                    shadowBlur: 5,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
                console.log('that.chart....', that.chart)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const currOption = chart.getOption()
                const series = currOption.series
                series[0].data = datas
                series[1].data = datas.sort((a, b) => { return b.value - a.value }).slice(0, 6)
                chart.setOption({ series })
                setTimeout(() => { chart.resize() }, 200)
            }
        }
    }
</script>
