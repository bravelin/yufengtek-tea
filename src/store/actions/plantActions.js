import types from '@/store/constants/types'
const amountRankOriginData = [
    { place: '星村镇', data: 1200 },
    { place: '五夫镇', data: 1120 },
    { place: '上梅乡', data: 1033 },
    { place: '杨庄乡', data: 982 },
    { place: '兴田镇', data: 900 },
    { place: '岚谷乡', data: 890 },
    { place: '吴屯乡', data: 721 },
    { place: '崇安街道', data: 523 },
    { place: '武夷街道', data: 356 },
    { place: '新丰街道', data: 200 }
]
const Num = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

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
            const baseData = context.state.currSelectedRegion == '' ? 3000 : 1000
            context.state.treeAgeDistributeDatas = tempData.map(item => {
                return {
                    type: item.type, data: parseInt(Math.random() * baseData) + 900
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
                data = parseInt(Math.random() * baseData) + 300
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
    },
    // 获取种植排行
    [types.PLANT_GET_AMOUNT_RANK] (context) {
        setTimeout(() => {
            if (context.state.currSelectedRegion == '') {
                context.state.amountRankDatas = amountRankOriginData.sort((a, b) => { return a.data > b.data ? -1 : 1 })
            } else {
                let list = Num.map(item => {
                    return { place: '公司' + item, data: parseInt(Math.random() * 1500) + 300 }
                })
                list.sort((a, b) => { return a.data > b.data ? -1 : 1 })
                context.state.amountRankDatas = list
            }
        }, 600)
    }
}
