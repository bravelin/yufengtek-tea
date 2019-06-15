import actions from './actions'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        cityDatas: [],
        countStatDatas: [], // 溯源次数统计,
        addressList: [], // 溯源地址数据
        totalPage: 1, // 溯源地址总页数
        currentPage: 1, // 溯源地址当前页
        originDate: '', // 选择日期时间
        mapDatas: [],
        mapFullState: false,
        cityRankFullState: false,
        countStateFullState: false
    },
    actions,
    mutations
}