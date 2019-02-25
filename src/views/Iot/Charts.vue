<template>
    <Plane class="iot-container">
        <PlaneTitle>实时环境</PlaneTitle>
        <ul class="data-list">
            <li class="temperature" :class="{ active: currFm == 'temperature' }" @click="switchFm('temperature', '温度')">
                <div>{{ fmData.temperature }}°C</div>
                <div>温度</div>
            </li>
            <li class="humidity" :class="{ active: currFm == 'humidity' }" @click="switchFm('humidity', '湿度')">
                <div>{{ fmData.humidity }}%</div>
                <div>湿度</div>
            </li>
            <li class="light" :class="{ active: currFm == 'light' }" @click="switchFm('light', '光照')">
                <div>{{ fmData.light }}Lux</div>
                <div>光照</div>
            </li>
            <li class="pressure" :class="{ active: currFm == 'pressure' }" @click="switchFm('pressure', '气压')">
                <div>{{ fmData.pressure }}Pa</div>
                <div>气压</div>
            </li>
        </ul>
        <ul class="selector">
            <li :class="{ active: currFmDataType=='HOUR' }" @click="switchFmDataType('HOUR')">时刻数据</li>
            <li :class="{ active: currFmDataType=='WEEK' }" @click="switchFmDataType('WEEK')">七天数据</li>
        </ul>
        <div class="plane-content" ref="chart"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import echarts from '@/lib/echarts'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.fmChartDatas`
    const fullStateProp = `$store.state.${moduleNameSpace}.curveChartFullState`

    export default {
        name: 'ProductionMonitorCharts',
        computed: {
            ...thisMapState(['currFm', 'fmData', 'currFmDataType', 'fmChartDatas', 'currFmName', 'chartUnit', 'curveChartFullState'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () {
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
                if (that.fmChartDatas.length) {
                    that.initChart()
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].fmChartDatas
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
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM, { value, name })
                setTimeout(() => { store.dispatch(moduleNameSpace + '/' + types.GET_FMS_CHART_DATA) }, 1000)
            },
            // 更改时刻数据/七天数据
            switchFmDataType (val) {
                const that = this
                const store = that.$store
                if (that.currFmDataType == val) {
                    return
                }
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM_DATA_TYPE, val)
                store.dispatch(moduleNameSpace + '/' + types.GET_FMS_CHART_DATA)
            },
            // 初始化图表
            initChart () {
                const that = this
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fmChartDatas)
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
                            return `时间：${params[0].name}<br/>${that.currFmName}：${params[0].data.value} ${that.chartUnit}`
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
                    color: ['#e54035'],
                    series: [
                    {
                        type: 'line',
                        data: lineDatas,
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                color: { colorStops: [{ offset: 0, color: '#821eff' }, { offset: 1, color: '#204fff' }] }
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
                const { titles, barDatas, lineDatas } = that.doHandlerData(that.fmChartDatas)
                const currOption = chart.getOption()
                const series = currOption.series
                const xAxis = currOption.xAxis
                const tooltip = currOption.tooltip
                series[0].data = lineDatas
                xAxis[0].data = titles
                tooltip.formatter = function (params) {
                    return `时间：${params[0].name}<br/>${that.currFmName}：${params[0].data.value} ${that.chartUnit}`
                }
                chart.setOption({ series, xAxis, tooltip })
                setTimeout(() => { chart.resize() }, 10)
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
            doSwitchFullState () {
                const that = this
                that.$store.commit(`${moduleNameSpace}/${types.PRODUCTION_CURVE_FULL_STATE_CHANGE}`)
            }
        }
    }
</script>
