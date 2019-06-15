<template>
    <div class="map-wrap" ref="container"></div>
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
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'OriginMap',
        computed: {
            ...thisMapState([dataProp])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
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
                const datas = that[dataProp]
                if (!that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
                if (datas) {
                    if (that.container) {
                        that.chart ? that.refresh(datas) : that.init(datas)
                    }
                }
            },
            // 创建图表
            init (datas) {
                const that = this
                const container = that.container
                const options = that.getBaseOptions(datas)
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const currOption = chart.getOption()
                const series = currOption.series
                const { scatterDatas, normalDatas } = that.doHandlerDatas(datas)
                series[0].data = normalDatas
                series[1].data = scatterDatas
                chart.setOption({ series })
                setTimeout(() => { chart.resize() }, 200)
            },
            doHandlerDatas (datas) {
                const thisDatas = [...datas].filter(item => !!item.name)
                thisDatas.sort((a, b) => { return b.value - a.value > 0 ? -1 : 1 })
                const scatterDatas = []
                const normalDatas = []
                const colors = ['#ff5f6c', '#fac720', '#1cd782']
                let itemValue = 0
                thisDatas.forEach((item, index) => {
                    if (index < 5) {
                        scatterDatas.push(item)
                        item.itemStyle = { normal: { color: colors[index] || 'rgba(255, 255, 255, 0.75)' } }
                        itemValue = item.value[2]
                        if (itemValue > 1000) {
                            item.symbolSize = 24
                        } else if (itemValue > 500) {
                            item.symbolSize = 20
                        } else if (itemValue > 100) {
                            item.symbolSize = 16
                        } else {
                            item.symbolSize = 14
                        }
                    } else {
                        normalDatas.push(item)
                    }
                })
                return { scatterDatas, normalDatas }
            },
            // 图表配置项
            getBaseOptions (datas) {
                const { scatterDatas, normalDatas } = this.doHandlerDatas(datas)
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter (params) { return params.name + '：' + params.value[2] },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)'
                    },
                    bmap: {
                        center: [108.9462765501, 34.3474989219],
                        zoom: 5.5,
                        roam: true,
                        mapStyle: { styleJson: MapStyleJson }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'bmap',
                            data: normalDatas,
                            symbolSize: 10,
                            label: {
                                normal: { formatter: '{b}', position: 'right', show: false },
                                emphasis: { show: true }
                            },
                            itemStyle: { normal: { color: 'rgba(255, 255, 255, 0.75)' } }
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'bmap',
                            data: scatterDatas,
                            symbolSize: 14,
                            showEffectOn: 'render',
                            rippleEffect: { brushType: 'stroke' },
                            hoverAnimation: true,
                            label: { normal: { formatter: '{b}', position: 'right', show: true } },
                            itemStyle: { normal: { color: 'rgba(255, 255, 255, 0.75)', shadowBlur: 5, shadowColor: '#333' } },
                            zlevel: 1
                        }
                    ]
                }
            }
        }
    }
</script>