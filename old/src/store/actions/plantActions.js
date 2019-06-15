import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    // 获取数据
    [types.PLANT_GET_DATA] (context) {
        const state = context.state
        const data = state.currSelectedRegion ? { addr: state.currSelectedRegion } : {}
        const tempData = [
            { label: '山场总数', data: '-', unit: '家' },
            { label: '种植面积', data: '-', unit: '亩' },
            { label: '预估产量', data: '-', unit: '吨' }
        ]
        ajax({ url: '/bigdata/plant/detail', method: 'post', data }).then(res => {
            if (res.code == 200) {
                const repData = res.repData
                // 统计总数
                tempData[0].data = repData.gardenCount == null ? 0 : repData.gardenCount
                tempData[1].data = repData.gardenArea == null ? 0 : repData.gardenArea
                tempData[2].data = repData.yield == null ? 0 : repData.yield.toFixed(2)
                state.totalData = tempData
                // 树龄分布
                state.treeAgeDistributeDatas = repData.treeAge || []
                // 茶树种植面积
                state.varietiesDatas = repData.treeVarieties || []
                const varietiesTotalData = state.varietiesDatas.reduce((total, currItem) => total + currItem.area, 0)
                state.varietiesTotalData = varietiesTotalData.toFixed(2)
                // 种植排行
                state.amountRankDatas = repData.plantRanking || []
                // 种植品质
                state.teaFarmTypeDatas = repData.plantQuality || []
                const farmTotalArea = state.teaFarmTypeDatas.reduce((total, currItem) => total + currItem.area, 0)
                state.farmTotalArea = farmTotalArea.toFixed(2)
            } else {
                state.treeAgeDistributeDatas = []
                state.varietiesDatas = []
                state.varietiesTotalData = '-'
                state.amountRankDatas = []
                state.teaFarmTypeDatas = []
                state.farmTotalArea = '-'
            }
        })
    },
}
