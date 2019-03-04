import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import api from '@/lib/api'

export default {
    [types.GET_IOT_DATA] (context) { // 获取IOT物联设备数据
        setTimeout(() => {
            context.state.iotDatas = [
                { id: '001', type: types.IOT_TYPE_FM1, lng: 114.2191, lat: 25.7491, isActive: true },
                { id: '002', type: types.IOT_TYPE_FM1, lng: 114.0774, lat: 25.6011, isActive: false },
                { id: '003', type: types.IOT_TYPE_FM2, lng: 114.9554, lat: 25.1245, isActive: false },
                { id: '004', type: types.IOT_TYPE_FM2, lng: 115.3509, lat: 25.2836, isActive: false },
                { id: '005', type: types.IOT_TYPE_GUN, lng: 115.2850, lat: 25.6011, isActive: false },
                { id: '006', type: types.IOT_TYPE_GUN, lng: 115.2410, lat: 26.0362, isActive: false },
                { id: '007', type: types.IOT_TYPE_SPHERE, lng: 114.2191, lat: 23.7491, isActive: false, photoViewUrl: './360/01.jpg' },
                { id: '008', type: types.IOT_TYPE_SPHERE, lng: 114.9774, lat: 25.6011, isActive: false, photoViewUrl: './360/02.jpg' },
                { id: '009', type: types.IOT_TYPE_WF, lng: 114.8990, lat: 24.7491, isActive: false },
                { id: '010', type: types.IOT_TYPE_WF, lng: 114.0774, lat: 25.0011, isActive: false },
                { id: '011', type: types.IOT_TYPE_360, lng: 115.3191, lat: 23.4491, isActive: false, photoViewUrl: './360/03.jpg' },
                { id: '012', type: types.IOT_TYPE_360, lng: 115.8774, lat: 24.9011, isActive: false, photoViewUrl: './360/01.jpg' }
            ]
            context.dispatch(types.GET_FM1_DATA)
            context.dispatch(types.GET_FM1_CHART_DATA)
        }, 200)
    },
    [types.GET_FM1_DATA] (context) {
        const state = context.state
        const fm1 = state.fm1
        setTimeout(() => {
            fm1.data.temperature = (20 * Math.random()).toFixed(2)
            fm1.data.humidity = (100 * Math.random()).toFixed(1)
            fm1.data.light = (10000 * Math.random()).toFixed(1)
            fm1.data.pressure = (10000 * Math.random()).toFixed(1)
        }, 1200)
    },
    [types.GET_FM2_DATA] (context) {
        const state = context.state
        const fm2 = state.fm2
        setTimeout(() => {
            fm2.data.temperature = (20 * Math.random()).toFixed(2)
            fm2.data.humidity = (100 * Math.random()).toFixed(1)
            fm2.data.wind = (100 * Math.random()).toFixed(1)
            fm2.data.rain = (1000 * Math.random()).toFixed(1)
        }, 1200)
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
        if (timeType == 'HOUR') {
            ajax({ url: api.getFmsHourChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.todayBrokenLineList || []
                state.fm1.chartDatas = list.map(item => {
                    return {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
                    }
                })
            })
        } else if (timeType == 'WEEK') {
            ajax({ url: api.getFmsWeekChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.weekDayBrokenLineList || []
                state.fm1.chartDatas = list.map(item => {
                    return {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
                    }
                })
            })
        }
    },
    [types.GET_FM2_CHART_DATA] (context) {
        const state = context.state
        const timeType = state.fm2.time
        const type = state.fm2.type
        let baseData = 50
        if (type == 'temperature') {
            baseData = 30
        } else if (type == 'humidity') {
            baseData = 50
        } else if (type == 'wind') {
            baseData = 100
        } else if (type == 'rain') {
            baseData = 1000
        }
        const winds = [
            { label: '东风', rotate: 90 },
            { label: '东北风', rotate: 45 },
            { label: '东南风', rotate: 135 },
            { label: '西南风', rotate: 12 },
            { label: '西北风', rotate: 10 },
            { label: '北风', rotate: 0 },
            { label: '南风', rotate: 150 }
        ]
        let tIndex = 0
        if (timeType == 'HOUR') {
            let obj = null
            ajax({ url: api.getFmsHourChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.todayBrokenLineList || []
                state.fm2.chartDatas = list.map(item => {
                    obj = {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
                    }
                    if (type == 'wind') {
                        tIndex = parseInt(Math.random() * winds.length)
                        obj.label = winds[tIndex].label
                        obj.rotate = winds[tIndex].rotate
                    }
                    return obj
                })
            })
        } else if (timeType == 'WEEK') {
            ajax({ url: api.getFmsWeekChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.weekDayBrokenLineList || []
                let obj = null
                state.fm2.chartDatas = list.map(item => {
                    obj = {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(baseData * Math.random())
                    }
                    if (type == 'wind') {
                        tIndex = parseInt(Math.random() * winds.length)
                        obj.label = winds[tIndex].label
                        obj.rotate = winds[tIndex].rotate
                    }
                    return obj
                })
            })
        }
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
    }
}
