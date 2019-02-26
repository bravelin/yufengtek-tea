import actions from '@/store/actions/homeActions'
import mutations from '@/store/mutations/homeMutations'

export default {
    namespaced: true,
    state: {
        cameraAmount: 0,
        monitorAmount: 0,
        teaTotalAmount: 0,
        farmingActdatas: [],
        pickDatas: [],
        // 等级
        levelDatas: [],
        // 茶树排行
        amountRankUnit: '亩',
        amountRankDatas: [],
        warehouseUnit: '吨',
        // 入库出库数据
        warehouseDatas: [],
        cityDatas: [],
        currSelectedRegion: '', // 当前所选的区域，空值为全市
    },
    actions,
    mutations
}