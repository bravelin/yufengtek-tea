<template>
    <Plane class="count-stat-wrap" :full="countStateFullState">
        <PlaneTitle>溯源次数统计</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="countStateFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.ORIGIN
    const dataProp = 'countStatDatas'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'countStateFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'origin-count-stat',
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
                const { titles, lineDatas } = that.handleChartData(datas)
                const options = {
                    grid: { top: 10, left: 0, right: 10, bottom: 0, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}：{c}次',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        },
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
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.3)' } },
                        axisTick: { show: true },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { show: true, margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    color: ['rgb(67, 81, 124)'],
                    series: [
                    {
                        type: 'line',
                        data: lineDatas,
                        symbol: 'circle',
                        symbolSize: 6,
                        showSymbol: true,
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(67, 81, 124, 0.3)' }, { offset: 1, color: 'rgba(67, 81, 124, 0.1)' }], false)
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
                const { titles, lineDatas } = that.handleChartData(datas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        grid: { top: 25, left: 20, right: 20, bottom: 20 },
                        xAxis: [{ axisLabel: { margin: 12, fontSize: 15 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 12, fontSize: 15 } }],
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ data: lineDatas }]
                    }
                } else {
                    options = {
                        grid: { top: 10, left: 0, right: 10, bottom: 0 },
                        xAxis: [{ axisLabel: { margin: 8, fontSize: 12 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 8, fontSize: 12 } }],
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ data: lineDatas }]
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const titles = []
                const lineDatas = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    titles.push(item.osmonth + '月')
                    lineDatas.push(item.count)
                }
                return { titles, lineDatas }
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.ORIGIN_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
