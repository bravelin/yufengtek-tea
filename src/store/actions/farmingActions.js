import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.FARMING_GET_PLANT_ACT_DATA] (context, payload) {
        const data = payload ? { address_country: '武夷山市', address_town: payload || '' } : { address_country: '武夷山市', address_town: '' }
        ajax({ url: '/data/farm/getData', method: 'post', data: data }).then(res => {
            if (res.code == 200) {
                context.state.plantActPieDatas = res.repData.yearPlant
                context.state.plantActLineDatas = res.repData.monthPlant
                context.state.fertilizerActPieDatas = res.repData.yearFaramA
                context.state.fertilizerActLineDatas = res.repData.monthFaramA
                context.state.protectionActPieDatas = res.repData.yearFaramB
                context.state.protectionActLineDatas = res.repData.monthFaramB
            }
        })
    }
}
