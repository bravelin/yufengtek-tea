<!--农事信息-->
<template>
    <Plane class="farming-info-wrap" :full="farmingInfoFullState">
        <PlaneTitle>施肥信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
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
            ...thisMapState([fullProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
            console.log(12)
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
                const { values, titles } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                const options = {
                    grid: { top: 16, left: 0, right: 5, bottom: 0, containLabel: true },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}月：{c}' + 'kg',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(238, 238, 238, 0.4)'
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
                    color: ['#4775b7'],
                    series: [
                    {
                        smooth: true,
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 0.02,
                        data: values,
                        lineStyle: { type: 'dotted', width: 1, color: 'rgba(0, 159, 253, 0.65)' },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(71, 117, 183, 0.3)' }, { offset: 0.85, color: 'rgba(71, 117, 183, 0.1)' }], false)
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
                const { titles, values } = that.handleChartData(datas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        grid: { top: 32, left: 20, right: 20, bottom: 20 },
                        series: [{ data: values }],
                        xAxis: [{ axisLabel: { margin: 12, fontSize: 15 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 12, fontSize: 15 } }],
                        tooltip: { textStyle: { fontSize: 18 } },
                    }
                } else {
                    options = {
                        grid: { top: 10, left: 0, right: 5, bottom: 0 },
                        series: [{ data: values }],
                        xAxis: [{ axisLabel: { margin: 8, fontSize: 12 }, data: titles }],
                        yAxis: [{ axisLabel: { margin: 8, fontSize: 12 } }],
                        tooltip: { textStyle: { fontSize: 14 } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                console.log(datas)
                const that = this
                const widthObj = {} // 计算数值对应的圈圈宽度
                let preKey = 0
                const dataList = datas.map(item => item.value).sort((a, b) => { return a - b > 0 ? 1 : -1 }) // 从小到大排好序的数据
                dataList.forEach((item, index) => {
                    
                    if (index === 0) {
                        widthObj[item] = 14 + item.toString().length * 2 // 根据最小值的位数决定最小宽度
                        preKey = item
                    } else if (dataList[index - 1] !== item) {
                        widthObj[item] = widthObj[preKey] + 3
                        preKey = item
                    }
                })
                const titles = []
                const values = []
                let w = 0
                const maxWidth = that[fullProp] ? 42 : 28
                datas.forEach(item => {
                    titles.push(item.label + '月') // date data
                    w = widthObj[item.value]
                    w = w > maxWidth ? maxWidth : w
                    values.push({
                        name: item.label,
                        value: item.value.toFixed(2),
                        emphasis: { label: true },
                        label: {
                            show: true,
                            padding: 0,
                            borderWidth: that[fullProp] ? 2 : 1,
                            borderColor: 'rgba(0, 159, 253, 0.3)',
                            borderRadius: w,
                            verticalAlign: 'middle',
                            align: 'center',
                            width: w,
                            height: w,
                            lineHeight: w,
                            fontSize: that[fullProp] ? 14 : 9,
                            color: '#fff',
                            rich: {}
                        }
                    })
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