<template>
    <Plane class="iot-container" :full="fm2.curveChartFullState">
        <PlaneTitle>FM2实时环境</PlaneTitle>
        <ul class="data-list">
            <li class="wind" :class="{ active: fm2.type == 'wind' }" @click="switchFm('wind', '风速')">
                <div>{{ fm2.data.wind }}m/s</div>
                <div>风速</div>
            </li>
            <li class="rain" :class="{ active: fm2.type == 'rain' }" @click="switchFm('rain', '降雨量')">
                <div>{{ fm2.data.rain }}mm</div>
                <div>降雨量</div>
            </li>
            <li class="soil-temperature" :class="{ active: fm2.type == 'temperature' }" @click="switchFm('temperature', '土壤温度')">
                <div>{{ fm2.data.temperature }}°C</div>
                <div>土壤温度</div>
            </li>
            <li class="soil-humidity" :class="{ active: fm2.type == 'humidity' }" @click="switchFm('humidity', '土壤湿度')">
                <div>{{ fm2.data.humidity }}%</div>
                <div>土壤湿度</div>
            </li>
        </ul>
        <ul class="selector">
            <li :class="{ active: fm2.time == 'HOUR' }" @click="switchFmTimeType('HOUR')">时刻数据</li>
            <li :class="{ active: fm2.time == 'WEEK' }" @click="switchFmTimeType('WEEK')">七天数据</li>
        </ul>
        <div class="plane-content" ref="chart"></div>
        <PlaneTools :full="fm2.curveChartFullState" @change="doFullStateChange"></PlaneTools>
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
    const chartDataProp = `$store.state.${moduleNameSpace}.fm2.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.fm2.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'iot-fm2-charts',
        computed: {
            ...thisMapState(['fm2'])
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
                if (that['fm2'][dataProp].length) {
                    that.initChart()
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace]['fm2'][dataProp]
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
                const sno = store.state[moduleNameSpace]['fm2'].sno
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM2_TYPE, { value, name })
                setTimeout(() => { store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, sno) }, 1000)
            },
            // 更改时刻数据/七天数据
            switchFmTimeType (val) {
                const that = this
                const store = that.$store
                if (that.fm2.time == val) {
                    return
                }
                const sno = store.state[moduleNameSpace]['fm2'].sno
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM2_TIME_TYPE, val)
                store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, sno)
            },
            // 初始化图表
            initChart () {
                const that = this
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fm2.chartDatas)
                that.chart = echarts.init(that.container)
                const option = {
                    grid: { top: 20, left: 22, right: 20, bottom: 12, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238,238,238,0.4)'
                            }
                        },
                        formatter (params) {
                            return `时间：${params[0].name}<br/>${that.fm2.name}：${params[0].data.value} ${that.fm2.chartUnit}`
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
                        showSymbol: true,
                        smooth: true,
                        symbol: that.fm2.type == 'wind' ? `image://${location.origin}/images/arrow.png` : 'circle',
                        symbolSize: that.fm2.type == 'wind' ? 20 : 6,
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
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fm2.chartDatas)
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                const tooltip = currOption.tooltip
                series[0].data = lineDatas
                xAxis[0].data = titles
                tooltip.formatter = function (params) {
                    return `时间：${params[0].name}点<br/>${that.fm2.name}：${params[0].data.value} ${that.fm2.chartUnit}`
                }
                if (that.fm2.type == 'wind') {
                    series[0].symbol = `image://${location.origin}/images/arrow.png`
                    series[0].symbolSize = 20
                } else {
                    series[0].symbol = 'circle'
                    series[0].symbolSize = 6
                }
                chart.setOption({ series, xAxis, tooltip })
                setTimeout(() => { chart.resize() }, 200)
            },
            doHandlerData (list) {
                const that = this
                const titles = []
                const barDatas = []
                const lineDatas = []
                let obj = null
                list.forEach(item => {
                    titles.push((item.title.length > 6) ? item.title.substr(5) : item.title)
                    barDatas.push({ name: item.title, value: item.data })
                    obj = { name: item.title, value: item.data }
                    if (that.fm2.type == 'wind') {
                        // 风向旋转角度
                        obj.symbolRotate = item.rotate
                    }
                    lineDatas.push(obj)
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
