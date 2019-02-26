import types from '@/store/constants/types'
export default {
    [types.WAREHOUSE_GET_TODAY_DATA] (context) {
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 2000 : 800
            context.state.toDayInAmount = parseInt(Math.random() * baseData)
            context.state.toDayOutAmount = parseInt(Math.random() * baseData)
        }, 600)
    },
    [types.WAREHOUSE_GET_THIS_YEAR_IN_DATA] (context) {
        const baseData = context.state.currSelectedRegion == '' ? 1500 : 600
        const tempData = [
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
        ]
        setTimeout(() => {
            context.state.thisYearInDatas = tempData.map(item => {
                return {
                    label: item.label, value: parseInt(Math.random() * baseData)
                }
            })
        }, 688)
    },
    [types.WAREHOUSE_GET_THIS_YEAR_OUT_DATA] (context) {
        const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
        const tempData = [
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
        ]
        setTimeout(() => {
            context.state.thisYearOutDatas = tempData.map(item => {
                return {
                    label: item.label, value: parseInt(Math.random() * baseData)
                }
            })
        }, 700)
    },
    [types.WAREHOUSE_GET_HISTORY_IN_DATA] (context) {
        const tempData = [
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
        const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
        setTimeout(() => {
            context.state.historyInDatas = tempData.map(item => {
                return {
                    year: item.year,
                    list: item.list.map(dataItem => {
                        return {
                            label: dataItem.label, value: parseInt(Math.random() * baseData)
                        }
                    })
                }
            })
        }, 400)
    },
    [types.WAREHOUSE_GET_HISTORY_OUT_DATA] (context) {
        const tempData = [
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
        const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
        setTimeout(() => {
            context.state.historyOutDatas = tempData.map(item => {
                return {
                    year: item.year,
                    list: item.list.map(dataItem => {
                        return {
                            label: dataItem.label, value: parseInt(Math.random() * baseData)
                        }
                    })
                }
            })
        }, 400)
    }
}
