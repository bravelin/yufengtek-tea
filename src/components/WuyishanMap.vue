<template>
    <div class="wuyishan-map-container">
        <div ref="container"></div>
        <div class="curr-region"><a @click="doClearMap()">武夷山市</a><i v-show="curr"></i><a>{{ curr }}</a></div>
    </div>
</template>
<script>
    import echarts from '@/lib/echarts'
    const SPLITVALUE = 10
    export default {
        name: 'WuyishanMap',
        props: {
            curr: {
                type: String,
                default: '',
                required: true
            }
        },
        data () {
            return {
                chart: null,
                mapDatas: [
                    { name: '星村镇', value: 0 },
                    { name: '兴田镇', value: 0 },
                    { name: '洋庄乡', value: 0 },
                    { name: '五夫镇', value: 0 },
                    { name: '上梅乡', value: 0 },
                    { name: '岚谷乡', value: 0 },
                    { name: '吴屯乡', value: 0 },
                    { name: '新丰街道', value: 0 },
                    { name: '崇安街道', value: 0 },
                    { name: '武夷街道', value: 0 }
                ]
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
                                { start: 0, end: 0, color: '#15467d' },
                                { start: SPLITVALUE, end: SPLITVALUE, color: '#08AF9C' } // 选中的区块颜色
                            ]
                        },
                        series: [
                            {
                                type: 'map',
                                mapType: 'wuyishan',
                                itemStyle: {
                                    emphasis: { areaColor: '#389BB7', borderWidth: 0 },
                                    normal: { areaColor: '#15467d', borderColor: '#2f90cd', borderWidth: 1 }
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
                                zoom: 1.24,
                                data: that.mapDatas
                            }
                        ]
                    })
                    that.chart.on('click', params => {
                        that.doClickMap(params.name)
                    })
                })
            })
        },
        methods: {
            doClickMap (place = '') {
                const that = this
                if (that.currSelectedRegion == place) {
                    return
                }
                const chart = that.chart
                const currOption = chart.getOption()
                that.mapDatas.forEach(item => {
                    item.value = (item.name == place ? SPLITVALUE : 0)
                })
                const series = currOption.series
                series[0].data = that.mapDatas
                chart.setOption({ series })
                that.$emit('change', place)
            },
            doClearMap () {
                const that = this
                that.doClickMap('')
            }
        }
    }
</script>
