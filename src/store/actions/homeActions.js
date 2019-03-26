import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import util from '@/lib/util'
export default {
    // 获取茶树排行数据
    [types.HOME_GET_AMOUNT_RANK_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        ajax({ url: util.globeURL + '/bigdata/home/detail', method: 'post', data: data }).then(res => {
            // 茶树排行
            context.state.amountRankDatas = res.repData.planting.sort((a, b) => { return a.area > b.area ? 1 : -1 })
            // 获取施肥比例数据
            context.state.farmingActdatas = res.repData.fertiliz.map(item => {
                return { label: item.month, value: item.weight }
            })
            // 获取采摘数据
            let data = 0
            context.state.pickDatas = res.repData.picking.map(item => {
                data = item.amount
                return { label: item.classify, value: data }
            })
            context.state.teaTotalAmount = res.repData.totalPicking
            // 获取出库入库数据
            let warehouseDatas = {}
            warehouseDatas.in = (res.repData.inStock)
            warehouseDatas.out = (res.repData.inStock)
            context.state.warehouseDatas = warehouseDatas
            // 城市溯源排行
            var result = res.repData.origin.map(item => { return { value: item.counts, name: item.cityname } })
            context.state.cityDatas = result
            // 获取监控设备数据
            context.state.cameraAmount = res.repData.cameraCount.count
            context.state.monitorAmount = res.repData.fielddstation.count
            context.state.waterFertilizerAmount = 0
            // 获取制茶等级数据
            context.state.levelDatas = res.repData.craft
        })
    },
}
