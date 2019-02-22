<!--产值预估-->
<template>
    <Plane class="app-output-value-wrap">
        <PlaneTitle>产值预估</PlaneTitle>
        <div class="plane-content" ref="container"></div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.OUTPUTVALUE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.outputValue`

    export default {
        name: 'app-output-value',
        computed: {
            ...thisMapState(['outputValue'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
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
                const datas = that.$store.state[moduleNameSpace].outputValue
                if (!that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].outputValue
                if (that.container) {
                    that.chart ? that.refresh(datas) : that.init(datas)
                }
            },
            // 创建图表
            init (datas) {
                const that = this
                const container = that.container
                const options = {
                    grid: {
                        top: 20, left: 20, right: 20, bottom: 0
                    },
                    series: [{
                        name: '产值预估',
                        type: 'pie',
                        radius: ['60%', '72%'],
                        center: ['25%', '50%'],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00a2ff' }, { offset: 1, color: '#70ffac' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: [
                            {
                                value: 75,
                                label: { normal: { padding: [0, 0, 10], formatter: '产值预估', textStyle: { color: '#fff', fontSize: 15 } } }
                            },
                            {
                                value: 25,
                                label: { normal: { formatter: `\n${datas}`, textStyle: { color: '#007ac6', fontSize: 25, fontWeight: 'bold' } } }
                            },
                            {
                                value: 0,
                                label: { normal: { formatter: '亿元', textStyle: { color: '#fff', fontSize: 15 } } }
                            }
                        ]
                    }, {
                        name: '产量预估',
                        type: 'pie',
                        radius: ['60%', '72%'],
                        center: ['75%', '50%'],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00a2ff' }, { offset: 1, color: '#70ffac' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: [
                            {
                                value: 75,
                                label: { normal: { padding: [0, 0, 10], formatter: '产量预估', textStyle: { color: '#fff', fontSize: 15 } } }
                            },
                            {
                                value: 25,
                                label: { normal: { formatter: `\n${datas + 152}`, textStyle: { color: '#007ac6', fontSize: 25, fontWeight: 'bold' } } }
                            },
                            {
                                value: 0,
                                label: { normal: { formatter: '吨', textStyle: { color: '#fff', fontSize: 15 } } }
                            }
                        ]
                    }
                    ]
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const currOption = chart.getOption()
                const series = currOption.series
                series[0].data[1].label.normal.formatter = `\n${datas}`
                chart.setOption({ series })
                setTimeout(() => { chart.resize() }, 10)
            }
        }
    }
</script>