import actions from '@/store/actions/homeActions'
import mutations from '@/store/mutations/homeMutations'

export default {
    namespaced: true,
    state: {
        cameraAmount: 0,
        monitorAmount: 0,
        waterFertilizerAmount: 0, // 水肥设备
        farmingActdatas: [],
        pickDatas: [], // 采摘数据
        teaTotalAmount: '', // 采摘总量
        // 等级
        levelDatas: [],
        // 茶树排行
        amountRankUnit: '亩',
        amountRankDatas: [], // 茶树排行
        warehouseUnit: '吨',
        // 入库出库数据
        warehouseDatas: [],
        cityDatas: [],
        currSelectedRegion: '', // 当前所选的区域，空值为全市

        // 全屏状态
        amountRankFullState: false,
        farmingInfoFullState: false,
        pickInfoFullState: false,
        warehouseFullState: false,
        originDataFullState: false,
        levelInfoFullState: false,
        mapFullState: false
    },
    actions,
    mutations
}