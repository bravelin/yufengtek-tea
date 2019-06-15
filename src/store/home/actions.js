import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    // 获取首页数据
    [types.HOME_GET_DATA] (context) {
        const state = context.state
        const data = state.currSelectedRegion ? { addr: state.currSelectedRegion } : {}
        ajax({ url: '/bigdata/home/detail', method: 'post', data }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                // 茶树排行
                const arr = resData.planting.sort((a, b) => { return a.area > b.area ? 1 : -1 })
                state.amountRankDatas = arr
                if (!state.currSelectedRegion) {
                    let tempList = []
                    for (let i = arr.length - 1; i >= 0; i--) {
                        tempList.push(arr[i])
                    }
                    state.amountRankMainDatas = tempList
                }
                // 获取施肥比例数据
                state.farmingActdatas = resData.fertiliz.map(item => { return { label: item.month, value: item.weight } })
                // 获取采摘数据
                state.pickDatas = resData.picking.map(item => { return { label: item.classify, value: item.amount } }).sort((a, b) => a.value > b.value ? -1 : 1)
                const teaTotalAmount = (resData.totalPicking == null || resData.totalPicking.length == 0) ? state.teaTotalAmount : (resData.totalPicking || 0)
                if (state.pickDatas.length <= 4) {
                    state.pickPieDatas = state.pickDatas
                } else {
                    let list = []
                    let tempNum = 0
                    for (let i = 0; i < 3; i++) {
                        list.push(state.pickDatas[i])
                        tempNum += state.pickDatas[i].value
                    }
                    list.push({ label: '其他', value: teaTotalAmount - tempNum })
                    state.pickPieDatas = list
                }
                if (teaTotalAmount > 10000) {
                    state.teaTotalAmount = (teaTotalAmount / 10000).toFixed(2)
                    state.pickDataUnit = '万吨'
                } else {
                    state.teaTotalAmount = teaTotalAmount ? (teaTotalAmount - 0).toFixed(2) : 0
                    state.pickDataUnit = '吨'
                }
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
                // 获取制茶等级数据
                state.levelDatas = resData.craft
                // iot设备数目
                const iotDatas = [
                    { name: '监测站FM1', data: 0, type: 'c4', size: 's0' },
                    { name: '监测站FM2', data: 0, type: 'c5', size: 's0' },
                    { name: '普通摄像头', data: 0, type: 'c2', size: 's0' },
                    { name: '云台摄像头', data: 0, type: 'c1', size: 's0' },
                    { name: '全景摄像头', data: 0, type: 'c3', size: 's0' }
                ]
                if (resData.deviceNumlist) {
                    resData.deviceNumlist.forEach(item => {
                        if (item.name == '枪机') {
                            iotDatas[2].data = item.num
                        } else if (item.name == '球机') {
                            iotDatas[3].data = item.num
                        } else if (item.name == '全景') {
                            iotDatas[4].data = item.num
                        } else if (item.name == 'FM1') {
                            iotDatas[0].data = item.num
                        } else if (item.name == 'FM2') {
                            iotDatas[1].data = item.num
                        }
                    })
                }
                state.iotDatas = iotDatas

                // 地图上的茶园信息
                const rootState = this.state
                rootState.gardenArea = resData.gardenArea
                rootState.gardenTotal = resData.gardenTotal
                rootState.plantArea = resData.plantArea || []

                // 总入库，总出库
                state.inStockWeight = resData.instockWeight || 0
                state.outStockWeight = resData.outstockWeight || 0
            } else {
                state.amountRankDatas = []
                state.farmingActdatas = []
                state.pickDatas = []
                state.teaTotalAmount = '-'
                state.warehouseDatas.in = []
                state.warehouseDatas.out = []
                state.cityDatas = []
                state.cameraAmount = '-'
                state.monitorAmount = '-'
                state.levelDatas = []
            }
        })
    }
}
