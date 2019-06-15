import actions from './actions'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '',
        // 茶树种植排行
        amountRankUnit: '亩',
        amountRankDatas: [],
        // 山场品质
        farmTotalArea: 0,
        teaFarmTypeDatas: [],

        // 茶树品种
        varietiesTotalData: 0,
        varietiesDatas: [],
        treeAgeDistributeUnit: '亩',
        treeAgeDistributeDatas: [],
        totalData: [],

        // 全屏状态控制
        totalDataFullState: false,
        treeAgeFullState: false,
        teaVarietiesFullState: false,
        plantRankFullState: false,
        teaFarmFullState: false,
        mapFullState: false
    },
    actions,
    mutations
}