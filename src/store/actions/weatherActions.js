import types from '@/store/constants/types'
import Weather from '@/lib/weather'
import { formatTime } from '@/lib/util'
export default {
    [types.GET_WEATHER_INFO] (context) {
        setTimeout(() => {
            const nowTime = new Date()
            const state = context.state
            state.temperature = 10 + parseInt(Math.random() * 10)
            const temp = parseInt(Math.random() * 8)
            state.currWeather.label = Weather[temp].label
            state.currWeather.chars = Weather[temp].chars
            state.refreshTime = formatTime(nowTime, 'hh:mm:ss')
            state.detail.humidity = (20 + parseInt(Math.random())) + '%'
            state.detail.pressure = (1000 + Math.random() * 20).toFixed(1)
            state.detail.rainfall = (10 * Math.random()).toFixed(2)
            const oneDayTime = 24 * 60 * 60 * 1000
            const list = [
                { dateName: '今天', date: formatTime(nowTime, 'yyyy/MM/dd') },
                { dateName: '明天', date: formatTime(new Date(nowTime.getTime() + oneDayTime), 'yyyy/MM/dd') },
                { dateName: '后天', date: formatTime(new Date(nowTime.getTime() + 2 * oneDayTime), 'yyyy/MM/dd') }
            ]
            list.forEach(item => {
                let t = parseInt(Math.random() * 8)
                item.weather = Weather[t].label
                item.weatherChars = Weather[t].chars
                item.lowTemperature = parseInt(Math.random() * 10)
                item.highTemperature = item.lowTemperature + parseInt(Math.random() * 10) + 4
            })
            state.list = list
        }, 500)
    }
}
