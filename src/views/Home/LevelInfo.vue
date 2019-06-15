<!--制茶等级-->
<template>
    <Plane class="level-info-wrap" :full="levelInfoFullState">
        <PlaneTitle>制茶工艺</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !levelDatas.length }"></div>
        <ul class="legend-list">
            <li v-for="item in legendData" :key="item.name"><div>{{ item.ratio }}</div><div>{{ item.name }}</div><div>{{ item.value }}吨</div></li>
        </ul>
        <PlaneTools :full="levelInfoFullState" @change="doFullStateChange" v-show="levelDatas.length"></PlaneTools>
        <div v-show="!levelDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'levelDatas'
    const fullProp = 'levelInfoFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeLevelInfo',
        computed: {
            ...thisMapState(['teaTotalAmount', fullProp, dataProp]),
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
                chart: null, // 图表实例
                legendData: []
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
                        const options = that.getBaseOptions(seriesData)
                        that.fixOptions(options, seriesData)
                        that.legendData = legendData
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
            getBaseOptions (seriesData) {
                return {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: { show: false },
                    series: [{
                        type: 'pie',
                        radius: ['51%', '75%'],
                        center: ['28%', '50%'],
                        label: { show: false },
                        color: ['#ff5f6c', '#fac720', '#1cd782', '#407fff', '#a682e6', '#00cccd'],
                        data: seriesData,
                        itemStyle: { normal: { shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 12 } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, seriesData) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        options.tooltip.textStyle.fontSize = 18
                    }
                }
            },
            // 数据加工
            handleChartData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                let value = 0
                let legendValue = 0
                const totalData = datas.reduce((total, currItem) => total + (currItem.gravity ? currItem.gravity - 0 : 0), 0)
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    value = item.gravity ? item.gravity.toFixed(2) : 0
                    seriesData.push({ name: item.grade, value: value - 0 })
                    legendValue = value - 0
                    if (legendValue >= 10000) {
                        legendValue = (legendValue / 10000).toFixed(1) + '万'
                    }
                    legendData.push({ name: item.grade, ratio: (((value - 0) / totalData) * 100).toFixed(2) + '%', value: legendValue, realValue: value - 0 })
                }
                seriesData.sort((a, b) => a.value > b.value ? -1 : 1)
                legendData.sort((a, b) => a.realValue > b.realValue ? -1 : 1)
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