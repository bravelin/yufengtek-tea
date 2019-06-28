import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import { formatTime } from '@/lib/util'

export default {
    // 获取IOT物联设备数据
    [types.GET_IOT_DATA] (context) {
        const state = context.state
        ajax({ url: '/data/monitor/selectStation', method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                resData.cameraVos.forEach((item) => {
                    item.type = item.camera_type == '1' ? types.IOT_TYPE_GUN : types.IOT_TYPE_360
                    item.isActive = false
                    item.name = item.camera_name || ''
                    item.show = state.currVisibleIotType == '' || state.currVisibleIotType == 'camera'
                })
                resData.emVos.forEach(item => {
                    item.type = types.IOT_TYPE_SPHERE
                    item.isActive = false
                    item.show = state.currVisibleIotType == '' || state.currVisibleIotType == 'monitor'
                })
                resData.Fm1.forEach(item => {
                    item.type = types.IOT_TYPE_FM1
                    item.isActive = false
                    item.show = state.currVisibleIotType == '' || state.currVisibleIotType == 'monitor'
                })
                resData.Fm2.forEach(item => {
                    item.type = types.IOT_TYPE_FM2
                    item.isActive = false
                    item.show = state.currVisibleIotType == '' || state.currVisibleIotType == 'monitor'
                })
                let iotDatas = []
                iotDatas = resData.Fm1.concat(resData.emVos).concat(resData.Fm2).concat(resData.cameraVos)
                if (state.iotDatas.length != iotDatas.length) {
                    iotDatas.forEach((item, index) => {
                        item.index = index
                    })
                    state.currActive.type = types.IOT_TYPE_FM1
                    state.currActive.index = 0
                    iotDatas[0].isActive = true
                    state.cameraAmount = resData.cameraVos.length
                    state.monitorAmount = resData.Fm1.length + resData.Fm2.length + resData.emVos.length
                    state.iotDatas = iotDatas
                    context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                }
            }
        })
    },
    // 获取FM1的数据
    [types.GET_FM1_DATA] (context, sno) {
        const state = context.state
        const fm1 = state.fm1
        const fm1Data = fm1.data
        const timeType = state.fm1.time
        const type = state.fm1.type
        state.fm1.sno = sno || state.fm1.sno
        const iot = state.iotDatas.find(item => item.sno == state.fm1.sno)
        if (iot) {
            state.fm1.iotName = iot.name || ''
        }
        ajax({ url: '/data/monitor/getflddata?sno=' + state.fm1.sno, method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                const todayData = resData.todayData || []
                const sevenData = resData.sevenData || []
                // 最近最新数据
                if (todayData.length) {
                    const len = todayData.length - 1
                    const dataObj = todayData[len]
                    fm1Data.temperature = dataObj.temp.toFixed(2)
                    fm1Data.humidity = dataObj.humid.toFixed(0)
                    fm1Data.light = dataObj.sunlux.toFixed(0)
                    fm1Data.pressure = dataObj.pa.toFixed(2)
                } else {
                    fm1Data.temperature = '-'
                    fm1Data.humidity = '-'
                    fm1Data.light = '-'
                    fm1Data.pressure = '-'
                }
                if (timeType == 'HOUR') {
                    if (type == 'temperature') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: item.temp.toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: item.humid.toFixed(0) }
                        })
                    } else if (type == 'light') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: item.sunlux.toFixed(0) }
                        })
                    } else if (type == 'pressure') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: item.pa.toFixed(2) }
                        })
                    }
                } else if (timeType == 'WEEK') {
                    if (type == 'temperature') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: item.temp.toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: item.humid.toFixed(0) }
                        })
                    } else if (type == 'light') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: item.sunlux.toFixed(0) }
                        })
                    } else if (type == 'pressure') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: item.pa.toFixed(2) }
                        })
                    }
                }
            } else {
                fm1Data.temperature = '-'
                fm1Data.humidity = '-'
                fm1Data.light = '-'
                fm1Data.pressure = '-'
                fm1.chartDatas = []
            }
        })
    },
    // 获取FM2的数据
    [types.GET_FM2_DATA] (context, sno) {
        const state = context.state
        const fm2 = state.fm2
        const fm2Data = fm2.data
        const timeType = state.fm2.time
        const type = state.fm2.type
        state.fm2.sno = sno || state.fm2.sno
        const iot = state.iotDatas.find(item => item.sno == state.fm2.sno)
        if (iot) {
            state.fm2.iotName = iot.name || ''
        }

        ajax({ url: '/data/monitor/getFmbData?sno=' + state.fm2.sno, method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                const todayData = resData.todayData || []
                const sevenData = resData.sevenData || []
                // 当前的最新数据
                if (todayData.length) {
                    const len = todayData.length - 1
                    const dataObj = todayData[len]
                    fm2Data.temperature = dataObj.soiltemp.toString()
                    fm2Data.humidity = parseInt(dataObj.soilmture).toFixed(2)
                    fm2Data.wind = parseInt(dataObj.windspd).toFixed(2)
                    fm2Data.rain = parseInt(dataObj.rain).toFixed(2)
                } else {
                    fm2Data.temperature = '-'
                    fm2Data.humidity = '-'
                    fm2Data.wind = '-'
                    fm2Data.rain = '-'
                }
                if (timeType == 'HOUR') {
                    if (type == 'temperature') {
                        fm2.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: parseInt(item.soiltemp).toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm2.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: parseInt(item.soilmture).toFixed(2) }
                        })
                    } else if (type == 'wind') {
                        fm2.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: parseInt(item.windspd).toFixed(2), rotate: parseInt(item.winddir).toFixed(2) }
                        })
                    } else if (type == 'rain') {
                        fm2.chartDatas = todayData.map(item => {
                            return { title: item.txtime, data: parseInt(item.rain).toFixed(2) }
                        })
                    }
                } else if (timeType == 'WEEK') {
                    if (type == 'temperature') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: parseInt(item.soiltemp).toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: parseInt(item.soilmture).toFixed(2) }
                        })
                    } else if (type == 'wind') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: parseInt(item.windspd).toFixed(2), rotate: parseInt(item.winddir).toFixed(2) }
                        })
                    } else if (type == 'rain') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.day, data: parseInt(item.rain).toFixed(2) }
                        })
                    }
                }
            } else {
                fm2Data.temperature = '-'
                fm2Data.humidity = '-'
                fm2Data.wind = '-'
                fm2Data.rain = '-'
                fm2.chartDatas = []
            }
        })
    },
    // 摄像头与监测站之间active状态的切换
    [types.CHANGE_ACTIVE_IOT_TYPE] (context, payload) {
        const state = context.state
        const iotDatas = state.iotDatas
        if (payload == 'camera') {
            let index = 0
            let cameraObj = null
            for (let i = 0; i < iotDatas.length; i++) {
                cameraObj = iotDatas[i]
                if (cameraObj.camera_type == '1') {
                    index = i
                    break
                }
            }
            if (cameraObj) {
                context.state.camera = cameraObj
                context.commit(types.CHANGE_ACTIVE_MARKER, { index, type: types.IOT_TYPE_GUN })
                context.commit(types.GET_GUN_DATA, cameraObj)
                context.commit(types.CHANGE_VISIBLE_IOT_TYPE, payload)
            }
        } else {
            if (iotDatas.length) {
                context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                context.commit(types.CHANGE_ACTIVE_MARKER, { index: 0, type: types.IOT_TYPE_FM1 })
                context.commit(types.CHANGE_VISIBLE_IOT_TYPE, payload)
            }
        }
    },
    [types.CHANGE_PHOTO_VIEW_URL] (context, { id, name }) {
        const that = this
        const state = context.state
        return new Promise((resolve, reject) => {
            ajax({ url: '/data/monitor/getemdata?em_devid=' + id, method: 'post' }).then(res => {
                if (res && res.repData && res.repData[11]) {
                    const url = res.repData[11].replace(/http/, 'https')
                    state.photoViewUrl = url || state.photoViewUrl // 防止未返回数据
                    state.photoViewName = name || ''
                    state.photoViewTime = res.repData[0] ? formatTime(new Date(res.repData[0] * 1000), 'yyyy-MM-dd hh:mm:ss') : ''
                    resolve({ url: state.photoViewUrl, title: state.photoViewName, time: state.photoViewTime })
                } else {
                    that.commit(types.SWITCH_MESSAGE_TIP, { tip: '未能获取到全景图！', show: true })
                }
            })
        })
    }
}
