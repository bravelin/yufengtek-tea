import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.GET_ORIGIN_DATA] (context) {
        ajax({ url: '/bigdata/origin/detail', method: 'post' }).then(res => {
            context.state.cityDatas = res.repData.originCity.map(item => { return { value: item.count, name: item.city } })
            context.state.countStatDatas = res.repData.originCount
            let value = []
            res.repData.originCity.map((item, index) => { value[index] = [item.latitude, item.longitude] })
            context.state.mapDatas = res.repData.originCity.map((item, index) => { return { value: value[index].concat(item.count), name: item.city } })
        })
    },
    [types.GET_ORIGIN_LIST_DATA] (context, payload) {
        if (payload.currentPage == 1) { context.state.addressList = [] }
        const data = { currentPage: payload.currentPage, originDate: payload.originDate || '' }
        ajax({ url: '/bigdata/origin/pageList', method: 'post', data: data }).then(res => {
            if (res.code == 200) {
                context.state.addressList = res.repData.originList
                context.state.totalPage = res.repData.pageInfo.totalPages
                context.state.currentPage = payload.currentPage
                context.state.originDate = payload.originDate
            }
        })
    }
}
