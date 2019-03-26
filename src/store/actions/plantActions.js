import types from '@/store/constants/types'
import ajax from '../../lib/ajax'
import util from '@/lib/util'

export default {
    // 获取统计数据
    [types.PLANT_GET_STAT_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const tempData = [
            { label: '茶园总数', data: '1322', unit: '家' },
            { label: '茶园面积', data: '14.2万', unit: '亩' },
            { label: '预估产量', data: '1988', unit: '吨' }
        ]
        ajax({ url: util.globeURL + '/bigdata/plant/detail', method: 'post', data: data }).then(res => {
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
    // 获取树龄分布数据
    // [types.PLANT_GET_TREE_AGE_DATA] (context) {
    //     const tempData = [
    //         { type: '3-4年', data: 1200 },
    //         { type: '5-8年', data: 3120 },
    //         { type: '9-20年', data: 5033 },
    //         { type: '20年以上', data: 982 }
    //     ]
    //     setTimeout(() => {
    //         const baseData = context.state.currSelectedRegion == '' ? 3000 : 1000
    //         context.state.treeAgeDistributeDatas = tempData.map(item => {
    //             return {
    //                 type: item.type, data: parseInt(Math.random() * baseData) + 900
    //             }
    //         })
    //     }, 300)
    // },
    // 获取种植品质数据
    // [types.PLANT_GET_TEA_FARM_DATA] (context) {
    //     const tempData = [
    //         { label: '高山', value: 2566 },
    //         { label: '半岩', value: 895 },
    //         { label: '正岩', value: 442 },
    //         { label: '其他', value: 535 }
    //     ]
    //     setTimeout(() => {
    //         const baseData = context.state.currSelectedRegion == '' ? 1020 : 500
    //         let total = 0
    //         let data = 0
    //         context.state.teaFarmTypeDatas = tempData.map(item => {
    //             data = parseInt(Math.random() * baseData) + 300
    //             total += data
    //             return {
    //                 label: item.label, value: data
    //             }
    //         })
    //         context.state.farmTotalArea = total
    //     }, 800)
    // },
    // 获取茶树种植面积数据
    // [types.PLANT_GET_TEA_VARIETIES_DATA] (context) {
    //     const tempData = [
    //         { label: '大红袍', value: 292 },
    //         { label: '奇种', value: 495 },
    //         { label: '肉桂', value: 742 },
    //         { label: '水仙', value: 1035 },
    //         { label: '名枞', value: 535 }
    //     ]
    //     setTimeout(() => {
    //         const baseData = context.state.currSelectedRegion == '' ? 1020 : 500
    //         let total = 0
    //         let data = 0
    //         context.state.varietiesDatas = tempData.map(item => {
    //             data = parseInt(Math.random() * baseData)
    //             total += data
    //             return {
    //                 label: item.label, value: data
    //             }
    //         })
    //         context.state.varietiesTotalData = total
    //     }, 600)
    // },
    // 获取种植排行
    // [types.PLANT_GET_AMOUNT_RANK] (context) {
    //     setTimeout(() => {
    //         if (context.state.currSelectedRegion == '') {
    //             context.state.amountRankDatas = amountRankOriginData.sort((a, b) => { return a.data > b.data ? -1 : 1 })
    //         } else {
    //             let list = Num.map(item => {
    //                 return { place: '公司' + item, data: parseInt(Math.random() * 1500) + 300 }
    //             })
    //             list.sort((a, b) => { return a.data > b.data ? -1 : 1 })
    //             context.state.amountRankDatas = list
    //         }
    //     }, 600)
    // }
}
