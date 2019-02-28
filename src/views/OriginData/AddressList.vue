<template>
    <Plane class="address-list-wrap">
        <PlaneTitle>溯源地址</PlaneTitle>
        <DatePicker type="date" v-model="currSelectedDate" @change="doDatePickerChange"></DatePicker>
        <div class="iconfont">&#xe650;</div>
        <span v-show="currSelectedDate">{{ currSelectedDate }}<i class="iconfont" @click="doClearDate">&#xe61c;</i></span>
        <div class="plane-content">
            <vue-scroll :ops="scrollOptions">
                <ul class="list-container">
                    <li v-for="(item, index) in addressList" :key="index">
                        <div class="item-title">{{ item.date }}</div>
                        <ul>
                            <li class="sub-item" v-for="(subItem, subIndex) in item.list" :key="subIndex">
                                <div>{{ subItem.time }}</div>
                                <div>{{ subItem.place }}</div>
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
    import echarts from '@/lib/echarts'
    import { DatePicker } from 'element-ui'
    import { formatTime } from '@/lib/util'

    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'origin-address-list',
        components: { DatePicker },
        computed: {
            ...thisMapState(['addressList'])
        },
        data () {
            return {
                currSelectedDate: '',
                scrollOptions: {
                    vuescroll: {
                        mode: 'native',
                        zooming: false
                    },
                    bar: {
                        background: 'rgba(1, 187, 190, 0.7)'
                    }
                }
            }
        },
        methods: {
            doDatePickerChange (date) {
                const that = this
                that.currSelectedDate = formatTime(date, 'yyyy-MM-dd')
            },
            // 清除当前日期筛选
            doClearDate () {
                const that = this
                that.currSelectedDate = ''
            }
        }
    }
</script>
