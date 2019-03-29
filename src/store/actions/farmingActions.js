import types from '@/store/constants/types'
import ajax from '../../lib/ajax'
import util from '@/lib/util'
export default {
    [types.FARMING_GET_PLANT_ACT_DATA] (context, payload) {
        const data = payload ? { address_country: '武夷山市', address_town: payload || '' } : { address_country: '武夷山市', address_town: '' }
        // ?address_country=' + '武夷山市' + '&address_town=' + addressTown
        ajax({ url: util.globeURL + '/data/farm/getData', method: 'post', data: data }).then(res => {
            if (res.code == 200) {
                context.state.plantActPieDatas = res.repData.yearPlant
                context.state.plantActLineDatas = res.repData.monthPlant
                context.state.fertilizerActPieDatas = res.repData.yearFaramB
                context.state.fertilizerActLineDatas = res.repData.monthFaramB
                context.state.protectionActPieDatas = res.repData.yearFaramA
                context.state.protectionActLineDatas = res.repData.monthFaramA
            }
        })
    }
}
