import actions from '@/store/actions/farmingActions'
import mutations from '@/store/mutations/farmingMutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '', // 当前所选的区域，空值为全市
        plantActPieDatas: [],
        plantActLineDatas: [],
        fertilizerActPieDatas: [],
        fertilizerActLineDatas: [],
        protectionActPieDatas: [],
        protectionActLineDatas: []
    },
    actions,
    mutations
}