<!--农事信息-->
<template>
    <Plane class="farming-info-wrap" :full="farmingInfoFullState">
        <PlaneTitle>施肥信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <div class="chart-title"><h4>农事活动比</h4></div>
        <PlaneTools :full="farmingInfoFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'farmingActdatas'
    const fullProp = 'farmingInfoFullState'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'app-farming-info',
        computed: {
            ...thisMapState([fullProp])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{d}%',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    // graphic: [{
                    //     type: 'text',
                    //     left: '36.5%',
                    //     top: 'center',
                    //     style: {
                    //         text: '农事活动比',
                    //         fill: '#d0d0d0',
                    //         font: 'normal 14px "Microsoft YaHei", sans-serif'
                    //     }
                    // }],
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
                        radius: ['46%', '89%'],
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
                const { seriesData, legendData } = that.handleChartData(datas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ data: seriesData, label: { fontSize: 16 } }],
                        legend: { data: legendData, right: '3.5%', itemGap: 20, top: 20, textStyle: { fontSize: 16 } },
                        // graphic: [{ left: '40.9%', style: { font: 'normal bold 20px "Microsoft YaHei", sans-serif' } }]
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ data: seriesData, label: { fontSize: 12 } }],
                        legend: { data: legendData, right: '3%', itemGap: 15, top: 10, textStyle: { fontSize: 14 } },
                        // graphic: [{ left: '36.5%', style: { font: 'normal 14px "Microsoft YaHei", sans-serif' } }]
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
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
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>