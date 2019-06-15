import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.FARMING_GET_DATA] (context) {
        const state = context.state
        const data = { address_country: '', address_town: state.currSelectedRegion }
        ajax({ url: '/data/farm/getData', method: 'post', data }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                state.plantActPieDatas = resData.yearPlant || []
                state.plantActLineDatas = resData.monthPlant || []
                state.fertilizerActPieDatas = resData.yearFaramA || []
                state.fertilizerActLineDatas = resData.monthFaramA || []
                state.protectionActPieDatas = resData.yearFaramB || []
                state.protectionActLineDatas = resData.monthFaramB || []
            } else {
                state.plantActPieDatas = []
                state.plantActLineDatas = []
                state.fertilizerActPieDatas = []
                state.fertilizerActLineDatas = []
                state.protectionActPieDatas = []
                state.protectionActLineDatas = []
            }
        })
    }
}
