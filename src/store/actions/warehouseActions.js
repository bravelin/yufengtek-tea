import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.WAREHOUSE_GET_TODAY_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        ajax({ url: '/bigdata/warehouse/detail', method: 'post', data: data }).then(res => {
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
                if (repData.lastYearInStock.length != 0 && repData.lastYearInStock != []) {
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
                }
                if (repData.lastYearOutStock.length != 0 && repData.lastYearOutStock != []) {
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
            }
        })
    },
}
