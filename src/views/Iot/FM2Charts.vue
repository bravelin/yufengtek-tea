<template>
    <Plane class="iot-container" :full="fm2.curveChartFullState">
        <PlaneTitle>{{ fm2.iotName || 'FM2'}}实时环境</PlaneTitle>
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
        <div class="chart-unit" v-show="fm2.chartDatas.length">单位：{{ fm2.chartUnit }}</div>
        <div class="plane-content" ref="chart" :class="{ hide: !fm2.chartDatas.length }"></div>
        <div v-show="!fm2.chartDatas.length" class="iconfont null-data-tag">&#xe642;</div>
        <PlaneTools :full="fm2.curveChartFullState" @change="doFullStateChange" v-show="fm2.chartDatas.length"></PlaneTools>
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
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.fm2.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.fm2.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'IotFm2Charts',
        computed: {
            ...thisMapState(['fm2']),
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
                if (that.fm2[dataProp].length) {
                    that.doInitOrRefreshChart()
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.fm2[dataProp]
                if (datas && datas.length) {
                    const container = that.container
                    if (that.container) {
                        const { titles, lineDatas } = that.doHandlerData(that.fm2.chartDatas)
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
                const { min, max, interval } = computedChartDataInterval(that.fm2.chartDatas.map(item => item.data), 4)
                return {
                    grid: { top: 20, left: 22, right: 20, bottom: 12, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(0, 159, 253, 0.5)',
                        axisPointer: { lineStyle: { color: 'rgba(238,238,238,0.4)' } },
                        formatter (params) {
                            return `时间：${params[0].name}<br/>${that.fm2.name}：${params[0].data.value} ${that.fm2.chartUnit}`
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
                    series: [
                        {
                            type: 'line',
                            data: lineDatas,
                            lineStyle: { width: 2, color: 'rgb(153, 227, 253)' },
                            showSymbol: true,
                            smooth: true,
                            symbol: that.fm2.type == 'wind' ? `image://${location.origin}/images/arrow.png` : 'circle',
                            symbolSize: that.fm2.type == 'wind' ? 20 : 6,
                            itemStyle: { normal: { color: '#9be1fc', label: { show: false } } },
                            areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(153, 228, 253, 0.6)' }, { offset: 1, color: 'rgba(45, 80, 131, 0.1)' }], false) } }
                        }
                    ]
                }
            },
            // 响应式修正options
            fixOptions (options, titles, lineDatas) {
                const that = this
                if (that.fm2[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        const { min, max, interval } = computedChartDataInterval(that.fm2.chartDatas.map(item => item.data), 6)
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
                        options.series[0].symbolSize = that.fm2.type == 'wind' ? 15 : 5
                        options.series[0].lineStyle.width = 1
                        options.xAxis.axisLabel.margin = 7
                        options.xAxis.axisLabel.textStyle.fontSize = 9
                        options.yAxis.axisLabel.margin = 7
                        options.yAxis.axisLabel.textStyle.fontSize = 9
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        options.grid = { top: 20, left: 15, right: 15, bottom: 8, containLabel: true }
                        options.series[0].symbolSize = that.fm2.type == 'wind' ? 18 : 7
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
            switchFm (value, name) {
                const that = this
                const store = that.$store
                if (that.currFm == value) {
                    return
                }
                const sno = that.fm2.sno
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM2_TYPE, { value, name })
                store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, sno)
            },
            // 更改时刻数据/七天数据
            switchFmTimeType (val) {
                const that = this
                const store = that.$store
                if (that.fm2.time == val) {
                    return
                }
                const sno = that.fm2.sno
                store.commit(moduleNameSpace + '/' + types.SWITCH_FM2_TIME_TYPE, val)
                store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, sno)
            },
            doHandlerData (list) {
                const that = this
                const titles = []
                const lineDatas = []
                let obj = null
                list.forEach(item => {
                    titles.push((item.title.length > 6) ? item.title.substr(5) : item.title)
                    obj = { name: item.title, value: item.data }
                    if (that.fm2.type == 'wind') {
                        obj.symbolRotate = item.rotate // 风向旋转角度
                    }
                    lineDatas.push(obj)
                })
                return { titles, lineDatas }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp, subModuleName: 'fm2', state: payload
                })
            }
        }
    }
</script>
