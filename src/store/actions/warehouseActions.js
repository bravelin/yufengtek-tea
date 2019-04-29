import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.WAREHOUSE_GET_TODAY_DATA] (context, payload) {
        const data = payload ? { addr: payload || '' } : ''
        const state = context.state
        ajax({ url: '/bigdata/warehouse/detail', method: 'post', data: data }).then(res => {
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
                const tempData = [
                    { omonth: '1月', weight: 0 },
                    { omonth: '2月', weight: 0 },
                    { omonth: '3月', weight: 0 },
                    { omonth: '4月', weight: 0 },
                    { omonth: '5月', weight: 0 },
                    { omonth: '6月', weight: 0 },
                    { omonth: '7月', weight: 0 },
                    { omonth: '8月', weight: 0 },
                    { omonth: '9月', weight: 0 },
                    { omonth: '10月', weight: 0 },
                    { omonth: '11月', weight: 0 },
                    { omonth: '12月', weight: 0 }
                ]
                let year = new Date().getFullYear()
                historyInDatas.push({ year: year - 1, list: tempData })
                historyInDatas.push({ year: year, list: repData.thisYearInStock })
                state.historyInDatas = historyInDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => { return { label: dataItem.omonth, value: dataItem.weight } })
                    }
                })
                historyOutDatas.push({ year: year - 1, list: tempData })
                historyOutDatas.push({ year: year, list: repData.thisYearOutStock })
                state.historyOutDatas = historyOutDatas.map(item => {
                    return {
                        year: item.year.toString(),
                        list: item.list.map(dataItem => { return { label: dataItem.omonth, value: dataItem.weight } })
                    }
                })
            }
        })
    },
}
