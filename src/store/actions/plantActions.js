import types from '@/store/constants/types'
export default {
    // 获取统计数据
    [types.PLANT_GET_STAT_DATA] (context) {
        const tempData = [
            { label: '茶园总数', data: '1322', unit: '家' },
            { label: '茶园面积', data: '14.2万', unit: '亩' },
            { label: '预估产量', data: '1988', unit: '吨' }
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1220 : 600
            const baseData2 = context.state.currSelectedRegion == '' ? 50 : 20
            context.state.totalData = tempData.map((item, index) => {
                return {
                    label: item.label,
                    data: index == 1 ? (baseData2 * Math.random()).toFixed(1) : parseInt(baseData * Math.random()),
                    unit: item.unit
                }
            })
        }, 500)
    },
    // 获取树龄分布数据
    [types.PLANT_GET_TREE_AGE_DATA] (context) {
        const tempData = [
            { type: '3-4年', data: 1200 },
            { type: '5-8年', data: 3120 },
            { type: '9-20年', data: 5033 },
            { type: '20年以上', data: 982 }
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 5020 : 1000
            context.state.treeAgeDistributeDatas = tempData.map(item => {
                return {
                    type: item.type, data: parseInt(Math.random() * baseData)
                }
            })
        }, 300)
    },
    // 获取山场品质数据
    [types.PLANT_GET_TEA_FARM_DATA] (context) {
        const tempData = [
            { label: '高山', value: 2566 },
            { label: '半岩', value: 895 },
            { label: '正岩', value: 442 },
            { label: '其他', value: 535 }
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1020 : 500
            let total = 0
            let data = 0
            context.state.teaFarmTypeDatas = tempData.map(item => {
                data = parseInt(Math.random() * baseData)
                total += data
                return {
                    label: item.label, value: data
                }
            })
            context.state.farmTotalArea = total
        }, 800)
    },
    // 获取茶树品种数据
    [types.PLANT_GET_TEA_VARIETIES_DATA] (context) {
        const tempData = [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1020 : 500
            let total = 0
            let data = 0
            context.state.varietiesDatas = tempData.map(item => {
                data = parseInt(Math.random() * baseData)
                total += data
                return {
                    label: item.label, value: data
                }
            })
            context.state.varietiesTotalData = total
        }, 600)
    }
}
