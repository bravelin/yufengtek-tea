<template>
    <Plane class="city-rank-wrap" :full="cityRankFullState">
        <PlaneTitle>溯源城市排行</PlaneTitle>
        <div class="plane-content" :class="{ hide: !cityDatas.length }">
            <vue-scroll :ops="scrollOptions">
                <ul class="data-list">
                    <li v-for="(item, index) in rankList" :key="item.name">
                        <div><span>{{ index + 1}}</span><i v-if="index<3" class="iconfont">&#xe630;</i></div>
                        <div>{{ item.name }}</div>
                        <div><div :style="{ width: item.ratio }"></div></div>
                        <div>{{ item.value }}次</div>
                    </li>
                </ul>
            </vue-scroll>
        </div>
        <PlaneTools :full="cityRankFullState" @change="doFullStateChange" v-show="cityDatas.length"></PlaneTools>
        <div v-show="!cityDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import { computedChartDataInterval } from '@/lib/util'

    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'cityDatas'
    const fullProp = 'cityRankFullState'
    const prefix = `$store.state.${moduleNameSpace}`
    const chartDataProp = `${prefix}.${dataProp}`
    const fullStateProp = `${prefix}.${fullProp}`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'OriginCityRank',
        computed: {
            ...thisMapState([fullProp, dataProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1300
            }
        },
        watch: {
            [chartDataProp] () { // 监听store中图表数据的改变，刷新图表
                this.getRankList()
            },
            [fullStateProp] () {
                this.getRankList()
            },
            [resizeStateProp] () {
                this.getRankList()
            }
        },
        data () {
            return {
                rankList: [],
                scrollOptions: {
                    vuescroll: {
                        mode: 'native',
                        zooming: false,
                    },
                    bar: {
                        background: 'rgba(46, 115, 215, 0.8)'
                    }
                }
            }
        },
        created () {
            this.getRankList()
        },
        methods: {
            getRankList () {
                const that = this
                const miniScreen = that.miniScreen
                const list = []
                const datas = []
                let item = null
                for (let i = 0; i < that[dataProp].length; i++) {
                    item = that[dataProp][i]
                    list.push({ name: item.name, value: item.value, ratio: 0 })
                    datas.push(item.value)
                }
                const { max } = computedChartDataInterval(datas, 10, 0.1)
                list.forEach(item => {
                    item.ratio = (item.value / max * 100).toFixed(1) + '%'
                })
                that.rankList = list
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.ORIGIN_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
