import actions from '@/store/actions/warehouseActions'
import mutations from '@/store/mutations/warehouseMutations'

export default {
    namespaced: true,
    state: {
        mapInfoData: [
            { name: '星村镇', value: [117.792448, 27.69912, 10] },
            { name: '兴田镇', value: [117.992448, 27.52912, 100] },
        ],
        toDayInAmount: 567,
        toDayOutAmount: 431,
        thisYearInDatas: [
            { label: '1月', value: 633 },
            { label: '2月', value: 211 },
            { label: '3月', value: 302 },
            { label: '4月', value: 458 },
            { label: '5月', value: 987 },
            { label: '6月', value: 541 },
            { label: '7月', value: 201 },
            { label: '8月', value: 104 },
            { label: '9月', value: 589 },
            { label: '10月', value: 607 },
            { label: '11月', value: 567 },
            { label: '12月', value: 467 }
        ],
        thisYearOutDatas: [
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
        ],
        historyInDatas: [
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
        ],
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