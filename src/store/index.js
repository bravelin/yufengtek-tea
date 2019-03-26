import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations/index'
import modules from '@/store/modules/index'
Vue.use(Vuex)

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
        htttp: 'heeppdhf'
    },
    mutations,
    modules
})
