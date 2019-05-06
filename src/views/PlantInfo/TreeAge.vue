<!--树龄分布-->
<template>
    <Plane class="tree-age-wrap" :full="treeAgeFullState">
        <PlaneTitle>树龄分布</PlaneTitle>
        <div :class="{ hide: !treeAgeDistributeDatas.length }" class="plane-content" ref="container"></div>
        <PlaneTools v-show="treeAgeDistributeDatas.length" :full="treeAgeFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!treeAgeDistributeDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'treeAgeDistributeDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'treeAgeFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'plant-tree-age',
        computed: {
            ...thisMapState(['treeAgeDistributeUnit', fullProp, dataProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
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
                that.container = that.$refs.container
                const datas = that[dataProp]
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that[dataProp]
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
                const { titles, values } = that.handleChartData(datas)
                const miniScreen = that.miniScreen
                const options = {
                    grid: { top: 0, left: 3, right: 20, bottom: 5, containLabel: true },
                    xAxis: {
                        show: true,
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dosh', color: 'rgba(238, 238, 238, 0.15)', width: 0.5 }
                        },
                        axisLine: { lineStyle: { color: 'rgba(0,0,0,0)' } },
                        axisLabel: { margin: 8, interval: 0, rotate: 0, color: '#fff', fontSize: 12 }
                    },
                    yAxis: [{
                        show: true,
                        data: titles,
                        inverse: true,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color: '#fff', fontSize: 12, margin: 8 }
                    }],
                    series: [{
                        type: 'bar',
                        yAxisIndex: 0,
                        data: values,
                        barWidth: 18,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#003366' }, { offset: 1, color: '#2663bc' }])
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft',
                                formatter (item) { return `${item.value} 亩` },
                                color: '#fff',
                                fontSize: miniScreen ? 11 : 12,
                                offset: [10, 1]
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
                const miniScreen = that.miniScreen
                if (that[fullProp]) {
                    options = {
                        grid: { top: 20, left: 20, right: 35, bottom: 20 },
                        series: [{ data: values, barWidth: 25, label: { normal: { fontSize: 16 } } }],
                        yAxis: [{ data: titles, axisLabel: { margin: 12, fontSize: 18 } }],
                        xAxis: { axisLabel: { margin: 12, fontSize: 18 } }
                    }
                } else {
                    options = {
                        grid: { top: 0, left: 3, right: 16, bottom: 5 },
                        series: [{ data: values, barWidth: 18, label: { normal: { fontSize: miniScreen ? 11 : 12 } } }],
                        yAxis: [{ data: titles, axisLabel: { margin: 8, fontSize: 12 } }],
                        xAxis: { axisLabel: { margin: 8, fontSize: 12 } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            // 数据加工
            handleChartData (datas) {
                const titles = []
                const values = []
                datas.forEach(item => {
                    titles.push(item.treeAge == '>20' ? '20年以上' : item.treeAge + '年')
                    values.push(item.area)
                })
                return { titles, values }
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
