<template>
    <div class="wuyishan-map-container">
        <div ref="container"></div>
        <div class="curr-region"><a @click="doClearMap()">武夷山市</a><i v-show="curr"></i><a>{{ curr }}</a></div>
    </div>
</template>
<script>
    import echarts from '@/lib/echarts'
    const SPLITVALUE = 200
    const mapColors = {
        '星村镇': 0,
        '兴田镇': 30,
        '洋庄乡': 10,
        '五夫镇': 20,
        '上梅乡': 0,
        '岚谷乡': 0,
        '吴屯乡': 20,
        '新丰街道': 30,
        '崇安街道': 0,
        '武夷街道': 20
    }

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
                mapDatas: Object.keys(mapColors).map(key => {
                    return { name: key, value: mapColors[key] }
                })
            }
        },
        created () {
            const that = this
            if (that.curr) {
                for (let i = 0; i < that.mapDatas.length; i++) {
                    if (that.mapDatas[i].name == that.curr) {
                        that.mapDatas[i].value = SPLITVALUE
                        break
                    }
                }
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.$ajax({ url: './map.json' }).then(res => {
                    echarts.registerMap('wuyishan', res)
                    that.chart = echarts.init(that.$refs.container)
                    that.chart.setOption({
                        backgroundColor: 'transparent',
                        dataRange: {
                            show: false,
                            x: 'left',
                            y: 'bottom',
                            splitList: [
                                { start: 0, end: 0, color: 'rgba(31, 80, 150, 0.7)' },
                                { start: 10, end: 10, color: 'rgba(71, 120, 190, 0.7)' },
                                { start: 20, end: 20, color: 'rgba(75, 147, 250, 0.7)' },
                                { start: 30, end: 30, color: 'rgba(134, 184, 255, 0.7)' },
                                { start: SPLITVALUE, end: SPLITVALUE, color: 'rgba(44, 133, 152, 0.8)' } // 选中的区块颜色
                            ]
                        },
                        series: [
                            {
                                type: 'map',
                                mapType: 'wuyishan',
                                itemStyle: {
                                    emphasis: { areaColor: 'rgba(44, 133, 152, 0.7)', borderWidth: 0 },
                                    normal: { areaColor: '#1f5096', borderColor: '#3B5077', borderWidth: 0 }
                                },
                                label: {
                                    emphasis: {
                                        textStyle: { color: '#ffffff', fontSize: 15 }
                                    },
                                    normal: {
                                        show: true,
                                        textStyle: { color: '#ffffff', fontSize: 12 }
                                    }
                                },
                                roam: true,
                                zoom: 1.2,
                                data: that.mapDatas
                            }
                        ]
                    })
                    that.chart.on('click', params => {
                        that.doClickMap(params.name)
                    })
                    window.addEventListener('resize', that.refresh)
                })
            })
        },
        methods: {
            doClickMap (place = '') {
                const that = this
                if (that.curr == place) { // 再次点击取消选中
                    place = ''
                }
                const chart = that.chart
                const currOption = chart.getOption()
                that.mapDatas.forEach(item => {
                    item.value = (item.name == place ? SPLITVALUE : mapColors[item.name])
                })
                const series = currOption.series
                series[0].data = that.mapDatas
                chart.setOption({ series })
                that.$emit('change', place)
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
            }
        },
        beforeDestroy () {
            const that = this
            window.removeEventListener('resize', that.refresh)
        }
    }
</script>
