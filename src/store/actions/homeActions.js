import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    // 获取茶树排行数据
    [types.HOME_GET_AMOUNT_RANK_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const state = context.state
        ajax({ url: '/bigdata/home/detail', method: 'post', data }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                // 茶树排行
                state.amountRankDatas = resData.planting.sort((a, b) => { return a.area > b.area ? 1 : -1 })
                // 获取施肥比例数据
                state.farmingActdatas = resData.fertiliz.map(item => { return { label: item.month, value: item.weight } })
                // 获取采摘数据
                state.pickDatas = res.repData.picking.map(item => { return { label: item.classify, value: item.amount } })
                state.teaTotalAmount = (resData.totalPicking == null || resData.totalPicking.length == 0) ? state.teaTotalAmount : resData.totalPicking
                // 获取出库入库数据
                let warehouseDatas = {}
                warehouseDatas.in = (resData.inStock.length == 0) ? state.warehouseDatas.in : resData.inStock
                warehouseDatas.out = (resData.inStock.length == 0) ? state.warehouseDatas.out : resData.outStock
                state.warehouseDatas = warehouseDatas
                // 城市溯源排行
                state.cityDatas = resData.origin.map(item => { return { value: item.counts, name: item.cityname } })
                // 获取监控设备数据
                state.cameraAmount = resData.cameraCount.count
                state.monitorAmount = resData.fielddstation.count
                state.waterFertilizerAmount = 0
                // 获取制茶等级数据
                state.levelDatas = resData.craft
            }
        })
    },
}
