import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations/index'
import modules from '@/store/modules/index'
import StorageTags from '@/lib/storageTags'

Vue.use(Vuex)
const ls = localStorage
export default new Vuex.Store({
    state: {
        winHeight: 0, // 当前窗口高度
        winWidth: 0, // 窗口宽度
        currRouter: { // 当前页面路由信息
            from: '',
            to: '',
            query: null,
            instance: null // 路由实例
        },
        chartFullPage: false, // 当前是否有图表是全屏状态
        loading: false, // loading的状态
        screenFullState: false, // 全屏状态
        windowResizeState: 0,

        // 与当前登录用户的相关状态
        userToken: ls.getItem(StorageTags.userToken) || '', // 用户token
        userId: ls.getItem(StorageTags.userId) || '', // 用户ID
        userName: ls.getItem(StorageTags.userName) || '', // 登录名
        userRole: ls.getItem(StorageTags.userRole) || '0', // 角色 0-可以查看全部内容 1-部分内容
    },
    mutations,
    modules
})
