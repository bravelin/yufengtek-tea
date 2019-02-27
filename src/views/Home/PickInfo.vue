<!--采摘信息-->
<template>
    <Plane class="pick-info-wrap" :full="pickInfoFullState">
        <PlaneTitle>采摘信息</PlaneTitle>
        <div class="plane-content">
            <div ref="container" class="chart-container"></div>
            <!-- <div class="chart-title"><h4>茶叶总产量</h4><div>{{ teaTotalAmount }}<span>吨</span></div></div> -->
        </div>
        <PlaneTools :full="pickInfoFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.pickDatas`
    const fullProp = 'pickInfoFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`

    export default {
        name: 'home-pick-info',
        computed: {
            ...thisMapState(['teaTotalAmount', fullProp]),
            ...mapState(['screenFullState'])
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
                const datas = that.$store.state[moduleNameSpace].pickDatas
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].pickDatas
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
                const { seriesData, legendData } = that.handleChartData(datas)
                const options = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}吨 ({d}%)',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: { fontSize: 14 }
                    },
                    graphic: [{
                        type: 'text',
                        left: '36.5%',
                        top: '40.5%',
                        style: {
                            text: '茶叶总产量',
                            fill: '#d0d0d0',
                            font: 'normal 14px "Microsoft YaHei", sans-serif'
                        }
                    }, {
                        type: 'text',
                        left: '36.5%',
                        top: '50.5%',
                        style: {
                            text: `${that.teaTotalAmount} 吨`,
                            fill: '#dfdfdf',
                            font: 'normal bold 16px "Microsoft YaHei", sans-serif'
                        }
                    }],
                    legend: {
                        show: true,
                        data: legendData,
                        orient: 'vertical',
                        right: '3%',
                        top: 10,
                        itemGap: 15,
                        textStyle: {
                            color: '#d0d0d0',
                            fontSize: 14,
                            padding: [2, 0, 0, 4]
                        }
                    },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '88%'],
                        center: ['44%', '50%'],
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                            fontSize: 12
                        },
                        color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
                        data: seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
                const { seriesData, legendData } = that.handleChartData(datas)
                let options = null
                if (that[fullProp]) {
                    options = {
                        tooltip: { textStyle: { fontSize: 18 } },
                        series: [{ data: seriesData, label: { fontSize: 16 } }],
                        legend: { data: legendData, right: '3.5%', itemGap: 20, top: 20, textStyle: { fontSize: 16 } },
                        graphic: [
                            { left: '40.5%', top: '40.5%', style: { font: 'normal 20px "Microsoft YaHei", sans-serif' } },
                            {
                                left: '41%',
                                top: '50.5%',
                                style: {
                                    text: `${that.teaTotalAmount} 吨`,
                                    font: 'normal bold 22px "Microsoft YaHei", sans-serif'
                                }
                            }
                        ]
                    }
                } else {
                    options = {
                        tooltip: { textStyle: { fontSize: 14 } },
                        series: [{ data: seriesData, label: { fontSize: 12 } }],
                        legend: { data: legendData, right: '3%', itemGap: 15, top: 10, textStyle: { fontSize: 14 } },
                        graphic: [
                            { left: '36.5%', top: '40.5%', style: { font: 'normal 14px "Microsoft YaHei", sans-serif' } },
                            {
                                left: '36.5%',
                                top: '50.5%',
                                style: {
                                    text: `${that.teaTotalAmount} 吨`,
                                    font: 'normal bold 16px "Microsoft YaHei", sans-serif'
                                }
                            }
                        ]
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
                    legendData.push(item.label)
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