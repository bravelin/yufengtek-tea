import actions from '@/store/actions/weatherActions'
import mutations from '@/store/mutations/weatherMutations'

export default {
    namespaced: true,
    state: {
        temperature: 12,
        currWeather: {
            label: '晴',
            chars: '&#xe61f;'
        },
        refreshTime: '00:00:00',
        detail: {
            windDirection: '北风',
            windPower: '三级',
            humidity: '23%',
            pressure: '1020.1',
            rainfall: '6.2',
            airQuality: '优'
        },
        list: []
    },
    actions,
    mutations
}