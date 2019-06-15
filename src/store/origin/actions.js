import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.GET_ORIGIN_DATA] (context) {
        const state = context.state
        ajax({ url: '/bigdata/origin/detail', method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                const list = []
                resData.originCity.forEach(item => {
                    if (item.city) {
                        list.push({ value: item.count, name: item.city })
                    }
                })
                state.cityDatas = list
                state.countStatDatas = resData.originCount || []
                let value = []
                resData.originCity.forEach((item, index) => { value[index] = [item.latitude, item.longitude] })
                state.mapDatas = resData.originCity.map((item, index) => { return { value: value[index].concat(item.count), name: item.city } })
            } else {
                state.cityDatas = []
                state.countStatDatas = []
                state.mapDatas = []
            }
        })
    },
    [types.GET_ORIGIN_LIST_DATA] (context, payload) {
        const state = context.state
        if (payload.currentPage == 1) { state.addressList = [] }
        const data = { currentPage: payload.currentPage, originDate: payload.originDate || '' }
        ajax({ url: '/bigdata/origin/pageList', method: 'post', data: data }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                state.addressList = resData.originList
                state.totalPage = resData.pageInfo.totalPages
                state.currentPage = payload.currentPage
                state.originDate = payload.originDate
            }
        })
    }
}
