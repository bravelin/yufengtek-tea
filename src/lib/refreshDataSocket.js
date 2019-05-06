import config from '@/lib/config'
import store from '@/store/index'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'

const socket = new WebSocket(config.refreshDataSocketUrl)
const pageKeyMap = {
    camera: [ns.HOME, ns.IOT], // 摄像头
    craft: [ns.HOME], // 制茶工艺
    farm: [ns.FARMING], // 农事活动
    fm1: [ns.HOME, ns.IOT], // 监测站 fm1
    fm2: [ns.HOME, ns.IOT], // 监测站 fm2
    plant: [ns.HOME, ns.PLANT, ns.FARMING], // 种植信息，农事活动种植
    stock: [ns.WAREHOUSE, ns.HOME], // 出入库
    pick: [ns.HOME, ns.PLANT], // 采摘信息
}
let nextRefreshTimer = null
let nextRefreshName = ''

socket.onopen = function (e) {
    console.log('web refresh data socket open...')
}
socket.onmessage = function (e) {
    if (e.data.startsWith('change:')) { // 数据变动
        const changeKeys = e.data.slice(8, -1).split(',')
        const pageSet = new Set([])
        changeKeys.forEach(key => {
            if (pageKeyMap[key]) {
                pageKeyMap[key].forEach(pageName => {
                    pageSet.add(pageName)
                })
            }
        })
        const currPageName = store.state.currRouter.to
        if (pageSet.has(currPageName)) {
            console.log('needRefresh....')
            if (nextRefreshTimer && nextRefreshName != currPageName) {
                clearTimeout(nextRefreshTimer)
                console.log('cancel page：', nextRefreshName, ' refresh...')
            }
            if (nextRefreshName != currPageName) {
                nextRefreshName = currPageName
                nextRefreshTimer = setTimeout(() => {
                    doRefreshPageData(currPageName)
                }, 3000)
            }
        }
    }
}

function doRefreshPageData (pageName) {
    const currPageName = store.state.currRouter.to
    if (pageName == currPageName) { // 如果当前页面已经改变了，stop refresh
        if (pageName == ns.HOME) {
            store.dispatch(ns.HOME + '/' + types.HOME_GET_DATA)
        } else if (pageName == ns.IOT) {
            store.dispatch(ns.IOT + '/' + types.GET_IOT_DATA)
        } else if (pageName == ns.PLANT) {
            store.dispatch(ns.PLANT + '/' + types.PLANT_GET_DATA)
        } else if (pageName == ns.FARMING) {
            store.dispatch(ns.FARMING + '/' + types.FARMING_GET_DATA)
        } else if (pageName == ns.WAREHOUSE) {
            store.dispatch(ns.WAREHOUSE + '/' + types.WAREHOUSE_GET_DATA)
        }
    }
    nextRefreshTimer = null
    nextRefreshName = ''
}

socket.onerror = function (e) {
    console.log('refresh socket error....', e)
}

socket.onclose = function (e) {
    console.log('refresh socket close....', e)
}

export default socket
