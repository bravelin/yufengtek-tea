<template>
    <div class="wuyishan-map-container">
        <div ref="container"></div>
        <div class="curr-region"><a @click="doClearMap()">武夷山市</a><i v-show="curr"></i><a>{{ curr }}</a></div>
    </div>
</template>
<script>
    import echarts from '@/lib/echarts'
    import config from '@/lib/config'

    const mapColors = {
        '星村镇': { color: 'rgba(31, 80, 150, 0.7)', selected: false },
        '兴田镇': { color: 'rgba(134, 184, 255, 0.7)', selected: false },
        '洋庄乡': { color: 'rgba(71, 120, 190, 0.7)', selected: false },
        '五夫镇': { color: 'rgba(75, 147, 250, 0.7)', selected: false },
        '上梅乡': { color: 'rgba(31, 80, 150, 0.7)', selected: false },
        '岚谷乡': { color: 'rgba(31, 80, 150, 0.7)', selected: false },
        '吴屯乡': { color: 'rgba(75, 147, 250, 0.7)', selected: false },
        '新丰街道': { color: 'rgba(134, 184, 255, 0.7)', selected: false },
        '崇安街道': { color: 'rgba(31, 80, 150, 0.7)', selected: false },
        '武夷街道': { color: 'rgba(75, 147, 250, 0.7)', selected: false },
    }
    const placeIndexObj = ['', '星村镇', '兴田镇', '洋庄乡', '五夫镇', '上梅乡', '岚谷乡', '吴屯乡', '新丰街道', '崇安街道', '武夷街道']

    export default {
        name: 'WuyishanMap',
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
        watch: {
            full () {
                const that = this
                that.refresh()
            }
        },
        data () {
            return {
                chart: null,
                currSelectedRegion: '',
                mapRegions: Object.keys(mapColors).map(key => {
                    return { name: key, selected: mapColors[key].selected, itemStyle: { areaColor: mapColors[key].color } }
                }),
                currPlaceIndex: 0,
                timer: null,
                autoChange: false,
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
                that.$ajax({ url: './map.json' }).then(res => {
                    echarts.registerMap('wuyishan', res)
                    that.chart = echarts.init(that.$refs.container)
                    that.chart.setOption({
                        backgroundColor: 'transparent',
                        geo: {
                            map: 'wuyishan',
                            selectedMode: 'single',
                            itemStyle: {
                                emphasis: { areaColor: '#238cff', borderWidth: 0 },
                                normal: { areaColor: '#1f5096', borderColor: '#3B5077', borderWidth: 0 }
                            },
                            label: {
                                emphasis: {
                                    textStyle: { color: '#d0d0d0', fontSize: 16, fontWeight: 'bold' }
                                },
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#d0d0d0',
                                        fontSize: 12
                                    }
                                }
                            },
                            regions: that.mapRegions,
                            roam: true,
                            zoom: 1.2,
                        }
                    })
                    that.chart.on('click', params => {
                        that.doClickMap(params.name)
                    })
                    window.addEventListener('resize', that.refresh)
                })
            })
        },
        methods: {
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
                chart.setOption({ geo: { regions: that.mapRegions } })
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
                    const chart = that.chart
                    if (chart) {
                        let options = null
                        if (that.full) {
                            options = {
                                series: [{
                                    label: {
                                        normal: { textStyle: { fontSize: 16 } }
                                    }
                                }]
                            }
                        } else {
                            options = {
                                series: [{
                                    label: {
                                        normal: { textStyle: { fontSize: 12 } }
                                    }
                                }]
                            }
                        }
                        chart.setOption(options)
                        chart.resize()
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
