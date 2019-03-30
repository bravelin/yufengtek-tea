<!--入库信息-->
<template>
    <Plane class="in-circle-wrap" :full="inCircleChartFullState">
        <PlaneTitle>今日入库信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="inCircleChartFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'toDayInAmount'
    const fullProp = 'inCircleChartFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'warehouse-in-circle',
        computed: {
            ...thisMapState([dataProp, fullProp])
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
                const data = that.$store.state[moduleNameSpace][dataProp]
                if (!that.chart) {
                    that.init(data)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const data = that.$store.state[moduleNameSpace][dataProp]
                if (that.container) {
                    that.chart ? that.refresh(data) : that.init(data)
                }
            },
            // 创建图表
            init (data) {
                const that = this
                const container = that.container
                const options = {
                    grid: {
                        top: 15, left: 5, right: 5, bottom: 0
                    },
                    series: [{
                        type: 'pie',
                        radius: ['80%', '90%'],
                        center: ['50%', '55%'],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#003366' }, { offset: 1, color: '#91acd4' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: that.getDataLabels(data)
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            getDataLabels (data) {
                return [
                    {
                        value: 78,
                        label: { normal: { padding: [0, 0, 10], formatter: '入库\n\n\n', textStyle: { color: '#fff', fontSize: 15 } } }
                    },
                    {
                        value: 25,
                        label: { normal: { formatter: `${data}`, textStyle: { color: '#87d0f6', fontSize: 24, fontWeight: 'bold' } } }
                    },
                    {
                        value: 0,
                        label: { normal: { formatter: '\n\n\n吨', textStyle: { color: '#fff', fontSize: 15 } } }
                    }
                ]
            },
            // 刷新图表
            refresh (data) {
                const that = this
                const chart = that.chart
                const dataLabels = that.getDataLabels(data)
                if (that[fullProp]) {
                    dataLabels[0].label.normal.padding = [0, 0, 28]
                    dataLabels[0].label.normal.textStyle.fontSize = 20
                    dataLabels[1].label.normal.textStyle.fontSize = 32
                    dataLabels[2].label.normal.textStyle.fontSize = 20
                }
                const options = {
                    series: [{ data: dataLabels }]
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
