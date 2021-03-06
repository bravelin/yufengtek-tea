<!--农事信息-->
<template>
    <Plane class="farming-info-wrap" :full="farmingInfoFullState">
        <PlaneTitle>施肥信息<div class="unit" v-show="farmingActdatas.length">单位：kg</div></PlaneTitle>
        <div :class="{ hide: !farmingActdatas.length }" class="plane-content" ref="container"></div>
        <PlaneTools v-show="farmingActdatas.length" :full="farmingInfoFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!farmingActdatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

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
            ...thisMapState([fullProp, dataProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
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
            // 创建图表
            init (datas) {
                const that = this
                const container = that.container
                const { values, titles } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                // 求得 min、max、interval,4个间隔
                const { min, max, interval } = computedChartDataInterval(values, 4, 0.5)
                const options = {
                    grid: { top: 15, left: 8, right: 8, bottom: 2, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}' + 'kg',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238, 238, 238, 0.4)' } },
                        textStyle: { fontSize: 14 }
                    },
                    xAxis: [{
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: true },
                        axisLine: { lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    yAxis: [{
                        show: true,
                        min,
                        max,
                        interval,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.15)' } },
                        axisTick: { show: true },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { show: true, margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    color: ['#4775b7'],
                    series: [
                    {
                        smooth: true,
                        type: 'line',
                        symbolSize: 45,
                        symbol: 'pin',
                        itemStyle: {
                            normal: {
                                color: 'rgba(0, 159, 253, 0.3)',
                                barBorderRadius: 0,
                                label: { show: true, position: 'inside', fontSize: 9 }
                            }
                        },
                        data: values,
                        lineStyle: { type: 'dotted', width: 1, color: 'rgba(0, 159, 253, 0.65)' },
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const { titles, values } = that.handleChartData(datas)
                const { min, max, interval } = computedChartDataInterval(values, 4, 0.5)
                let options = null
                if (that[fullProp]) {
                    options = {
                        grid: { top: 32, left: 20, right: 20, bottom: 20 },
                        series: [
                            {
                                data: values,
                                symbolSize: 60,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            fontSize: 12
                                        }
                                    }
                                }
                            }
                        ],
                        xAxis: [{ axisLabel: { margin: 12, fontSize: 15 }, data: titles }],
                        yAxis: [{ min, max, interval, axisLabel: { margin: 12, fontSize: 15 } }],
                        tooltip: { textStyle: { fontSize: 18 } },
                    }
                } else {
                    options = {
                        grid: { top: 15, left: 8, right: 8, bottom: 2 },
                        series: [
                            {
                                data: values,
                                symbolSize: 45,
                                itemStyle: {
                                    normal: { label: { fontSize: 9 } }
                                }
                            }
                        ],
                        xAxis: [{ axisLabel: { margin: 8, fontSize: 12 }, data: titles }],
                        yAxis: [{ min, max, interval, axisLabel: { margin: 8, fontSize: 12 } }],
                        tooltip: { textStyle: { fontSize: 14 } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const titles = []
                const values = []
                datas.forEach(item => {
                    titles.push(item.label + '月')
                    values.push(item.value.toFixed(0) - 0)
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