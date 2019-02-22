import actions from '@/store/actions/homeActions'
import mutations from '@/store/mutations/homeMutations'

export default {
    namespaced: true,
    state: {
        teaTotalAmount: 2564,
        pickDatas: [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ],
        // 等级
        levelDatas: [
            { label: '大师级', value: 292 },
            { label: '特级', value: 495 },
            { label: '一级', value: 742 },
            { label: '二级', value: 1035 }
        ],
        // 茶树排行
        amountRankUnit: '亩',
        amountRankDatas: [
            { place: '星村镇', data: 1200 },
            { place: '五夫镇', data: 1120 },
            { place: '上梅乡', data: 1033 },
            { place: '杨庄乡', data: 982 },
            { place: '兴田镇', data: 900 },
            { place: '岚谷乡', data: 890 },
            { place: '吴屯乡', data: 721 },
            { place: '崇安街道', data: 523 },
            { place: '武夷街道', data: 211 },
        ],
        warehouseUnit: '吨',
        // 入库数据
        inWarehouseDatas: [
            { date: '1月', data: 1380 },
            { date: '2月', data: 1120 },
            { date: '3月', data: 590 },
            { date: '4月', data: 663 },
            { date: '5月', data: 356 },
            { date: '6月', data: 100 },
            { date: '7月', data: 1298 },
            { date: '8月', data: 990 },
            { date: '9月', data: 798 }
        ],
        // 出库数据
        outWarehouseDatas: [
            { date: '1月', data: 1080 },
            { date: '2月', data: 1020 },
            { date: '3月', data: 520 },
            { date: '4月', data: 660 },
            { date: '5月', data: 356 },
            { date: '6月', data: 100 },
            { date: '7月', data: 1198 },
            { date: '8月', data: 970 },
            { date: '9月', data: 790 }
        ],
    },
    actions,
    mutations
}