<!--溯源排行-->
<template>
    <Plane class="origin-wrap" :full="originDataFullState">
        <PlaneTitle>溯源排行</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="originDataFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    require('echarts-wordcloud')
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'cityDatas'
    const chartDataProp = `$store.state.${moduleNameSpace}.${dataProp}`
    const fullProp = 'originDataFullState'
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`

    export default {
        name: 'home-origin-data',
        computed: {
            ...thisMapState([fullProp])
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
                const datas = that.$store.state[moduleNameSpace][dataProp]
                if (datas.length && !that.chart) {
                    that.init(datas)
                }
            })
        },
        methods: {
            doInitOrRefreshChart () {
                const that = this
                const datas = that.$store.state[moduleNameSpace][dataProp]
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
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        formatter: '{b}：{c}',
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    series: [{
                        type: 'wordCloud',
                        gridSize: 10,
                        sizeRange: [14, 30],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        autoSize: {
                            enable: true,
                            minSize: 12
                        },
                        data: datas,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'hsla(' + [
                                        207 + Math.round(Math.random() * 10),
                                        (75 + Math.round(Math.random() * 12)) + '%',
                                        (60 + Math.round(Math.random() * 10)) + '%',
                                        0.2 + Math.random()
                                    ].join(',') + ')'
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
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
                let options = null
                if (that[fullProp]) {
                    options = {
                        series: [{ data: datas, gridSize: 20, sizeRange: [14, 50] }],
                        tooltip: { textStyle: { fontSize: 18 } }
                    }
                } else {
                    options = {
                        series: [{ data: datas, gridSize: 10, sizeRange: [14, 30] }],
                        tooltip: { textStyle: { fontSize: 14 } }
                    }
                }
                chart.setOption(options)
                setTimeout(() => { chart.resize() }, 200)
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