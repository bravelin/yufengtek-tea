<template>
    <Plane class="iot-container" :full="fm1.curveChartFullState">
        <PlaneTitle>{{ fm1.iotName || 'FM1'}}实时环境</PlaneTitle>
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
        <div class="chart-unit" v-show="fm1.chartDatas.length">单位：{{ fm1.chartUnit }}</div>
        <div class="plane-content" ref="chart" :class="{ hide: !fm1.chartDatas.length }"></div>
        <div v-show="!fm1.chartDatas.length" class="iconfont null-data-tag">&#xe642;</div>
        <PlaneTools :full="fm1.curveChartFullState" @change="doFullStateChange" v-show="fm1.chartDatas.length"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import echarts from '@/lib/echarts'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.IOT
    const fullProp = 'curveChartFullState'
    const dataProp = 'chartDatas'
    const typeProp = 'data'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const prefix = `$store.state.${moduleNameSpace}.fm1`
    const typeDataProp = `${prefix}.${typeProp}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'IotFm1Charts',
        computed: {
            ...thisMapState(['fm1']),
            ...mapState(['smallScreen', 'miniScreen'])
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
                if (that.fm1[dataProp].length) {
                    that.doInitOrRefreshChart()
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.fm1[dataProp]
                if (datas && datas.length) {
                    const container = that.container
                    if (container) {
                        const { titles, lineDatas } = that.doHandlerData(that.fm1.chartDatas)
                        const options = that.getBaseOptions(titles, lineDatas)
                        that.fixOptions(options, titles, lineDatas)
                        if (that.chart) { // 刷新
                            that.chart.setOption(options)
                            setTimeout(() => { that.chart.resize() }, 200)
                        } else { // 初始化
                            that.chart = echarts.init(container)
                            that.chart.setOption(options)
                        }
                    }
                }
            },
            // 图表配置项
            getBaseOptions (titles, lineDatas) {
                const that = this
                const { min, max, interval } = computedChartDataInterval(that.fm1.chartDatas.map(item => item.data), 4)
                return {
                    grid: { top: 20, left: 22, right: 20, bottom: 12, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: { lineStyle: { color: 'rgba(238,238,238,0.4)' } },
                        formatter (params) {
                            return `时间：${params[0].name}<br/>${that.fm1.name}：${params[0].data.value} ${that.fm1.chartUnit}`
                        },
                        textStyle: { fontSize: 14 }
                    },
                    xAxis: {
                        type: 'category',
                        data: titles,
                        boundaryGap: true,
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { margin: 15, textStyle: { color: '#fff', fontSize: 12 } },
                        splitLine: { show: false, lineStyle: { type: 'dosh', color: 'rgba(38, 99, 188, 0.15)' } },
                    },
                    yAxis: {
                        show: true,
                        min,
                        max,
                        interval,
                        splitLine: { show: true, lineStyle: { type: 'dosh', color: 'rgba(255, 255, 255, 0.2)' } },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { show: true, color: '#fff', textStyle: { fontSize: 12 } }
                    },
                    series: [{
                        type: 'line',
                        data: lineDatas,
                        symbol: 'circle',
                        symbolSize: 6,
                        showSymbol: true,
                        smooth: true,
                        itemStyle: { normal: { color: '#9be1fc', label: { show: false } } },
                        lineStyle: { width: 2, color: 'rgb(153, 227, 253)' },
                        areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(153, 228, 253, 0.6)' }, { offset: 1, color: 'rgba(45, 80, 131, 0.1)' }], false) } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, titles, lineDatas) {
                const that = this
                if (that.fm1[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(that.fm1.chartDatas.map(item => item.data), 6)
                        options.yAxis.min = min
                        options.yAxis.max = max
                        options.yAxis.interval = interval
                        options.yAxis.axisLabel.margin = 12
                        options.yAxis.axisLabel.textStyle.fontSize = 15
                        options.xAxis.axisLabel.margin = 12
                        options.xAxis.axisLabel.textStyle.fontSize = 15
                        options.tooltip.textStyle.fontSize = 18
                    }
                } else {
                    if (that.miniScreen) {
                        options.grid = { top: 20, left: 12, right: 12, bottom: 6, containLabel: true }
                        options.series[0].symbolSize = 5
                        options.series[0].lineStyle.width = 1
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        options.grid = { top: 20, left: 15, right: 15, bottom: 8, containLabel: true }
                        options.series[0].symbolSize = 7
                        options.series[0].itemStyle.normal.label.fontSize = 10
                        options.series[0].lineStyle.width = 1
                        options.xAxis.axisLabel.margin = 9
                        options.xAxis.axisLabel.textStyle.fontSize = 11
                        options.yAxis.axisLabel.margin = 9
                        options.yAxis.axisLabel.textStyle.fontSize = 11
                        options.tooltip.textStyle.fontSize = 12
                    }
                }
            },
            // 更改实时环境数据
            switchFm (value, name) {
                const that = this
                const store = that.$store
                if (that.fm1.type == value) {
                    return
                }
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM1_TYPE, { value, name })
                const sno = store.state[moduleNameSpace]['fm1'].sno
                store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA, sno)
            },
            // 更改时刻数据/七天数据
            switchFmTimeType (val) {
                const that = this
                const store = that.$store
                if (that.fm1.time == val) {
                    return
                }
                const sno = that.fm1.sno
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM1_TIME_TYPE, val)
                store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA, sno)
            },
            // 处理折线图数据
            doHandlerData (list) {
                const titles = []
                const lineDatas = []
                list.forEach(item => {
                    titles.push((item.title.length > 6) ? item.title.substr(5) : item.title)
                    lineDatas.push({ name: item.title, value: item.data })
                })
                return { titles, lineDatas }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    subModuleName: 'fm1',
                    state: payload
                })
            }
        }
    }
</script>
