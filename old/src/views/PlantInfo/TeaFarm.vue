<!--山场品质-->
<template>
    <Plane class="tea-farm-wrap" :full="teaFarmFullState">
        <PlaneTitle>种植品质</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !teaFarmTypeDatas.length }"></div>
        <div class="chart-title" v-show="teaFarmTypeDatas.length"><h4>种植比例</h4><div>{{ farmTotalArea }}<span>亩</span></div></div>
        <PlaneTools v-show="teaFarmTypeDatas.length" :full="teaFarmFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!teaFarmTypeDatas.length" class="iconfont null-data-tag">&#xe642;</div>
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
    const fullProp = 'teaFarmFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'plant-tea-farm',
        computed: {
            ...thisMapState(['farmTotalArea', fullProp, dataProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () {
                this.doInitOrRefreshChart()
            },
            [resizeStateProp] () {
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
                const datas = that[dataProp]
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
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
                const miniScreen = that.miniScreen
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}亩 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: {
                        show: true,
                        data: legendData,
                        orient: 'vertical',
                        right: miniScreen ? 0 : '3%',
                        top: 10,
                        itemGap: miniScreen ? 5 : 15,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: miniScreen ? 12 : 14,
                            padding: [2, 0, 0, miniScreen ? 0 : 4]
                        }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '88%'],
                        center: [miniScreen ? '40%' : '44%', '50%'],
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                            fontSize: 12
                        },
                        color: ['#15467d', '#87d0f6', '#4775b7', '#91acd4', '#2663bc'],
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
                let options = null
                const miniScreen = that.miniScreen
                if (that[fullProp]) {
                    options = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ center: [miniScreen ? '40%' : '44%', '50%'], data: seriesData, label: { fontSize: 16 } }],
                        legend: { data: legendData, right: '3.5%', itemGap: 20, top: 20, textStyle: { fontSize: 16 } },
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ center: [miniScreen ? '40%' : '44%', '50%'], data: seriesData, label: { fontSize: 12 } }],
                        legend: { data: legendData, right: miniScreen ? 0 : '3%', itemGap: miniScreen ? 5 : 15, top: 10, textStyle: { fontSize: miniScreen ? 12 : 14 } },
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            doHandlerData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.quality, value: item.area })
                    legendData.push(item.quality)
                }
                return { legendData, seriesData }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
