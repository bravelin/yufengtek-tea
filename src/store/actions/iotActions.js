import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
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
                context.dispatch(types.GET_GUN_DATA, cameraObj)
            }
        } else {
            if (iotDatas.length) {
                context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                context.commit(types.CHANGE_ACTIVE_MARKER, { index: 0, type: types.IOT_TYPE_FM1 })
            }
        }
    },
    // 获取IOT物联设备数据
    [types.GET_IOT_DATA] (context, payload) {
        const state = context.state
        ajax({ url: '/data/monitor/selectStation', method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                resData.cameraVos.forEach((item) => {
                    item.type = item.camera_type == '1' ? types.IOT_TYPE_GUN : types.IOT_TYPE_360
                    item.isActive = false
                })
                resData.emVos.forEach(item => {
                    item.type = types.IOT_TYPE_SPHERE
                    item.isActive = false
                })
                resData.Fm1.forEach(item => {
                    item.type = types.IOT_TYPE_FM1
                    item.isActive = false
                })
                resData.Fm2.forEach(item => {
                    item.type = types.IOT_TYPE_FM2
                    item.isActive = false
                })
                let iotDatas = []
                let id = 0
                if (payload) {
                    if (payload == 'camera') {
                        iotDatas = resData.cameraVos
                        iotDatas.map((item, index) => { item.index = index })
                        for (let i = 0; i < iotDatas.length; i++) {
                            if (iotDatas[i].camera_type == '1') {
                                id = i
                                break
                            }
                        }
                        context.state.camera = resData.cameraVos[id]
                        context.commit(types.CHANGE_ACTIVE_MARKER, { index: id, type: types.IOT_TYPE_GUN })
                        context.dispatch(types.GET_GUN_DATA, resData.cameraVos[id])
                    } else {
                        iotDatas = resData.Fm1.concat(resData.emVos).concat(resData.Fm2)
                        iotDatas.forEach((item, index) => { item.index = index })
                        context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                        context.commit(types.CHANGE_ACTIVE_MARKER, { index: 0, type: types.IOT_TYPE_FM1 })
                    }
                } else {
                    iotDatas = resData.Fm1.concat(resData.emVos).concat(resData.Fm2).concat(resData.cameraVos)
                    iotDatas.forEach((item, index) => { item.index = index })
                    context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                }
                iotDatas[id].isActive = true
                state.cameraAmount = resData.cameraVos.length
                state.monitorAmount = resData.Fm1.length + resData.Fm2.length + resData.emVos.length
                state.iotDatas = iotDatas
            }
        })
    },
    // 获取FM1的数据
    [types.GET_FM1_DATA] (context, payload) {
        const state = context.state
        const fm1 = state.fm1
        const fm1Data = fm1.data
        const timeType = state.fm1.time
        const type = state.fm1.type
        state.fm1.sno = payload || state.fm1.sno

        ajax({ url: '/data/monitor/getflddata?sno=' + state.fm1.sno, method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                const todayData = resData.todayData || []
                const sevenData = resData.sevenData || []
                // 最近最新数据
                const len = todayData.length - 1
                const dataObj = todayData[len]
                fm1Data.temperature = dataObj.flddata_temp.toFixed(2)
                fm1Data.humidity = dataObj.flddata_humid.toFixed(2)
                fm1Data.light = dataObj.flddata_sunlux.toFixed(2)
                fm1Data.pressure = dataObj.flddata_pa.toFixed(2)

                if (timeType == 'HOUR') {
                    if (type == 'temperature') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.flddata_txtime, data: item.flddata_temp.toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.flddata_txtime, data: item.flddata_humid.toFixed(2) }
                        })
                    } else if (type == 'light') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.flddata_txtime, data: item.flddata_sunlux.toFixed(2) }
                        })
                    } else if (type == 'pressure') {
                        fm1.chartDatas = todayData.map(item => {
                            return { title: item.flddata_txtime, data: item.flddata_pa.toFixed(2) }
                        })
                    }
                } else if (timeType == 'WEEK') {
                    if (type == 'temperature') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: item.flddata_temp.toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: item.flddata_humid.toFixed(2) }
                        })
                    } else if (type == 'light') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: item.flddata_sunlux.toFixed(2) }
                        })
                    } else if (type == 'pressure') {
                        fm1.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: item.flddata_pa.toFixed(2) }
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
    [types.GET_FM2_DATA] (context, payload) {
        const state = context.state
        const fm2 = state.fm2
        const fm2Data = fm2.data
        const timeType = state.fm2.time
        const type = state.fm2.type
        state.fm2.sno = payload || state.fm2.sno

        ajax({ url: '/data/monitor/getFmbData?sno=' + context.state.fm2.sno, method: 'post' }).then(res => {
            if (res.code == 200) {
                const resData = res.repData
                const todayData = resData.todayData || []
                const sevenData = resData.sevenData || []
                // 当前的最新数据
                const len = todayData.length - 1
                const dataObj = todayData[len]
                fm2Data.temperature = dataObj.soiltemp.toString()
                fm2Data.humidity = parseInt(dataObj.soilmture).toFixed(2)
                fm2Data.wind = parseInt(dataObj.windspd).toFixed(2)
                fm2Data.rain = parseInt(dataObj.rain).toFixed(2)
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
                            return { title: item.days, data: parseInt(item.soiltemp).toFixed(2) }
                        })
                    } else if (type == 'humidity') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: parseInt(item.soilmture).toFixed(2) }
                        })
                    } else if (type == 'wind') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: parseInt(item.windspd).toFixed(2), rotate: parseInt(item.winddir).toFixed(2) }
                        })
                    } else if (type == 'rain') {
                        fm2.chartDatas = sevenData.map(item => {
                            return { title: item.days, data: parseInt(item.rain).toFixed(2) }
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
    [types.CHANGE_PHOTO_VIEW_URL] (context, payload) {
        const state = context.state
        ajax({ url: '/data/monitor/getemdata?em_devid=' + payload, method: 'post' }).then(res => {
            const url = res.repData[11].replace(/http/, 'https')
            state.photoViewUrl = url || state.photoViewUrl // 防止未返回数据
        })
    },
    [types.GET_GUN_DATA] (context, payload) {
        const state = context.state
        state.camera = payload
        state.videoUrl = state.camera.camera_url
    },
    [types.GET_360_DATA] (context, payload) {
        const state = context.state
        state.camera = payload
        state.videoUrl360 = state.camera.camera_url
    },
    [types.CHANGE_GUN_DIRECTION] (context, payload) {
        const sno = context.state.camera.camera_sno
        if (payload == 'up') {
            ajax({ url: '/data/momitor/CameraStop?sno=' + sno, method: 'post' })
        } else {
            ajax({ url: '/data/momitor/CameraRun?sno=' + sno + '&direction=' + parseInt(payload), method: 'post' })
        }
    }
}
