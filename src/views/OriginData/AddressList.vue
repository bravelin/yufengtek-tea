<template>
    <Plane class="address-list-wrap">
        <PlaneTitle>溯源地址</PlaneTitle>
        <DatePicker type="date" v-model="currSelectedDate" @change="doDatePickerChange"></DatePicker>
        <div class="iconfont">&#xe650;</div>
        <span v-show="currSelectedDate">{{ currSelectedDate }}<i class="iconfont" @click="doClearDate">&#xe61c;</i></span>
        <div class="plane-content" ref="text">
            <vue-scroll :ops="scrollOptions" ref="scrollList" @handle-scroll="handleScroll">
                <ul class="list-container" ref="ul">
                    <li v-for="(item, index) in addressList" :key="index" :id="'item' + index">
                        <div class="item-title">{{ item.date }}</div>
                        <ul>
                            <li class="sub-item" v-for="(subItem, subIndex) in item.list" :key="subIndex">
                                <div>{{ subItem.time }}</div>
                                <div>{{ subItem.addr }}</div>
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
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'origin-address-list',
        components: { DatePicker },
        computed: {
            ...thisMapState(['addressList', 'currentPage', 'totalPage'])
        },
        watch: {
            [addressDataProp] () {
                const that = this
                const data = that.$store.state[moduleNameSpace][addrList]
                this.addr = data
                this.$nextTick(() => {
                    this.ulHeight = this.$refs.ul.offsetHeight
                })
            },
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
                        background: 'rgba(1, 187, 190, 0.7)'
                    },
                },
                ulHeight: '',
                divHeight: ''
            }
        },
        mounted() {
            const that = this
            that.$nextTick(() => {
                this.divHeight = this.$refs.text.offsetHeight
            })
        },
        methods: {
            handleScroll(vertical, horizontal, nativeEvent) {
                if (this.currentPage < this.totalPage) {
                    const addr = this.ulHeight - this.divHeight
                    const that = this
                    const currSelectedDate = this.currSelectedDate || ''
                    if (vertical.scrollTop == addr) {
                        that.$store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, {
                        currentPage: this.currentPage + 1,
                        originDate: currSelectedDate
                    })
                    }
                }
            },
            doDatePickerChange (date) {
                this.$store.dispatch(moduleNameSpace + '/' + types.GETWEBSOCKET)
                const that = this
                that.currSelectedDate = formatTime(date, 'yyyy-MM-dd')
                var currSelectedDate = that.currSelectedDate
                this.$store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, {
                    currentPage: 1,
                    originDate: currSelectedDate
                })
            },
            // 清除当前日期筛选
            doClearDate () {
                const that = this
                that.currSelectedDate = ''
            }
        }
    }
</script>
