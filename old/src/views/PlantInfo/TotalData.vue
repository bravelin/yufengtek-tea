<!--总体数据-->
<template>
    <Plane class="total-data-wrap" :full="totalDataFullState">
        <PlaneTitle>统计数据</PlaneTitle>
        <div class="plane-content" ref="container" :class="{ hide: !totalData.length }"></div>
        <PlaneTools v-show="totalData.length" :full="totalDataFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!totalData.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'totalData'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'totalDataFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'plant-total-data',
        computed: {
            ...thisMapState([dataProp, fullProp]),
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
                const options = {
                    grid: { top: 0, left: 5, right: 5, bottom: 0 },
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
                let paddingArr = [48, 1, 50]
                if (!miniScreen) {
                    if (that[fullProp]) {
                        fontSizeArr = [32, 48]
                        paddingArr = [130, 5, 130]
                    }
                } else {
                    fontSizeArr = [12, 18]
                    if (that[fullProp]) {
                        fontSizeArr = [24, 38]
                        paddingArr = [100, 5, 80]
                    }
                }
                let containerHeight = parseInt(window.getComputedStyle(that.$refs.container, null)['height'])
                let pieRadiusArr = ['54%', '62%']
                if (!isNaN(containerHeight)) {
                    if (containerHeight > 223 || that[fullProp]) {
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
                        silent: true,
                        radius: pieRadiusArr,
                        center: [centerX, centerY],
                        startAngle: 225,
                        color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#003366' }, { offset: 1, color: '#91acd4' }]), 'transparent'],
                        labelLine: { normal: { show: false } },
                        label: { normal: { position: 'center' } },
                        data: [
                            {
                                value: 75,
                                label: { normal: { padding: [0, 0, paddingArr[0]], formatter: `${item.label}`, textStyle: { color: '#fff', fontSize: fontSizeArr[0] } } }
                            },
                            {
                                value: 25,
                                label: { normal: { padding: [paddingArr[1], 0, 0], formatter: `${item.data}`, textStyle: { color: textColor, fontSize: fontSizeArr[1], fontWeight: 'bold' } } }
                            },
                            {
                                value: 0,
                                label: { normal: { padding: [paddingArr[2], 0, 0], formatter: `${item.unit}`, textStyle: { color: '#fff', fontSize: fontSizeArr[0] } } }
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
