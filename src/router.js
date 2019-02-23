import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import types from '@/store/constants/types'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    base: '',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/home',
            name: 'home', // 首页
            component: () => import('./views/Home/Index.vue')
        },
        {
            path: '/iot',
            name: 'iot', // iot
            component: () => import('./views/Iot/Index.vue')
        },
        {
            path: '/plant',
            name: 'plant', // 种植分布
            component: () => import('./views/PlantInfo/Index.vue')
        },
        {
            path: '/farming',
            name: 'farming', // 农事活动
            component: () => import('./views/FarmingInfo/Index.vue')
        },
        {
            path: '/warehouse',
            name: 'warehouse', // 出库入库
            component: () => import('./views/Warehouse/Index.vue')
        },
        {
            path: '/origin',
            name: 'origin', // 溯源数据
            component: () => import('./views/OriginData/Index.vue')
        },
        {
            path: '*',
            redirect: { name: 'home' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit({
        type: types.SET_CURR_ROUTER,
        from: from.name,
        to: to.name,
        query: to.query,
        instance: router
    })
    if (to.name && to.name !== from.name) {
        store.commit(types.SWITCH_LOADING, true)
    }
    next(true)
})

export default router
