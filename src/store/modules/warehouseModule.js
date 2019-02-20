import actions from '@/store/actions/warehouseActions'
import mutations from '@/store/mutations/warehouseMutations'

export default {
    namespaced: true,
    state: {
        unit: 'kg',
        // 入库数据
        inDatas: [
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
        outDatas: [
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