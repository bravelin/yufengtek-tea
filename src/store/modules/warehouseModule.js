import actions from '@/store/actions/warehouseActions'
import mutations from '@/store/mutations/warehouseMutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '', // 当前所选的区域，空值为全市
        toDayInAmount: 0,
        toDayOutAmount: 0,
        thisYearInDatas: [],
        thisYearOutDatas: [],
        historyInDatas: [],
        historyOutDatas: [],

        // 全屏状态
        mapFullState: false,
        inCircleChartFullState: false,
        outCircleChartFullState: false,
        inLineChartFullState: false,
        outLineChartFullState: false,
        inConstrastFullState: false,
        outConstrastFullState: false
    },
    actions,
    mutations
}