import actions from './actions'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        cameraAmount: 0,
        monitorAmount: 0,
        waterFertilizerAmount: 0, // 水肥设备
        farmingActdatas: [],
        pickDatas: [], // 采摘数据
        pickPieDatas: [], // 限定四条数据之内
        pickDataUnit: '吨', // 采摘数据单位
        teaTotalAmount: '', // 采摘总量
        // iot各设备数目
        iotDatas: [],
        // 等级
        levelDatas: [],
        // 茶树排行
        amountRankUnit: '亩',
        amountRankDatas: [], // 茶树排行
        amountRankMainDatas: [], // 各乡镇茶树排行
        warehouseUnit: '吨',
        // 入库出库数据
        warehouseDatas: { in: [], out: [] },
        cityDatas: [],
        currSelectedRegion: '', // 当前所选的区域，空值为全市

        inStockWeight: 0, // 总入库
        outStockWeight: 0, // 总出库

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