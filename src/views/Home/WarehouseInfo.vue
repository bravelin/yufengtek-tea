<!--入库出库-->
<template>
    <Plane class="warehouse-info-wrap" :full="warehouseFullState">
        <PlaneTitle>入库出库</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="warehouseFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'warehouseDatas'
    const fullProp = 'warehouseFullState'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'home-warehouse',
        computed: {
            ...thisMapState(['warehouseUnit', fullProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
        },
        watch: {
            [chartDataProp] () {
                // 监听store中图表数据的改变，刷新图表
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
                const { titles, values } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: `{b0}<br/>{a0}: {c0} ${that.warehouseUnit}<br/>{a1}: {c1} ${that.warehouseUnit}`,
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        },
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    legend: {
                        show: true,
                        data: ['入库', '出库'],
                        right: 0,
                        top: 18,
                        itemGap: miniScreen ? 5 : 15,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: miniScreen ? 12 : 14,
                            padding: [2, 0, 0, miniScreen ? 0 : 2]
                        }
                    },
                    grid: {
                        top: 48,
                        bottom: 2,
                        left: 5,
                        right: 5,
                        containLabel: true
                    },
                    xAxis: {
                        data: titles,
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { margin: 8, interval: 0, rotate: 0, color: '#fff', fontSize: 12 }
                    },
                    yAxis: [{
                        axisLine: { lineStyle: { color: '#0c3b71' } },
                        axisLabel: { margin: 8, interval: 0, color: '#fff', fontSize: 12 },
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.2)', width: 0.5 }
                        }
                    }],
                    color: ['#91acd4', '#2663bc'],
                    series: [{
                        name: '入库',
                        type: 'bar',
                        barWidth: miniScreen ? 8 : 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5
                            }
                        },
                        data: values[0]
                    }, {
                        name: '出库',
                        type: 'bar',
                        barWidth: miniScreen ? 8 : 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5
                            }
                        },
                        data: values[1]
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const miniScreen = that.miniScreen
                const { titles, values } = that.handleChartData(datas)
                let config = null
                if (that[fullProp]) {
                    config = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        xAxis: [{ data: titles, axisLabel: { margin: 12, fontSize: 15 } }],
                        yAxis: [{ axisLabel: { margin: 12, fontSize: 15 } }],
                        grid: { top: 58, bottom: 20, left: 25, right: 25 },
                        series: [{ barWidth: 20, data: values[0] }, { barWidth: 20, data: values[1] }],
                        legend: { itemGap: 15, right: 20, textStyle: { fontSize: 16, padding: [2, 0, 0, 2] } }
                    }
                } else {
                    config = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        xAxis: [{ data: titles, axisLabel: { margin: 8, fontSize: 12 } }],
                        yAxis: [{ axisLabel: { margin: 8, fontSize: 12 } }],
                        grid: { top: 48, bottom: 2, left: 5, right: 5 },
                        series: [{ barWidth: miniScreen ? 8 : 10, data: values[0] }, { barWidth: 10, data: values[1] }],
                        legend: { itemGap: miniScreen ? 5 : 15, right: 0, textStyle: { fontSize: miniScreen ? 12 : 14, padding: [2, 0, 0, miniScreen ? 0 : 2] } }
                    }
                }
                chart.setOption(config)
                setTimeout(() => { chart.resize() }, 100)
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = [[], []]
                datas.in.forEach(item => {
                    titles.push(item.omonth + '月')
                    values[0].push(item.weight)
                })
                datas.out.forEach(item => {
                    values[1].push(item.weight)
                })
                return { titles, values }
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