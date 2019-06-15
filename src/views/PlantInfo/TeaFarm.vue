<!--山场品质-->
<template>
    <Plane class="tea-farm-wrap" :full="teaFarmFullState">
        <PlaneTitle>山场品质</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !teaFarmTypeDatas.length }"></div>
        <div class="chart-title" v-show="teaFarmTypeDatas.length"><div>{{ farmTotalArea }}<span>亩</span></div><h4>种植比例</h4></div>
        <ul class="legend-list">
            <li v-for="item in legendData" :key="item.name"><div>{{ item.ratio }}</div><div>{{ item.name }}</div></li>
        </ul>
        <PlaneTools v-show="teaFarmTypeDatas.length" :full="teaFarmFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!teaFarmTypeDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'teaFarmTypeDatas'
    const fullProp = 'teaFarmFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'PlantTeaFarm',
        computed: {
            ...thisMapState(['farmTotalArea', fullProp, dataProp]),
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
                chart: null,
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
                        const { seriesData, legendData } = that.doHandlerData(datas)
                        const options = that.getBaseOptions(datas, seriesData)
                        that.fixOptions(options, datas, seriesData)
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
            getBaseOptions (datas, seriesData) {
                return {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}亩 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    legend: { show: false },
                    series: [{
                        type: 'pie',
                        radius: ['55%', '80%'],
                        center: ['38%', '50%'],
                        label: { show: false },
                        color: ['#ff5f6c', '#1cd782', '#fac720', '#294dd8', '#15467d'],
                        data: seriesData,
                        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                    }]
                }
            },
            // 响应式修正options
            fixOptions (options, datas, seriesData) {
                const that = this
                if (that[fullProp]) {
                    if (!that.smallScreen && !that.miniScreen) {
                        options.tooltip.textStyle.fontSize = 18
                    }
                } else {
                    if (that.miniScreen) {
                        options.series[0].center[0] = '28.5%'
                        options.series[0].radius = ['54%', '73%']
                        options.tooltip.textStyle.fontSize = 10
                    } else if (that.smallScreen) {
                        options.series[0].center[0] = '31%'
                        options.tooltip.textStyle.fontSize = 12
                    }
                }
            },
            doHandlerData (datas) {
                const that = this
                const legendData = []
                const seriesData = []
                let item = null
                const totalData = datas.reduce((total, currItem) => total + currItem.area, 0)
                for (let i = 0; i < datas.length; i++) {
                    item = datas[i]
                    seriesData.push({ name: item.quality, value: item.area })
                    legendData.push({ name: item.quality, ratio: ((item.area / totalData) * 100).toFixed(2) + '%', value: item.area })
                }
                return { legendData, seriesData }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
