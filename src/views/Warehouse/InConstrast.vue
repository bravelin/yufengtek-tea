<!--历史入库对比-->
<template>
    <Plane class="in-constrast-wrap" :full="inConstrastFullState">
        <PlaneTitle>历史入库对比</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="inConstrastFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'historyInDatas'
    const fullProp = 'inConstrastFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`

    export default {
        name: 'warehouse-in-constrast',
        computed: {
            ...thisMapState([fullProp])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () {
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
                const { titles, lineDatas, legends } = that.handleChartData(datas)
                const options = {
                    grid: { top: 45, left: 0, right: 5, bottom: 0, containLabel: true },
                    legend: {
                        data: legends,
                        right: 0,
                        top: 15,
                        itemGap: 10,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: 12,
                            padding: [2, 0, 0, 2]
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter (params) {
                            return params.map((item, index) => {
                                return legends[index] + '年' + item.name + '：' + item.value + '吨'
                            }).join('<br/>')
                        },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: true },
                        axisLine: { lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 8, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    color: ['rgb(109, 252, 175)', 'rgb(4, 165, 252)'],
                    yAxis: [{
                        show: true,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.3)' } },
                        axisTick: { show: true },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 8, show: true, textStyle: { color: '#fff', fontSize: 12 } }
                    }],
                    series: that.getSeries(lineDatas)
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            getSeries (lineDatas) {
                return lineDatas.map((item, index) => {
                    return {
                        name: item.year,
                        data: item.list,
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        showSymbol: true,
                        areaStyle: index == 0 ? {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(109, 252, 175, 0.6)' }, { offset: 0.85, color: 'rgba(109, 252, 175, 0.3)' }], false)
                            }
                        } : {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(4, 165, 252, 0.7)' }, { offset: 0.85, color: 'rgba(4, 165, 252, 0.3)' }], false)
                            }
                        }
                    }
                })
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const { titles, lineDatas, legends } = that.handleChartData(datas)
                const series = that.getSeries(lineDatas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        grid: { top: 65, left: 20, right: 20, bottom: 20 },
                        xAxis: [{ axisLabel: { margin: 12, fontSize: 15 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 12, fontSize: 15 } }],
                        tooltip: { textStyle: { fontSize: 18 } },
                        series,
                        legend: { data: legends, top: 25, right: 15, textStyle: { fontSize: 15, padding: [5, 0, 0, 5] } }
                    }
                } else {
                    options = {
                        grid: { top: 45, left: 0, right: 5, bottom: 0 },
                        xAxis: [{ axisLabel: { margin: 8, fontSize: 12 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 8, fontSize: 12 } }],
                        tooltip: { textStyle: { fontSize: 14 } },
                        series,
                        legend: { data: legends, top: 15, right: 0, textStyle: { fontSize: 12, padding: [2, 0, 0, 2] } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const lineDatas = []
                let item = null
                const titleObjs = {}
                let dataItem = null
                let lineObj = null
                const legends = []
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    lineObj = { year: item.year, list: [] }
                    legends.push(item.year)
                    for (let j = 0; j < item.list.length; j++) {
                        dataItem = item.list[j]
                        titleObjs[dataItem.label] = true
                        lineObj.list.push(dataItem.value)
                    }
                    lineDatas.push(lineObj)
                }
                const titles = Object.keys(titleObjs)
                return { titles, lineDatas, legends }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
