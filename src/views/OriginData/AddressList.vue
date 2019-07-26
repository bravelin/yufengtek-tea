<template>
    <Plane class="address-list-wrap">
        <PlaneTitle>溯源地址</PlaneTitle>
        <DatePicker type="date" v-model="currSelectedDate" @change="doDatePickerChange" :picker-options="pickerOptions"></DatePicker>
        <div class="iconfont">&#xe650;</div>
        <span v-show="currSelectedDate">{{ currSelectedDate }}<i class="iconfont" @click="doClearDate">&#xe61c;</i></span>
        <div class="plane-content" ref="text">
            <vue-scroll :ops="scrollOptions" ref="scrollList" @handle-scroll="handleScroll">
                <ul class="list-container" ref="ul">
                    <li v-for="(item, index) in addressList" :key="index" :id="'item' + index">
                        <div class="item-title">{{ item.date }}</div>
                        <ul>
                            <li class="sub-item" v-for="(subItem, subIndex) in item.list" :key="subIndex" v-show="subItem.addr">
                                <div>{{ subItem.time }}</div>
                                <div>{{ subItem.addr }}</div>
                                <div>{{ subItem.breed }} <div class="middle-point" v-show="subItem.sbreed!=subItem.breed"></div> {{ subItem.sbreed != subItem.breed ? subItem.sbreed : '' }}</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </vue-scroll>
        </div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import echarts from '@/lib/echarts'
    import { DatePicker } from 'element-ui'
    import { formatTime } from '@/lib/util'

    const moduleNameSpace = ns.ORIGIN
    const addrList = 'addressList'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const addressDataProp = `$store.state.${moduleNameSpace}.addressList`

    export default {
        name: 'OriginAddressList',
        components: { DatePicker },
        computed: {
            ...thisMapState(['addressList', 'currentPage', 'totalPage'])
        },
        watch: {
            [addressDataProp] () {
                const that = this
                that.addr = that[addrList]
                that.$nextTick(() => {
                    that.ulHeight = that.$refs.ul.offsetHeight
                })
            }
        },
        data () {
            return {
                currSelectedDate: '',
                scrollOptions: {
                    vuescroll: {
                        mode: 'native',
                        zooming: false,
                    },
                    bar: {
                        background: 'rgba(46, 115, 215, 0.8)'
                    }
                },
                ulHeight: '',
                divHeight: '',
                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    }
                }
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.divHeight = that.$refs.text.offsetHeight
            })
        },
        methods: {
            handleScroll (vertical, horizontal, nativeEvent) {
                const that = this
                if (that.currentPage < that.totalPage) {
                    const addr = that.ulHeight - that.divHeight
                    const currSelectedDate = that.currSelectedDate || ''
                    if (vertical.scrollTop == addr) {
                        that.$store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, {
                            currentPage: that.currentPage + 1, originDate: currSelectedDate
                        })
                    }
                }
            },
            doDatePickerChange (date) {
                const that = this
                that.currSelectedDate = formatTime(date, 'yyyy-MM-dd')
                that.$store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, {
                    currentPage: 1, originDate: that.currSelectedDate
                })
            },
            // 清除当前日期筛选
            doClearDate () {
                const that = this
                that.currSelectedDate = ''
                that.$store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, { currentPage: 1 })
            }
        }
    }
</script>
