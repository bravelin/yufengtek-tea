<!--茶树排行-->
<template>
    <Plane class="amount-rank-wrap" :full="amountRankFullState">
        <PlaneTitle>茶树排行</PlaneTitle>
        <div class="chart-unit">单位：亩</div>
        <div :class="{ hide: !amountRankDatas.length }" class="plane-content">
            <ul class="rank-list"><li v-for="(item, index) in dataList" :key="index">{{ item.title}}（<span>{{ item.data }}</span>）</li></ul>
            <div ref="container" class="map-chart"></div>
        </div>
        <PlaneTools v-show="amountRankDatas.length" :full="amountRankFullState" @change="doFullStateChange"></PlaneTools>
        <div v-show="!amountRankDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import geo from '@/lib/geo'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'amountRankDatas'
    const fullProp = 'amountRankFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'HomeAmountRank',
        computed: {
            ...thisMapState(['amountRankUnit', fullProp, dataProp, 'amountRankMainDatas', 'currSelectedRegion']),
            ...mapState(['smallScreen', 'miniScreen'])
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
                this.doInitOrRefreshChart()
            },
            [fullStateProp] () { // 监听全屏状态
                this.doInitOrRefreshChart()
            },
            [resizeStateProp] () { // 监听当前窗口大小
                this.doInitOrRefreshChart()
            }
        },
        data () {
            return {
                container: null,
                chart: null, // 图表实例
                dataList: []
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
                that.getRankListData(datas)
                if (!echarts.getMap('wuyishan')) {
                    that.$ajax({ url: './map.json' }).then(res => {
                        echarts.registerMap('wuyishan', res)
                        that.doRenderMap()
                    })
                } else {
                    that.doRenderMap()
                }
            },
            doRenderMap () {
                const that = this
                const container = that.container
                that.chart = echarts.init(container)
                const seriesData = that.getMapData()
                that.chart.setOption({
                    backgroundColor: 'transparent',
                    geo: {
                        map: 'wuyishan',
                        itemStyle: { color: 'rgba(0,0,0,0)', opacity: 1, borderWidth: 0.5, borderColor: '#07376a' },
                        zoom: 1.16,
                        roam: false,
                        emphasis: {
                            label: { show: false },
                            itemStyle: { color: 'rgba(0,0,0,0)' }
                        }
                    },
                    tooltip: {
                        formatter (params) {
                            return params.name + '：' + params.data.area + '亩'
                        },
                        backgroundColor: 'rgba(0, 159, 253, 0.9)',
                        axisPointer: { lineStyle: { color: 'rgba(238, 238, 238, 0.4)' } },
                        textStyle: { fontSize: 14 }
                    },
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        label: { show: true, position: 'inside', offset: [0, 0] },
                        symbol: 'circle',
                        symbolSize: 40,
                        itemStyle: { color: '#01195a', shadowColor: 'rgba(255,255,255,0.4)', shadowBlur: 5 },
                        rippleEffect: { period: 1000000, scale: 1 },
                        data: seriesData,
                        emphasis: {
                            itemStyle: {
                                borderWidth: 0.5,
                                borderColor: 'rgba(255,255,255,0.5)'
                            }
                        }
                    }]
                })
            },
            // 刷新图表
            refresh (datas) {
                const that = this
                const chart = that.chart
                that.getRankListData(datas)
                const seriesData = that.getMapData()
                chart.setOption({ series: { data: seriesData }, tooltip: { textStyle: { fontSize: that[fullProp] ? 18 : 14 } }, geo: { itemStyle: { borderColor: that[fullProp] ? 'rgba(255,255,255,0.12)' : '#07376a' } } })
                setTimeout(() => { chart.resize() }, 100)
            },
            // 地图数据
            getMapData () {
                const that = this
                const amountRankMainDatas = that.amountRankMainDatas // 确保已从大到小排序
                const areaDatas = amountRankMainDatas.filter(item => that.currSelectedRegion == '' || that.currSelectedRegion == item.town)
                // 最大值
                const maxData = Math.max(...areaDatas.map(item => item.area))
                const listData = []
                let dataItem = null
                let symbolSize = 0
                const colors = ['#ff5f6c', '#1cd782', '#fac720']
                let color = ''
                let area = ''
                let fontSizeOfName = 10
                let fontSizeOfNum = 14
                let MAX_SYMBOL_SIZE = 80
                let MIN_SYMBOL_SIZE = 24
                let MAX_NUM_FONT_SIZE = 16
                let MAX_NAME_FONT_SIZE = 14
                if (that[fullProp]) {
                    MAX_SYMBOL_SIZE = 150
                    MIN_SYMBOL_SIZE = 60
                    MAX_NUM_FONT_SIZE = 26
                    MAX_NAME_FONT_SIZE = 19
                } else if (that.smallScreen) {
                    MAX_SYMBOL_SIZE = 60
                    MIN_SYMBOL_SIZE = 20
                    MAX_NUM_FONT_SIZE = 14
                    MAX_NAME_FONT_SIZE = 12
                } else if (that.miniScreen) {
                    MAX_SYMBOL_SIZE = 50
                    MIN_SYMBOL_SIZE = 15
                    MAX_NUM_FONT_SIZE = 12
                    MAX_NAME_FONT_SIZE = 9
                }
                let padding = 0
                areaDatas.forEach((item, index) => {
                    dataItem = { name: item.town, value: geo[item.town], area: item.area, label: {}, itemStyle: { } }
                    // 如果只有一项数据，兴田镇往上便宜
                    if (areaDatas.length == 1) {
                        if (item.town == '兴田镇') {
                            dataItem.value = [117.9790244200, 27.5798720185]
                        } else if (item.town == '岚谷乡') {
                            dataItem.value = [118.2430244200, 27.9098720185]
                        }
                    }
                    // 计算symbolSize
                    symbolSize = MAX_SYMBOL_SIZE * item.area / maxData
                    if (symbolSize < MIN_SYMBOL_SIZE) {
                        symbolSize = MIN_SYMBOL_SIZE
                    }
                    dataItem.symbolSize = symbolSize
                    area = item.area.toFixed(0)
                    dataItem.label.formatter = `{a|${item.town}}\n{b|${area}}`
                    color = colors[index] || '#ffffff'
                    fontSizeOfName = symbolSize * 0.27
                    if (fontSizeOfName < 6) {
                        fontSizeOfName = 6
                    } else if (fontSizeOfName > MAX_NAME_FONT_SIZE) {
                        fontSizeOfName = MAX_NAME_FONT_SIZE
                    }
                    fontSizeOfNum = symbolSize * 0.32
                    if (fontSizeOfNum < 7) {
                        fontSizeOfNum = 7
                    } else if (fontSizeOfNum > MAX_NUM_FONT_SIZE) {
                        fontSizeOfNum = MAX_NUM_FONT_SIZE
                    }
                    if (symbolSize > 80) {
                        padding = 6
                    } else if (symbolSize > 60) {
                        padding = 5
                    } else if (symbolSize > 40) {
                        padding = 3
                    } else if (symbolSize > 35) {
                        padding = 2
                    } else {
                        padding = 0
                    }
                    dataItem.label.rich = {
                        a: { fontSize: fontSizeOfName, color, align: 'center', padding: [padding, 0, 0, 0] },
                        b: { fontSize: fontSizeOfNum, color, align: 'center', fontWeight: 'normal' }
                    }
                    if (index == 0) {
                        dataItem.itemStyle = { shadowColor: 'rgba(255,255,255,0.5)', shadowBlur: 10 }
                    }
                    listData.push(dataItem)
                })
                return listData.reverse()
            },
            getRankListData (datas) {
                const that = this
                const dataList = []
                let title = ''
                datas.forEach((item, index) => {
                    if (index < 10) {
                        if (that.amountRankFullState || item.town.length < 7) {
                            title = item.town
                        } else {
                            title = item.town.substring(0, 6) + '...'
                        }
                        dataList.push({ title, data: item.area })
                    }
                })
                dataList.sort((a, b) => a.data > b.data ? -1 : 1)
                that.dataList = dataList
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