<!--武夷地图-->
<template>
    <Plane class="map-wrap">
        <PlaneTitle>出库入库</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import echarts from '@/lib/echarts'
    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.mapInfoData`

    export default {
        name: 'warehouse-map',
        computed: {
            ...thisMapState(['mapInfoData'])
        },
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.$ajax({ url: './map.json' }).then(res => {
                    echarts.registerMap('wuyishan', res)
                    that.chart = echarts.init(that.$refs.container)
                    that.chart.setOption({
                        backgroundColor: 'transparent',
                        geo: {
                            map: 'wuyishan',
                            itemStyle: {
                                emphasis: { areaColor: '#389BB7', borderWidth: 0 },
                                normal: { areaColor: '#15467d', borderColor: '#2f90cd', borderWidth: 1 }
                            },
                            label: {
                                emphasis: {
                                    textStyle: { color: '#ffffff' }
                                },
                                normal: {
                                    show: true,
                                    textStyle: { color: '#ffffff', fontSize: 12 }
                                }
                            },
                            roam: true,
                            // zlevel: 1,
                            zoom: 1.25
                        },
                        series: [{
                            coordinateSystem: 'geo',
                            data: that.mapInfoData,
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(147, 235, 248, 0.8)',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            rippleEffect: {
                                brushType: 'fill',
                                period: 15,
                                scale: 6
                            },
                            showEffectOn: 'render',
                            type: 'effectScatter'
                        }]
                    })
                })
            })
        }
    }
</script>