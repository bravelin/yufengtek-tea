<!--采摘信息-->
<template>
    <Plane class="pick-info-wrap" :full="pickInfoFullState">
        <PlaneTitle>采摘信息</PlaneTitle>
        <div class="plane-content" :class="{ hide: !pickDatas.length }">
            <div ref="container" class="chart-container"></div>
            <div class="chart-title" v-show="pickDatas.length"><div>{{ teaTotalAmount }}<span>{{ pickDataUnit }}</span></div><h4>总产量</h4></div>
            <ul class="rank-list" :class="{ gap: rankDataList.length <= 4 }">
                <li v-for="(item, index) in rankDataList" :key="index">
                    <div><span>{{ index + 1}}</span><i class="iconfont">&#xe630;</i></div>
                    <div>{{ item.name }}</div>
                    <div><div :style="{ width: item.ratio }"></div></div>
                    <div>{{ item.ratio }}</div>
                </li>
            </ul>
        </div>
        <PlaneTools v-show="pickDatas.length" :full="pickInfoFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!pickDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'pickPieDatas'
    const fullProp = 'pickInfoFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomePickInfo',
        computed: {
            ...thisMapState(['teaTotalAmount', fullProp, dataProp, 'pickDataUnit', 'pickDatas']),
            rankDataList () {
                const that = this
                const dataList = that.$store.state[moduleNameSpace]['pickDatas']
                // 前六种类型
                const totalData = dataList.reduce((total, item) => total + item.value, 0)
                let list = []
                dataList.forEach((item, index) => {
                    if (index < 6) {
                        list.push({
                            name: item.label,
                            ratio: ((item.value / totalData) * 100).toFixed(1) + '%'
                        })
                    }
                })
                return list
            },
            ...mapState(['smallScreen', 'miniScreen'])
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
                that.doInitOrRefreshChart()
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
                if (datas && datas.length) {
                    const container = that.container
                    if (container) {
                        const { seriesData, legendData } = that.handleChartData(datas)
                        const options = that.getBaseOptions(seriesData, legendData)
                        that.fixOptions(options, seriesData, legendData)
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
            getBaseOptions (seriesData, legendData) {
                return {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: {
                        show: true,
                        data: legendData,
                        orient: 'horizontal',
                        right: '3%',
                        bottom: 0,
                        itemGap: 8,
                        itemWidth: 8,
                        textStyle: { color: '#e0e0e0', fontSize: 12, padding: [2, 0, 0, 0] }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['52%', '74%'],
                        center: ['76%', '46%'],
                        label: { show: false },
                        color: ['#ff5f6c', '#1cd782', '#fac720', '#294dd8', '#15467d'],
                        data: seriesData,
                        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, seriesData, legendData) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        options.tooltip.textStyle.fontSize = 18
                        options.legend.bottom = '4.5%'
                        options.legend.right = '14.5%'
                        options.legend.textStyle.fontSize = 15
                        options.legend.itemWidth = 14
                        options.legend.itemGap = 25
                        options.legend.textStyle.padding = [2, 0, 0, 5]
                    }
                } else {
                    if (that.miniScreen) {
                        options.series[0].center[0] = '60%'
                        options.legend.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        options.legend.textStyle.fontSize = 11
                    }
                }
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const { seriesData, legendData } = that.handleChartData(datas)
                let options = null
                const miniScreen = that.miniScreen
                if (that[fullProp]) {
                    options = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ center: [miniScreen ? '38%' : '76%', '46%'], radius: ['51%', '75%'], data: seriesData }],
                        legend: { data: legendData, right: '15%', itemGap: 20, bottom: 20, textStyle: { fontSize: 16 } },
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ center: [miniScreen ? '38%' : '76%', '46%'], radius: ['51%', miniScreen ? '80%' : '75%'], data: seriesData }],
                        legend: { data: legendData, right: miniScreen ? 0 : '3%', itemGap: miniScreen ? 5 : 8, bottom: 0, textStyle: { fontSize: 12, padding: [2, 0, 0, 0] } },
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.label, value: item.value })
                    legendData.push({ name: item.label, icon: 'circle' })
                }
                return { legendData, seriesData }
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