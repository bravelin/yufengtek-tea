<!--种植分布-->
<template>
    <Plane class="plant-distribute-wrap">
        <PlaneTitle>种植分布</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <FullScreenButton :link="{ name: 'plant' }" :full="screenFullState"></FullScreenButton>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.plantInfoData`

    export default {
        name: 'home-plant-info',
        computed: {
            ...thisMapState(['plantInfoData']),
            ...mapState(['screenFullState'])
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
                            data: that.infoData,
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