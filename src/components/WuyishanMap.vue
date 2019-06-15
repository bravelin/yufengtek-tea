<template>
    <div class="wuyishan-map-container">
        <div ref="bg"></div>
        <div ref="container"></div>
        <div class="curr-region-data">
            <div>
                <h3 v-show="curr==''">武夷山</h3>
                <h3 v-show="curr!=''"><div @click="doClickMap('')">武夷山</div><div class="point"></div>{{ curr }}</h3>
                <div><div>茶园</div>：{{ gardenTotal }}家</div>
                <div><div>总面积</div>：{{ gardenArea }}亩</div>
            </div>
            <div v-if="plantArea.length">
                <h3>种植品种</h3>
                <div v-for="item in plantArea" :key="item.type"><div :title="item.type">{{ item.type }}</div><div>：{{ item.area}}亩</div></div>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from '@/lib/echarts'
    import config from '@/lib/config'
    import { mapState } from 'vuex'

    const placeIndexObj = ['', '星村镇', '兴田镇', '洋庄乡', '五夫镇', '上梅乡', '岚谷乡', '吴屯乡', '新丰街道', '崇安街道', '武夷街道']
    export default {
        name: 'WuyishanMap',
        computed: {
            ...mapState(['gardenArea', 'gardenTotal', 'plantArea'])
        },
        props: {
            curr: {
                type: String,
                default: '',
                required: true
            },
            full: {
                type: Boolean,
                default: false,
            }
        },
        data () {
            return {
                bgChart: null,
                chart: null,
                currSelectedRegion: '',
                mapRegions: (() => {
                    const list = []
                    placeIndexObj.forEach(key => {
                        if (key) { list.push({ name: key, selected: false, itemStyle: { areaColor: '#162c6a' } }) }
                    })
                    return list
                })(),
                currPlaceIndex: 0,
                timer: null,
                autoChange: false
            }
        },
        created () {
            const that = this
            if (that.curr) {
                for (let i = 0; i < that.mapRegions.length; i++) {
                    if (that.mapRegions[i].name == that.curr) {
                        that.mapRegions[i].selected = true
                        break
                    }
                }
            }
            document.addEventListener('keypress', that.doHandleKeyPress)
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const refs = that.$refs
                if (!echarts.getMap('wuyishan')) {
                    that.$ajax({ url: './map.json' }).then(res => {
                        echarts.registerMap('wuyishan', res)
                        that.doRenderMap()
                    })
                } else {
                    that.doRenderMap()
                }
            })
        },
        methods: {
            doRenderMap () {
                const that = this
                const refs = that.$refs
                that.bgChart = echarts.init(refs.bg)
                that.bgChart.setOption({
                    backgroundColor: 'transparent',
                    geo: {
                        map: 'wuyishan',
                        itemStyle: { color: '#1e4f69', opacity: 1, borderWidth: 2, borderColor: '#1e4f69' },
                        zoom: 1.21,
                        roam: false
                    }
                })
                that.chart = echarts.init(that.$refs.container)
                const options = {
                    backgroundColor: 'transparent',
                    geo: {
                        map: 'wuyishan',
                        selectedMode: 'single',
                        itemStyle: {
                            emphasis: { areaColor: '#02b9e1', borderWidth: 1.5, borderColor: '#ffffff' },
                            normal: { areaColor: '#162c62', borderColor: '#01bde5', borderWidth: 1.5 }
                        },
                        label: {
                            normal: { show: false },
                            emphasis: { show: false }
                        },
                        regions: that.mapRegions,
                        roam: false,
                        zoom: 1.2,
                    },
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        label: {
                            show: true,
                            position: 'bottom',
                            offset: [0, 5],
                            formatter: '{b}',
                            fontWeight: 'lighter',
                            fontSize: 14,
                            color: '#bff4ff'
                        },
                        symbol: `circle`,
                        symbolSize: 12,
                        itemStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.3,
                                r: 0.5,
                                colorStops: [
                                    { offset: 0.35, color: '#ffffff' },
                                    { offset: 0.4, color: '#69e7fc' },
                                    { offset: 1, color: '#69e7fc' }
                                ]
                            },
                            shadowColor: 'rgba(255,255,255,0.8)',
                            shadowBlur: 10
                        },
                        rippleEffect: {
                            period: 1000000,
                            scale: 1
                        },
                        silent: true,
                        data: [
                            { name: '星村镇', value: [117.8230244200, 27.6698720185] },
                            { name: '洋庄乡', value: [117.8930244200, 27.8698720185] },
                            { name: '岚谷乡', value: [118.1930244200, 27.9798720185] },
                            { name: '兴田镇', value: [117.9790244200, 27.5598720185] },
                            { name: '五夫镇', value: [118.2390244200, 27.6198720185] },
                            { name: '上梅乡', value: [118.2090244200, 27.7298720185] },
                            { name: '武夷街道', value: [117.9990244200, 27.6908720185] },
                            { name: '吴屯乡', value: [118.1099244200, 27.8608720185] },
                            { name: '新丰街道', value: [118.0399244200, 27.8208720185] },
                            { name: '崇安街道', value: [118.0199244200, 27.7582720185] }
                        ]
                    }]
                }
                const state = that.$store.state
                if (state.smallScreen) {
                    options.geo.itemStyle.normal.borderWidth = 1
                    options.geo.itemStyle.emphasis.borderWidth = 1
                    options.series[0].symbolSize = 10
                    options.series[0].label.fontSize = 12
                    options.series[0].label.offset = [0, 3]
                } else if (state.miniScreen) {
                    options.geo.itemStyle.normal.borderWidth = 0.5
                    options.geo.itemStyle.emphasis.borderWidth = 0.5
                    options.series[0].symbolSize = 9
                    options.series[0].label.fontSize = 12
                    options.series[0].label.offset = [0, 2]
                }
                that.chart.setOption(options)
                that.chart.on('click', params => {
                    that.doClickMap(params.name)
                })
                window.addEventListener('resize', that.refresh)
            },
            doClickMap (place = '', tag) {
                const that = this
                if (that.curr == place) { // 再次点击取消选中
                    place = ''
                }
                const chart = that.chart
                const currOption = chart.getOption()
                that.mapRegions.forEach(item => {
                    item.selected = (item.name == place)
                })
                const seriesData = currOption.series[0].data
                seriesData.forEach(item => {
                    if (item.name == place) {
                        item.label = { color: '#ffffff' }
                        item.itemStyle = {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.3,
                                r: 0.5,
                                colorStops: [
                                    { offset: 0.35, color: '#ffffff' },
                                    { offset: 0.4, color: '#3572be' },
                                    { offset: 1, color: '#3572be' }
                                ]
                            },
                            shadowColor: 'rgba(0,0,0,0.5)',
                        }
                    } else {
                        if (item.label) {
                            delete item.label
                        }
                        if (item.itemStyle) {
                            delete item.itemStyle
                        }
                    }
                })
                chart.setOption({ geo: { regions: that.mapRegions }, series: [{ data: seriesData }] })
                that.$emit('change', place)
                if (!tag) { // 需要计算currPlaceIndex
                    for (let i = 0; i < placeIndexObj.length; i++) {
                        if (placeIndexObj[i] == place) {
                            that.currPlaceIndex = i
                            break
                        }
                    }
                }
            },
            doClearMap () {
                const that = this
                that.doClickMap('')
            },
            refresh () {
                const that = this
                setTimeout(() => {
                    that.bgChart && that.bgChart.resize()
                    let options = null
                    const state = that.$store.state
                    if (state.smallScreen) {
                        options = { series: [{ symbolSize: 10, label: { fontSize: 12, offset: [0, 3] } }] }
                    } else if (state.miniScreen) {
                        options = { series: [{ symbolSize: 9, label: { fontSize: 12, offset: [0, 2] } }] }
                    } else {
                        options = { series: [{ symbolSize: 12, label: { fontSize: 14, offset: [0, 5] } }] }
                    }
                    if (that.chart) {
                        that.chart.setOption(options)
                        that.chart.resize()
                    }
                }, 120)
            },
            doAutoChange () {
                const that = this
                that.currPlaceIndex++
                if (that.currPlaceIndex > 10) {
                    that.currPlaceIndex = 0
                }
                that.doClickMap(placeIndexObj[that.currPlaceIndex], true)
                that.timer = setTimeout(() => {
                    that.doAutoChange()
                }, config.mapAutoChangeTime)
            },
            doHandleKeyPress (e) {
                const that = this
                if (e.keyCode == 32 && that.chart) {
                    if (that.autoChange) {
                        that.timer && clearInterval(that.timer)
                    } else {
                        that.doAutoChange()
                    }
                    that.autoChange = !that.autoChange
                }
            }
        },
        beforeDestroy () {
            const that = this
            window.removeEventListener('resize', that.refresh)
            document.removeEventListener('keypress', that.doHandleKeyPress)
            if (that.timer) {
                clearInterval(that.timer)
            }
        }
    }
</script>
