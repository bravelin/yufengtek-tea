import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import api from '@/lib/api'

export default {
    [types.GET_IOT_DATA] (context, payload) { // 获取IOT物联设备数据
        ajax({ url: '/data/monitor/selectStation', method: 'post' }).then(res => {
            res.repData.cameraVos.forEach((item) => {
                item.type = item.camera_type == '1' ? types.IOT_TYPE_GUN : types.IOT_TYPE_360
                item.isActive = false
            })
            res.repData.emVos.forEach(item => {
                item.type = types.IOT_TYPE_SPHERE
                item.isActive = false
            })
            res.repData.Fm1.forEach(item => {
                item.type = types.IOT_TYPE_FM1
                item.isActive = false
            })
            res.repData.Fm2.forEach(item => {
                item.type = types.IOT_TYPE_FM2
                item.isActive = false
            })
            // context.state.camera = res.repData.cameraVos
            // context.state.emVos = res.repData.emVos
            // context.state.Fm1 = res.repData.Fm1
            // context.state.Fm2 = res.repData.Fm2
            var iotDatas = []
            var id = 0
            if (payload) {
                if (payload == 'camera') {
                    iotDatas = res.repData.cameraVos
                    iotDatas.map((item, index) => { item.index = index })
                    for (var i = 0; i < iotDatas.length;) {
                        if (iotDatas[i].camera_type == '1') {
                            id = i
                            break
                        } else { i++ }
                    }
                    context.state.camera = res.repData.cameraVos[id]
                    // context.dispatch(types.GET_FM1_DATA, 1)
                    context.commit(types.CHANGE_ACTIVE_MARKER, {
                        id: id, type: types.IOT_TYPE_GUN
                    })
                    context.dispatch(types.GET_GUN_DATA, res.repData.cameraVos[id])
                } else {
                    iotDatas = res.repData.Fm1.concat(res.repData.emVos).concat(res.repData.Fm2)
                    iotDatas.map((item, index) => { item.index = index })
                    context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                    context.commit(types.CHANGE_ACTIVE_MARKER, {
                        id: 0, type: types.IOT_TYPE_FM1
                    })
                }
            } else {
                // res.repData.cameraVos.push({ address_gislatd: '27.27', address_gislong: '117.07', camera_type: '1', type: types.IOT_TYPE_GUN }) // 测试数据
                iotDatas = res.repData.Fm1.concat(res.repData.emVos).concat(res.repData.Fm2).concat(res.repData.cameraVos)
                iotDatas.map((item, index) => { item.index = index })
                context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
                context.dispatch(types.GET_FM1_CHART_DATA)
            }
            iotDatas[id].isActive = true
            // console.log(iotDatas)
            // iotDatas.map((item, index) => { item.index = index })
            context.state.cameraAmount = res.repData.cameraVos.length
            context.state.monitorAmount = res.repData.Fm1.length + res.repData.Fm2.length + res.repData.emVos.length
            context.state.iotDatas = iotDatas
            // context.dispatch(types.GET_FM1_DATA, 1) // 默认先显示fm1的id为1的数据
            // context.dispatch(types.GET_FM1_CHART_DATA)
        })
    },
    [types.GET_FM1_DATA] (context, payload) {
        const state = context.state
        const fm1 = state.fm1
        const data = { fldstn_id: payload }
        const timeType = state.fm1.time
        const type = state.fm1.type
        context.state.fm1.sno = payload || context.state.fm1.sno
        ajax({ url: '/data/monitor/getflddata?sno=' + context.state.fm1.sno, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                const length = res.repData.todayData.length - 1
                // fm1.data.temperature = res.repData.todayData[length].flddata_temp
                // fm1.data.humidity = res.repData.todayData[length].flddata_humid
                // fm1.data.light = res.repData.todayData[length].flddata_sunlux
                // fm1.data.pressure = res.repData.todayData[length].flddata_pa
                const total = []
                if (type == 'temperature') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.flddata_txtime, data: item.flddata_temp })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'humidity') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.flddata_txtime, data: item.flddata_humid })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'light') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.flddata_txtime, data: item.flddata_sunlux })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'pressure') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.flddata_txtime, data: item.flddata_pa })
                        return total
                    })
                    state.fm1.chartDatas = total
                }
            } else if (timeType == 'WEEK') {
                const length = res.repData.sevenData.length - 1
                fm1.data.temperature = res.repData.sevenData[length].flddata_temp.toFixed(2)
                fm1.data.humidity = res.repData.sevenData[length].flddata_humid.toFixed(2)
                fm1.data.light = res.repData.sevenData[length].flddata_sunlux.toFixed(2)
                fm1.data.pressure = res.repData.sevenData[length].flddata_pa.toFixed(2)
                const total = []
                if (type == 'temperature') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: item.flddata_temp.toFixed(2) })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'humidity') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: item.flddata_humid.toFixed(2) })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'light') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: item.flddata_sunlux.toFixed(2) })
                        return total
                    })
                    state.fm1.chartDatas = total
                } else if (type == 'pressure') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: item.flddata_pa.toFixed(2) })
                        return total
                    })
                    state.fm1.chartDatas = total
                }
            }
        })
    },
    [types.GET_FM1_CHART_DATA] (context) {
        const state = context.state
        const fm1 = state.fm1
        const timeType = state.fm1.time
        ajax({ url: '/data/momitor/getflddataLast?sno=' + context.state.fm1.sno, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                // const length = res.repData.todayData.length - 1
                fm1.data.temperature = res.repData.data.flddata_temp
                fm1.data.humidity = res.repData.data.flddata_humid
                fm1.data.light = res.repData.data.flddata_sunlux
                fm1.data.pressure = res.repData.data.flddata_pa
            }
        })
    },
    [types.GET_FM2_DATA] (context, payload) {
        const state = context.state
        const fm2 = state.fm2
        const timeType = state.fm2.time
        const type = state.fm2.type
        context.state.fm2.sno = payload || context.state.fm2.sno
        ajax({ url: '/data/monitor/getFmbData?sno=' + context.state.fm2.sno, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                const length = res.repData.todayData.length - 1
                fm2.data.temperature = res.repData.todayData[length].soiltemp.toString()
                fm2.data.humidity = parseInt(res.repData.todayData[length].soilmture).toFixed(2)
                fm2.data.wind = parseInt(res.repData.todayData[length].windspd).toFixed(2)
                fm2.data.rain = parseInt(res.repData.todayData[length].rain).toFixed(2)
                const total = []
                if (type == 'temperature') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.txtime, data: parseInt(item.soiltemp).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'humidity') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.txtime, data: parseInt(item.soilmture).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'wind') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.txtime, data: parseInt(item.windspd).toFixed(2), rotate: parseInt(item.winddir).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'rain') {
                    res.repData.todayData.forEach(item => {
                        total.push({ title: item.txtime, data: parseInt(item.rain).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                }
            } else if (timeType == 'WEEK') {
                const length = res.repData.sevenData.length - 1
                fm2.data.temperature = parseInt(res.repData.sevenData[length].soiltemp).toFixed(2)
                fm2.data.humidity = parseInt(res.repData.sevenData[length].soilmture).toFixed(2)
                fm2.data.wind = parseInt(res.repData.sevenData[length].windspd).toFixed(2)
                fm2.data.rain = parseInt(res.repData.sevenData[length].rain).toFixed(2)
                const total = []
                if (type == 'temperature') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: parseInt(item.soiltemp).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'humidity') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: parseInt(item.soilmture).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'wind') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: parseInt(item.windspd).toFixed(2), rotate: parseInt(item.winddir).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                } else if (type == 'rain') {
                    res.repData.sevenData.forEach(item => {
                        total.push({ title: item.days, data: parseInt(item.rain).toFixed(2) })
                        return total
                    })
                    state.fm2.chartDatas = total
                }
            }
        })
    },
    [types.GET_FM2_CHART_DATA] (context) {
        const state = context.state
        const fm2 = state.fm2
        const timeType = state.fm2.time
        ajax({ url: '/data/momitor/getFmbDataLast?sno=' + context.state.fm2.sno, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                fm2.data.temperature = parseInt(res.repData.data.soiltemp).toFixed(2)
                fm2.data.humidity = parseInt(res.repData.data.soilmture).toFixed(2)
                fm2.data.wind = parseInt(res.repData.data.windspd).toFixed(2)
                fm2.data.rain = parseInt(res.repData.data.rain).toFixed(2)
            }
        })
    },
    // 水肥一体化
    [types.GET_WF_DATA] (context) {
        const state = context.state
        const wf = state.wf
        setTimeout(() => {
            wf.data.ec = (2000 * Math.random()).toFixed(2)
            wf.data.ph = (14 * Math.random()).toFixed(0)
            wf.data.water = (5000 * Math.random()).toFixed(1)
            wf.data.fertilizer = (3000 * Math.random()).toFixed(1)
        }, 1200)
    },
    [types.GET_WF_CHART_DATA] (context) {
        const state = context.state
        const timeType = state.wf.time
        const type = state.wf.type
        let baseData = 50
        if (type == 'ec') {
            baseData = 2000
        } else if (type == 'ph') {
            baseData = 14
        } else if (type == 'water') {
            baseData = 5000
        } else if (type == 'fertilizer') {
            baseData = 3000
        }
        if (timeType == 'HOUR') {
            ajax({ url: api.getFmsHourChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.todayBrokenLineList || []
                state.wf.chartDatas = list.map(item => {
                    return {
                        title: (type == 'water' || type == 'fertilizer') ? item.month : item.template_txdate, data: parseInt(baseData * Math.random())
                    }
                })
            })
        } else if (timeType == 'WEEK') {
            ajax({ url: api.getFmsWeekChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.weekDayBrokenLineList || []
                state.wf.chartDatas = list.map(item => {
                    return {
                        title: (type == 'water' || type == 'fertilizer') ? item.month : item.template_txdate, data: parseInt(baseData * Math.random())
                    }
                })
            })
        }
    },
    [types.CHANGE_PHOTO_VIEW_URL] (context, payload) {
        ajax({ url: '/data/monitor/getemdata?em_devid=' + payload, method: 'post' }).then(res => {
            const url = res.repData[11].replace(/http/, 'https')
            context.state.photoViewUrl = url || context.state.photoViewUrl // 防止未返回数据
        })
    },
    [types.GET_GUN_DATA] (context, payload) {
        context.state.camera = payload
        context.state.videoUrl = context.state.camera.camera_url
    },
    [types.GET_360_DATA] (context, payload) {
        context.state.camera = payload
        context.state.videoUrl360 = context.state.camera.camera_url
    },
    [types.CHANGE_GUN_DIRECTION] (context, payload) {
        const sno = context.state.camera.camera_sno
        if (payload == 'up') {
            ajax({ url: '/data/momitor/CameraStop?sno=' + sno, method: 'post' }).then(res => {
                // console.log(res)
            })
        } else {
            ajax({ url: '/data/momitor/CameraRun?sno=' + sno + '&direction=' + parseInt(payload), method: 'post' }).then(res => {
                // console.log(res)
            })
        }
    }
}
