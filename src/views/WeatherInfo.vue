<!--气候-->
<template>
    <Plane class="app-weather-info-wrap">
        <PlaneTitle>武夷气候</PlaneTitle>
        <div class="curr-time">{{ currTime }}</div>
        <div class="plane-content">
            <div class="weather">
                <em :class="{ more: !(temperature < 10 && temperature >= 0)}">{{ temperature }}</em>
                <i class="iconfont" v-html="currWeather.chars"></i>
                <div>
                    <strong>{{ currWeather.label }}</strong>
                    <span>{{ refreshTime }}更新</span>
                </div>
            </div>
            <ul class="weather-detail">
                <li><div>{{ detail.windDirection }}</div><div>{{ detail.windPower }}</div></li>
                <li><div>相对湿度</div><div>{{ detail.humidity }}</div></li>
                <li><div>气压</div><div>{{ detail.pressure }}mb</div></li>
                <li><div>降雨量</div><div>{{ detail.rainfall }}mm</div></li>
                <li><div>空气指数</div><div>{{ detail.airQuality }}</div></li>
            </ul>
            <ul class="weather-list">
                <li v-for="(item, index) in list" :key="index">
                    <div>{{ item.dateName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.date }}</div>
                    <div>{{ item.weather }}<i class="iconfont" v-html="item.weatherChars"></i></div>
                    <div>{{ item.lowTemperature }} ~ {{ item.highTemperature }}&nbsp;℃</div>
                </li>
            </ul>
        </div>
    </Plane>
</template>
<script>
    import Plane from '@/components/Plane'
    import PlaneTitle from '@/components/PlaneTitle'
    import { formatTime } from '@/lib/util'
    import { createNamespacedHelpers } from 'vuex'
    import Weather from '@/lib/weather'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.WEATHER
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'app-weather-info',
        components: {
            Plane, PlaneTitle
        },
        computed: {
            ...thisMapState(['temperature', 'currWeather', 'refreshTime', 'detail', 'list'])
        },
        data () {
            return {
                currTime: ''
            }
        },
        created () {
            const that = this
            setInterval(() => {
                that.$store.dispatch(moduleNameSpace + '/' + types.GET_WEATHER_INFO)
            }, 1000 * 60 * 2)
            that.$store.dispatch(moduleNameSpace + '/' + types.GET_WEATHER_INFO)
        }
    }
</script>