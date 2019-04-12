<!--总体数据-->
<template>
    <Plane class="total-data-wrap" :full="totalDataFullState">
        <PlaneTitle>统计数据</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="totalDataFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const chartDataProp = `$store.state.${moduleNameSpace}.totalData`
    const fullProp = 'totalDataFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'plant-total-data',
        computed: {
            ...thisMapState(['totalData', fullProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1380
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
                const datas = that.$store.state[moduleNameSpace].totalData
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace].totalData
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
                const options = {
                    grid: {
                        top: 0, left: 5, right: 5, bottom: 0
                    },
                    series: that.getSerials(datas)
                }
                that.chart = echarts.init(container)
                that.chart.setOption(options)
            },
            getSerials (datas) {
                const that = this
                const series = []
                let centerX = 0
                let centerY = '50%'
                const miniScreen = that.miniScreen
                let textColor = '#87d0f6'
                const centerXArr = ['17%', '50%', '83%']
                let fontSizeArr = [15, 21]
                if (that[fullProp]) {
                    fontSizeArr = [20, 28]
                } else if (miniScreen) {
                    fontSizeArr = [13, 18]
                }
                let containerHeight = parseInt(window.getComputedStyle(that.$refs.container, null)['height'])
                let pieRadiusArr = ['53%', '60%']
                if (!isNaN(containerHeight)) {
                    if (containerHeight > 223) {
                        pieRadiusArr = ['49%', '56%']
                    } else if (containerHeight < 180) {
                        pieRadiusArr = ['60%', '67%']
                    }
                }
                datas.forEach((item, index) => {
                    centerX = centerXArr[index]
                    series.push({
                        name: item.label,
                        type: 'pie',
                        radius: pieRadiusArr,
                        center: [centerX, centerY],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#003366' }, { offset: 1, color: '#91acd4' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: [
                            {
                                value: 75,
                                label: { normal: { padding: [0, 0, 40], formatter: `${item.label}`, textStyle: { color: '#fff', fontSize: fontSizeArr[0] } } }
                            },
                            {
                                value: 25,
                                label: { normal: { padding: [0, 0, 0], formatter: `${item.data}`, textStyle: { color: textColor, fontSize: fontSizeArr[1], fontWeight: 'bold' } } }
                            },
                            {
                                value: 0,
                                label: { normal: { padding: [40, 0, 0], formatter: `${item.unit}`, textStyle: { color: '#fff', fontSize: fontSizeArr[0] } } }
                            }
                        ]
                    })
                })
                return series
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                const currOption = chart.getOption()
                const series = that.getSerials(datas)
                chart.setOption({ series })
                setTimeout(() => { chart.resize() }, 200)
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
