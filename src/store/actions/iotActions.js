import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import api from '@/lib/api'

export default {
    [types.GET_IOT_DATA] (context, payload) { // 获取IOT物联设备数据
        ajax({ url: 'http://192.168.0.136:8066/data/monitor/selectStation', method: 'post' }).then(res => {
            const camera = res.repData.cameraVos.map(item => {
                item.type = item.camera_type == '1' ? types.IOT_TYPE_GUN : types.IOT_TYPE_360
                item.isActive = false
            })
            const emVos = res.repData.emVos.map(item => {
                item.type = types.IOT_TYPE_SPHERE
                item.isActive = false
            })
            const fm1 = res.repData.Fm1.map(item => {
                item.type = types.IOT_TYPE_FM1
                item.isActive = false
            })
            const fm2 = res.repData.Fm2.map(item => {
                item.type = types.IOT_TYPE_FM2
                item.isActive = false
            })
            // context.state.camera = res.repData.cameraVos
            // context.state.emVos = res.repData.emVos
            context.state.Fm1 = res.repData.Fm1
            context.state.Fm2 = res.repData.Fm2
            var iotDatas = []
            if (payload) {
                if (payload == 'camera') {
                    iotDatas = res.repData.cameraVos
                    iotDatas.map((item, index) => { item.index = index })
                    var id = 0
                    console.log(iotDatas.length)
                    for (var i = 0; i < iotDatas.length;) {
                        if (iotDatas[i].camera_type == '1') {
                            id = i
                            break
                        } else { i++ }
                    }
                    context.state.camera = res.repData.cameraVos[0]
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
                res.repData.cameraVos.push({ address_gislatd: '27.27', address_gislong: '117.07', camera_type: '1', type: types.IOT_TYPE_GUN })
                iotDatas = res.repData.Fm1.concat(res.repData.emVos).concat(res.repData.Fm2).concat(res.repData.cameraVos)
                iotDatas.map((item, index) => { item.index = index })
                context.dispatch(types.GET_FM1_DATA, iotDatas[0].sno)
            }
            iotDatas[0].isActive = true
            console.log(iotDatas)
            // iotDatas.map((item, index) => { item.index = index })
            context.state.cameraAmount = res.repData.cameraVos.length
            context.state.monitorAmount = res.repData.Fm1.length + res.repData.Fm2.length
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
        context.state.fm1.sno = payload
        ajax({ url: 'http://192.168.0.136:8066/data/monitor/getflddata?sno=' + payload, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                const length = res.repData.todayData.length - 1
                fm1.data.temperature = res.repData.todayData[length].flddata_temp
                fm1.data.humidity = res.repData.todayData[length].flddata_humid
                fm1.data.light = res.repData.todayData[length].flddata_sunlux
                fm1.data.pressure = res.repData.todayData[length].flddata_pa
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
        const timeType = state.fm1.time
        const type = state.fm1.type
        let baseData = 50
        if (type == 'temperature') {
            baseData = 30
        } else if (type == 'humidity') {
            baseData = 50
        } else if (type == 'light') {
            baseData = 3500
        } else if (type == 'pressure') {
            baseData = 5000
        }
        // if (timeType == 'HOUR') {
        //     ajax({ url: api.getFmsHourChartData }).then(res => {
        //         // state.chartUnit = res.unitContent
        //         const list = res.todayBrokenLineList || []
        //         state.fm1.chartDatas = list.map(item => {
        //             return {
        //                 title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
        //             }
        //         })
        //     })
        // } else if (timeType == 'WEEK') {
        //     ajax({ url: api.getFmsWeekChartData }).then(res => {
        //         // state.chartUnit = res.unitContent
        //         const list = res.weekDayBrokenLineList || []
        //         state.fm1.chartDatas = list.map(item => {
        //             return {
        //                 title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
        //             }
        //         })
        //     })
        // }
    },
    [types.GET_FM2_DATA] (context, payload) {
        const state = context.state
        const fm2 = state.fm2
        const timeType = state.fm2.time
        const type = state.fm2.type
        context.state.fm2.sno = payload
        ajax({ url: 'http://192.168.0.136:8066/data/monitor/getFmbData?sno=' + payload, method: 'post' }).then(res => {
            if (timeType == 'HOUR') {
                const length = res.repData.todayData.length - 1
                fm2.data.temperature = parseInt(res.repData.todayData[length].soiltemp).toFixed(2)
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
    [types.GET_FM2_CHART_DATA] (context) {
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
        ajax({ url: 'http://192.168.0.136:8066/data/monitor/getemdata?em_devid=' + payload, method: 'post' }).then(res => {
            // context.state.photoViewUrl = res.repData[11]
            // context.state.photoViewUrl = ''
        })
    },
    [types.GET_GUN_DATA] (context, payload) {
        context.state.camera = payload
        console.log(payload)
        context.state.videoUrl = payload.address_gislatd == 27.27 ? 'rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b' : context.state.camera.camera_url
        console.log(context.state.videoUrl)
    },
    [types.GET_360_DATA] (context, payload) {
        context.state.camera = payload
        console.log(360)
        context.state.videoUrl360 = 'http://hls01open.ys7.com/openlive/3cb95e485da24838ae7d65b99ff6cc27.m3u8'
    },
    [types.CHANGE_GUN_DIRECTION] (context, payload) {
        const sno = context.state.camera.camera_sno
        const data = { sno: sno, direction: parseInt(payload) }

        if (payload == 'up') {
            ajax({ url: 'http://192.168.0.136:8066/data/momitor/CameraStop?sno=' + sno, method: 'post', data: { sno: sno } }).then(res => {
                console.log(res)
            // context.state.photoViewUrl = res.repData[11]
            })
        } else {
            console.log(12222)
            ajax({ url: 'http://192.168.0.136:8066/data/momitor/CameraRun?sno=' + sno + '&direction=' + parseInt(payload), method: 'post', data: data }).then(res => {
                console.log(res)
            // context.state.photoViewUrl = res.repData[11]
            })
        }
    }
}
