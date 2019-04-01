import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    // 获取统计数据
    [types.PLANT_GET_STAT_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const tempData = [
            { label: '茶园总数', data: '1322', unit: '家' },
            { label: '茶园面积', data: '14.2万', unit: '亩' },
            { label: '预估产量', data: '1988', unit: '吨' }
        ]
        ajax({ url: '/bigdata/plant/detail', method: 'post', data: data }).then(res => {
            var repData = res.repData
            // 统计总数
            tempData[0].data = repData.gardenCount
            tempData[1].data = repData.gardenArea
            context.state.totalData = tempData
            // 树龄分布
            context.state.treeAgeDistributeDatas = repData.treeAge
            // 茶树种植面积
            context.state.varietiesDatas = repData.treeVarieties
            var total = 0
            for (var i = 0; i < repData.treeVarieties.length; i++) { total = repData.treeVarieties[i].area }
            context.state.varietiesTotalData = total
            // 种植排行
            context.state.amountRankDatas = repData.plantRanking
            // 种植品质
            context.state.teaFarmTypeDatas = repData.plantQuality
            var total1 = 0
            for (var j = 0; j < repData.treeVarieties.length; j++) { total1 = repData.treeVarieties[j].area }
            context.state.farmTotalArea = total1
        })
    },
}
