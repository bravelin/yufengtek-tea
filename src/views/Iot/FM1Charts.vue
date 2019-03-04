<template>
    <Plane class="iot-container" :full="fm1.curveChartFullState">
        <PlaneTitle>FM1实时环境</PlaneTitle>
        <ul class="data-list">
            <li class="temperature" :class="{ active: fm1.type == 'temperature' }" @click="switchFm('temperature', '温度')">
                <div>{{ fm1.data.temperature }}°C</div>
                <div>温度</div>
            </li>
            <li class="humidity" :class="{ active: fm1.type == 'humidity' }" @click="switchFm('humidity', '湿度')">
                <div>{{ fm1.data.humidity }}%</div>
                <div>湿度</div>
            </li>
            <li class="light" :class="{ active: fm1.type == 'light' }" @click="switchFm('light', '光照')">
                <div>{{ fm1.data.light }}Lux</div>
                <div>光照</div>
            </li>
            <li class="pressure" :class="{ active: fm1.type == 'pressure' }" @click="switchFm('pressure', '气压')">
                <div>{{ fm1.data.pressure }}Pa</div>
                <div>气压</div>
            </li>
        </ul>
        <ul class="selector">
            <li :class="{ active: fm1.time == 'HOUR' }" @click="switchFmTimeType('HOUR')">时刻数据</li>
            <li :class="{ active: fm1.time == 'WEEK' }" @click="switchFmTimeType('WEEK')">七天数据</li>
        </ul>
        <div class="plane-content" ref="chart"></div>
        <PlaneTools :full="fm1.curveChartFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import echarts from '@/lib/echarts'
    const moduleNameSpace = ns.IOT
    const fullProp = 'curveChartFullState'
    const dataProp = 'chartDatas'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.fm1.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.fm1.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'iot-fm1-charts',
        computed: {
            ...thisMapState(['fm1'])
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
                that.container = that.$refs.chart
                if (that['fm1'][dataProp].length) {
                    that.initChart()
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace]['fm1'][dataProp]
                if (datas && datas.length) {
                    if (that.container) {
                        that.chart ? that.refreshChart(datas) : that.initChart(datas)
                    }
                }
            },
            switchFm (value, name) {
                const that = this
                const store = that.$store
                if (that.currFm == value) {
                    return
                }
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM1_TYPE, { value, name })
                setTimeout(() => { store.dispatch(moduleNameSpace + '/' + types.GET_FM1_CHART_DATA) }, 1000)
            },
            // 更改时刻数据/七天数据
            switchFmTimeType (val) {
                const that = this
                const store = that.$store
                if (that.fm1.time == val) {
                    return
                }
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM1_TIME_TYPE, val)
                store.dispatch(moduleNameSpace + '/' + types.GET_FM1_CHART_DATA)
            },
            // 初始化图表
            initChart () {
                const that = this
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fm1.chartDatas)
                that.chart = echarts.init(that.container)
                const option = {
                    grid: { top: 20, left: 10, right: 10, bottom: 12, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        },
                        formatter (params) {
                            return `时间：${params[0].name}<br/>${that.fm1.name}：${params[0].data.value} ${that.fm1.chartUnit}`
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { margin: 15, textStyle: { color: '#fff' } },
                        splitLine: { show: false, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.15)' } },
                    }],
                    yAxis: [{
                        show: true,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.3)' } },
                        axisTick: { show: false },
                        axisLine: { show: true, lineStyle: { color: 'rgba(38, 99, 188, 0.5)' } },
                        axisLabel: { show: true, color: '#fff' }
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
                that.chart.setOption(option)
            },
            // 刷新图表
            refreshChart () {
                const that = this
                const chart = that.chart
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fm1.chartDatas)
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                const tooltip = currOption.tooltip
                series[0].data = lineDatas
                xAxis[0].data = titles
                tooltip.formatter = function (params) {
                    return `时间：${params[0].name}点<br/>${that.fm1.name}：${params[0].data.value} ${that.fm1.chartUnit}`
                }
                chart.setOption({ series, xAxis, tooltip })
                setTimeout(() => { chart.resize() }, 200)
            },
            doHandlerData (list) {
                const titles = []
                const barDatas = []
                const lineDatas = []
                list.forEach(item => {
                    titles.push(item.title)
                    barDatas.push({ name: item.title, value: item.data })
                    lineDatas.push({ name: item.title, value: item.data })
                })
                return { titles, lineDatas, barDatas }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
