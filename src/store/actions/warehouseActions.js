import types from '@/store/constants/types'
import ajax from '../../lib/ajax'
import util from '@/lib/util'
export default {
    [types.WAREHOUSE_GET_TODAY_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        ajax({ url: util.globeURL + '/bigdata/warehouse/detail', method: 'post', data: data }).then(res => {
            if (res.code == 200) {
                var repData = res.repData
                // 今日出入库信息
                context.state.toDayInAmount = repData.inStock ? repData.inStock.weight : 0
                context.state.toDayOutAmount = repData.outStock ? repData.outStock.weight : 0
                // 今年出入库信息
                context.state.thisYearInDatas = repData.thisYearInStock.map(item => {
                    return {
                        label: item.omonth, value: item.weight
                    }
                })
                context.state.thisYearOutDatas = repData.thisYearOutStock.map(item => {
                    return {
                        label: item.omonth, value: item.weight
                    }
                })
                // 历史出入库对比
                var historyInDatas = []
                var historyOutDatas = []
                var year = new Date().getFullYear()
                historyInDatas.push({ year: year - 1, list: repData.lastYearInStock })
                historyInDatas.push({ year: year, list: repData.thisYearInStock })
                console.log(historyInDatas)
                context.state.historyInDatas = historyInDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => {
                            return {
                                label: dataItem.omonth, value: dataItem.weight
                                }
                        })
                    }
                })
                historyOutDatas.push({ year: year - 1, list: repData.lastYearOutStock })
                historyOutDatas.push({ year: year, list: repData.thisYearOutStock })
                context.state.historyOutDatas = historyOutDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => {
                            return {
                                label: dataItem.omonth, value: dataItem.weight
                                }
                        })
                    }
                })
            }
        })
    },
    // [types.WAREHOUSE_GET_THIS_YEAR_IN_DATA] (context) {
    //     const baseData = context.state.currSelectedRegion == '' ? 1500 : 600
    //     const tempData = [
    //         { label: '1月', value: 633 },
    //         { label: '2月', value: 211 },
    //         { label: '3月', value: 302 },
    //         { label: '4月', value: 458 },
    //         { label: '5月', value: 987 },
    //         { label: '6月', value: 541 },
    //         { label: '7月', value: 201 },
    //         { label: '8月', value: 104 },
    //         { label: '9月', value: 589 },
    //         { label: '10月', value: 607 },
    //         { label: '11月', value: 567 },
    //         { label: '12月', value: 467 }
    //     ]
    //     setTimeout(() => {
    //         context.state.thisYearInDatas = tempData.map(item => {
    //             return {
    //                 label: item.label, value: parseInt(Math.random() * baseData)
    //             }
    //         })
    //     }, 688)
    // },
    // [types.WAREHOUSE_GET_THIS_YEAR_OUT_DATA] (context) {
    //     const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
    //     const tempData = [
    //         { label: '1月', value: 633 },
    //         { label: '2月', value: 211 },
    //         { label: '3月', value: 302 },
    //         { label: '4月', value: 458 },
    //         { label: '5月', value: 987 },
    //         { label: '6月', value: 541 },
    //         { label: '7月', value: 201 },
    //         { label: '8月', value: 104 },
    //         { label: '9月', value: 589 },
    //         { label: '10月', value: 607 },
    //         { label: '11月', value: 567 },
    //         { label: '12月', value: 467 }
    //     ]
    //     setTimeout(() => {
    //         context.state.thisYearOutDatas = tempData.map(item => {
    //             return {
    //                 label: item.label, value: parseInt(Math.random() * baseData)
    //             }
    //         })
    //     }, 700)
    // },
    // [types.WAREHOUSE_GET_HISTORY_IN_DATA] (context) {
    //     const tempData = [
    //         {
    //             year: '2017',
    //             list: [
    //                 { label: '1月', value: 496 },
    //                 { label: '2月', value: 647 },
    //                 { label: '3月', value: 700 },
    //                 { label: '4月', value: 535 },
    //                 { label: '5月', value: 321 },
    //                 { label: '6月', value: 459 },
    //                 { label: '7月', value: 444 },
    //                 { label: '8月', value: 335 },
    //                 { label: '9月', value: 366 },
    //                 { label: '10月', value: 498 },
    //                 { label: '11月', value: 200 },
    //                 { label: '12月', value: 463 }
    //             ]
    //         },
    //         {
    //             year: '2018',
    //             list: [
    //                 { label: '1月', value: 433 },
    //                 { label: '2月', value: 111 },
    //                 { label: '3月', value: 202 },
    //                 { label: '4月', value: 658 },
    //                 { label: '5月', value: 787 },
    //                 { label: '6月', value: 241 },
    //                 { label: '7月', value: 301 },
    //                 { label: '8月', value: 404 },
    //                 { label: '9月', value: 689 },
    //                 { label: '10月', value: 107 },
    //                 { label: '11月', value: 367 },
    //                 { label: '12月', value: 767 }
    //             ]
    //         }
    //     ]
    //     const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
    //     setTimeout(() => {
    //         context.state.historyInDatas = tempData.map(item => {
    //             return {
    //                 year: item.year,
    //                 list: item.list.map(dataItem => {
    //                     return {
    //                         label: dataItem.label, value: parseInt(Math.random() * baseData)
    //                     }
    //                 })
    //             }
    //         })
    //     }, 400)
    // },
    // [types.WAREHOUSE_GET_HISTORY_OUT_DATA] (context) {
    //     const tempData = [
    //         {
    //             year: '2017',
    //             list: [
    //                 { label: '1月', value: 496 },
    //                 { label: '2月', value: 647 },
    //                 { label: '3月', value: 700 },
    //                 { label: '4月', value: 535 },
    //                 { label: '5月', value: 321 },
    //                 { label: '6月', value: 459 },
    //                 { label: '7月', value: 444 },
    //                 { label: '8月', value: 335 },
    //                 { label: '9月', value: 366 },
    //                 { label: '10月', value: 498 },
    //                 { label: '11月', value: 200 },
    //                 { label: '12月', value: 463 }
    //             ]
    //         },
    //         {
    //             year: '2018',
    //             list: [
    //                 { label: '1月', value: 433 },
    //                 { label: '2月', value: 111 },
    //                 { label: '3月', value: 202 },
    //                 { label: '4月', value: 658 },
    //                 { label: '5月', value: 787 },
    //                 { label: '6月', value: 241 },
    //                 { label: '7月', value: 301 },
    //                 { label: '8月', value: 404 },
    //                 { label: '9月', value: 689 },
    //                 { label: '10月', value: 107 },
    //                 { label: '11月', value: 367 },
    //                 { label: '12月', value: 767 }
    //             ]
    //         }
    //     ]
    //     const baseData = context.state.currSelectedRegion == '' ? 1300 : 600
    //     setTimeout(() => {
    //         context.state.historyOutDatas = tempData.map(item => {
    //             return {
    //                 year: item.year,
    //                 list: item.list.map(dataItem => {
    //                     return {
    //                         label: dataItem.label, value: parseInt(Math.random() * baseData)
    //                     }
    //                 })
    //             }
    //         })
    //     }, 400)
    // }
}
