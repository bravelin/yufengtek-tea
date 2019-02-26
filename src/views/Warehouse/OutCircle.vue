<!--出库信息-->
<template>
    <Plane class="out-circle-wrap">
        <PlaneTitle>今日出库信息</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.WAREHOUSE
    const dataProp = 'toDayOutAmount'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`

    export default {
        name: 'warehouse-out-circle',
        computed: {
            ...thisMapState([`${dataProp}`])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，以刷新图表
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
                        top: 10, left: 5, right: 5, bottom: 0
                    },
                    series: [{
                        type: 'pie',
                        radius: ['80%', '90%'],
                        center: ['50%', '50%'],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00a2ff' }, { offset: 1, color: '#70ffac' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: [
                            {
                                value: 75,
                                label: { normal: { padding: [0, 0, 8], formatter: '出库', textStyle: { color: '#fff', fontSize: 15 } } }
                            },
                            {
                                value: 25,
                                label: { normal: { formatter: `\n${data}`, textStyle: { color: '#70ffac', fontSize: 24, fontWeight: 'bold' } } }
                            },
                            {
                                value: 0,
                                label: { normal: { formatter: '吨', textStyle: { color: '#fff', fontSize: 15 } } }
                            }
                        ]
                    }]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (data) {
                const that = this
                const chart = that.chart
                const currOption = chart.getOption()
                const series = currOption.series
                series[0].data[1].label.formatter = `\n${data}`
                chart.setOption({ series })
                setTimeout(() => { chart.resize() }, 10)
            }
        }
    }
</script>
