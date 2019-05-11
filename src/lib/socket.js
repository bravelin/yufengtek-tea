import config from '@/lib/config'
import store from '@/store/index'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'
import { formatTime } from '@/lib/util'

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
let connTimer = null
let socket = new WebSocket(config.socketUrl)

function initSocket () {
    socket.onopen = onSocketOpen
    socket.onmessage = onSocketMessage
    socket.onerror = onSocketError
    socket.onclose = onSocketClose
    socket.send = onSocketSend
}

function onSocketOpen (e) {
    console.log('origin web socket open...', formatTime(new Date()))
    if (connTimer) {
        clearInterval(connTimer)
    }
}

function onSocketMessage (e) {
    const socketData = e.data
    const currPageName = store.state.currRouter.to
    console.log('socket data....', socketData)
    if (socketData.startsWith('change:')) { // 数据变动
        const changeKeys = socketData.slice(8, -1).split(',')
        const pageSet = new Set([])
        changeKeys.forEach(key => {
            if (pageKeyMap[key]) {
                pageKeyMap[key].forEach(pageName => {
                    pageSet.add(pageName)
                })
            }
        })
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
    } else if (socketData.startsWith('{') && /(home|origin)/.test(currPageName)) {
        const state = store.state[ns.ORIGIN] // 溯源数据
        try {
            const data = JSON.parse(e.data)
            if (currPageName == 'home') { // 首页，溯源排行
                store.dispatch(ns.HOME + '/' + types.HOME_GET_DATA)
            } else {
                store.dispatch(ns.ORIGIN + '/' + types.GET_ORIGIN_DATA)
                if (state.addressList[0] && data.date == state.addressList[0].date) {
                    store.commit(ns.ORIGIN + '/' + types.ORIGIN_REAL_TIME_DATA, {
                        type: 1, data
                    })
                } else {
                    store.commit(ns.ORIGIN + '/' + types.ORIGIN_REAL_TIME_DATA, {
                        type: 2, data: { date: data.date, list: [data] }
                    })
                }
            }
        } catch (error) {
            console.log(e.data, error)
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

function onSocketError (e) {
    console.log('socket error....', formatTime(new Date()), e)
}

function onSocketClose (e) {
    console.log('socket close....', formatTime(new Date()))
    console.log('close socket event...', e)
    console.log('reconnect socket...')
    if (connTimer) clearInterval(connTimer)
    connTimer = setInterval(() => {
        socket = new WebSocket(config.socketUrl)
        initSocket()
    }, 20000)
}

function onSocketSend (e) {
    console.log('send successful...', e)
}

initSocket()
export default socket
