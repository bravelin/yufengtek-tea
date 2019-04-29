import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    // 获取统计数据
    [types.PLANT_GET_STAT_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const tempData = [
            { label: '山场总数', data: '-', unit: '家' },
            { label: '种植面积', data: '-', unit: '亩' },
            { label: '预估产量', data: '-', unit: '吨' }
        ]
        ajax({ url: '/bigdata/plant/detail', method: 'post', data: data }).then(res => {
            var repData = res.repData
            // 统计总数
            tempData[0].data = repData.gardenCount == null ? 0 : repData.gardenCount
            tempData[1].data = repData.gardenArea == null ? 0 : repData.gardenArea
            tempData[2].data = repData.yield == null ? 0 : repData.yield.toFixed(2)
            context.state.totalData = tempData
            // 树龄分布
            context.state.treeAgeDistributeDatas = repData.treeAge
            // 茶树种植面积
            context.state.varietiesDatas = repData.treeVarieties
            let total = 0
            for (let i = 0; i < repData.treeVarieties.length; i++) { total = repData.treeVarieties[i].area + total }
            context.state.varietiesTotalData = total.toFixed(2)
            // 种植排行
            context.state.amountRankDatas = repData.plantRanking
            // 种植品质
            context.state.teaFarmTypeDatas = repData.plantQuality
            let total1 = 0
            for (let j = 0; j < repData.plantQuality.length; j++) { total1 = repData.plantQuality[j].area + total1 }
            context.state.farmTotalArea = total1.toFixed(2)
        })
    },
}
