<!--地图-->
<template>
    <div class="map-wrap plane" :class="{ 'full-screen-plane': mapFullState }">
        <h3>溯源动态</h3>
        <div class="map-container" ref="chart"></div>
        <i class="iconfont full-icon" @click="doSwitchFullState" v-html="mapFullState ? '&#xe603;' : '&#xe754;'"></i>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import echarts from '@/lib/china.map'
    import Api from '@/lib/api'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullStateProp = `$store.state.${moduleNameSpace}.mapFullState`

    export default {
        name: 'HomeMap',
        computed: {
            ...thisMapState(['mapFullState'])
        },
        watch: {
            [fullStateProp] () {
                const that = this
                if (that.chart) {
                    setTimeout(() => {
                        that.chart.resize()
                    }, 10)
                }
            }
        },
        data () {
            return {
                currPlace: '',
                chart: null
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
            })
        },
        methods: {
            init () {
                const that = this
                const baseOptions = { // 地图基础配置项
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        rippleEffect: { period: 15, scale: 6, brushType: 'fill' },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(147, 235, 248, .8)', shadowBlur: 10, shadowColor: '#333'
                            }
                        },
                        data: []
                    }]
                }
                echarts.default.initChinaMap(that.$refs.chart, baseOptions, (labelName, placeName, option, instance) => { // callback
                    // console.log('map callback:', labelName, placeName, option, instance)
                    that.chart = instance
                    const store = that.$store
                    that.currPlace = placeName
                    store.commit(`${ns.HOME}/${types.HOME_MAP_CHANGE}`, { label: labelName, place: placeName })
                    store.dispatch(`${ns.HOME}/${types.GET_IOT_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_IN_WAREHOUSE_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_OUT_WAREHOUSE_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_PURCHASE_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_DAILY_FOOD_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_DELIVERY_DATA}`)
                    store.dispatch(`${ns.HOME}/${types.GET_HOME_ORIGIN_DATA}`)
                    // 此处加载地图数据
                    that.$ajax({ url: Api.getPurchaseMapData.replace('placeName', placeName) }).then(res => {
                        if (res && res.length) {
                            const data = res.map(item => {
                                return {
                                    name: item.name,
                                    value: [item.geoCoord[0], item.geoCoord[1], item.value]
                                }
                            })
                            // update data
                            const series = instance.getOption().series
                            series[0].data = data
                            instance.setOption({ series })
                        }
                    })
                })
            },
            doSwitchFullState () {
                const that = this
                that.$store.commit(`${moduleNameSpace}/${types.HOME_MAP_FULL_STATE_CHANGE}`)
            }
        }
    }
</script>
