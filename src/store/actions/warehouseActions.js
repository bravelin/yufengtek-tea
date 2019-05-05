import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.WAREHOUSE_GET_TODAY_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const state = context.state
        ajax({ url: '/bigdata/warehouse/detail', method: 'post', data }).then(res => {
            if (res.code == 200) {
                const repData = res.repData
                // 今日出入库信息
                state.toDayInAmount = repData.inStock ? repData.inStock.weight : 0
                state.toDayOutAmount = repData.outStock ? repData.outStock.weight : 0
                // 今年出入库信息
                state.thisYearInDatas = repData.thisYearInStock.map(item => {
                    return { label: item.omonth, value: item.weight }
                })
                state.thisYearOutDatas = repData.thisYearOutStock.map(item => {
                    return { label: item.omonth, value: item.weight }
                })
                // 历史出入库对比
                const historyInDatas = []
                const historyOutDatas = []
                const tempData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(item => { return { omonth: `${item}月`, weight: 0 } })
                let year = new Date().getFullYear()
                historyInDatas.push({ year: year - 1, list: tempData })
                historyInDatas.push({ year, list: repData.thisYearInStock })
                state.historyInDatas = historyInDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => { return { label: dataItem.omonth, value: dataItem.weight } })
                    }
                })
                historyOutDatas.push({ year: year - 1, list: tempData })
                historyOutDatas.push({ year, list: repData.thisYearOutStock })
                state.historyOutDatas = historyOutDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => { return { label: dataItem.omonth, value: dataItem.weight } })
                    }
                })
            } else {
                state.toDayInAmount = '-'
                state.toDayOutAmount = '-'
                state.thisYearInDatas = []
                state.thisYearOutDatas = []
                state.historyInDatas = []
                state.historyOutDatas = []
            }
        })
    },
}
