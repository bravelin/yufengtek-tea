import actions from '@/store/actions/warehouseActions'
import mutations from '@/store/mutations/warehouseMutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '', // 当前所选的区域，空值为全市
        toDayInAmount: 0,
        toDayOutAmount: 0,
        thisYearInDatas: [],
        thisYearOutDatas: [],
        historyInDatas: [],
        historyOutDatas: [
            {
                year: '2017',
                list: [
                    { label: '1月', value: 496 },
                    { label: '2月', value: 647 },
                    { label: '3月', value: 700 },
                    { label: '4月', value: 535 },
                    { label: '5月', value: 321 },
                    { label: '6月', value: 459 },
                    { label: '7月', value: 444 },
                    { label: '8月', value: 335 },
                    { label: '9月', value: 366 },
                    { label: '10月', value: 498 },
                    { label: '11月', value: 200 },
                    { label: '12月', value: 463 }
                ]
            },
            {
                year: '2018',
                list: [
                    { label: '1月', value: 433 },
                    { label: '2月', value: 111 },
                    { label: '3月', value: 202 },
                    { label: '4月', value: 658 },
                    { label: '5月', value: 787 },
                    { label: '6月', value: 241 },
                    { label: '7月', value: 301 },
                    { label: '8月', value: 404 },
                    { label: '9月', value: 689 },
                    { label: '10月', value: 107 },
                    { label: '11月', value: 367 },
                    { label: '12月', value: 767 }
                ]
            }
        ]
    },
    actions,
    mutations
}