import types from '@/store/constants/types'
import ajax from '../../lib/ajax'
import util from '@/lib/util'
export default {
    [types.FARMING_GET_PLANT_ACT_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        ajax({ url: 'http://192.168.0.136:8066/data/farm/getData', method: 'post', data: data }).then(res => {
            context.state.plantActPieDatas = res.repData.yearPlant
            context.state.plantActLineDatas = res.repData.monthPlant
            context.state.fertilizerActPieDatas = res.repData.yearFaramB
            context.state.fertilizerActLineDatas = res.repData.monthFaramB
            context.state.protectionActPieDatas = res.repData.yearFaramA
            context.state.protectionActLineDatas = res.repData.monthFaramA
        })
    }
}
