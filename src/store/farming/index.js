import actions from './actions'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '', // 当前所选的区域，空值为全市
        plantActPieDatas: [],
        plantActLineDatas: [],
        fertilizerActPieDatas: [],
        fertilizerActLineDatas: [],
        protectionActPieDatas: [],
        protectionActLineDatas: [],
        mapFullState: false,
        plantFullState: false,
        protectionFullState: false,
        fertilizerFullState: false
    },
    actions,
    mutations
}