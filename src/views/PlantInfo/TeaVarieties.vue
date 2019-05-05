<!--茶树品种-->
<template>
    <Plane class="tea-varieties-wrap" :full="teaVarietiesFullState">
        <PlaneTitle>种植面积</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !varietiesDatas.length }"></div>
        <div class="chart-title" v-show="varietiesDatas.length"><h4>种植比例</h4><div>{{ varietiesTotalData }}<span>亩</span></div></div>
        <PlaneTools :full="teaVarietiesFullState" @change="doFullStateChange" v-show="varietiesDatas.length"></PlaneTools>
        <div v-show="!varietiesDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'varietiesDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'teaVarietiesFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'plant-tea-farm',
        computed: {
            ...thisMapState(['varietiesTotalData', fullProp, dataProp]),
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
                        right: '3%',
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
                        center: ['44%', '50%'],
                        label: { show: true, position: 'inside', formatter: '{d}%', fontSize: 12 },
                        color: ['#15467d', '#43517c', '#87d0f6', '#4775b7', '#91acd4'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
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
                        series: [{ data: seriesData, label: { fontSize: 16 } }],
                        legend: { padding: [2, 0, 0, 4], data: legendData, right: '3.5%', itemGap: 20, top: 20, textStyle: { fontSize: 16 } },
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ data: seriesData, label: { fontSize: 12 } }],
                        legend: { padding: [2, 0, 0, miniScreen ? 0 : 4], data: legendData, right: '3%', itemGap: miniScreen ? 5 : 15, top: 10, textStyle: { fontSize: miniScreen ? 12 : 14 } },
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
                    seriesData.push({ name: item.varieties, value: item.area })
                    legendData.push(item.varieties)
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
