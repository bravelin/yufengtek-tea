import types from '@/store/constants/types'
import ajax from '@/lib/ajax'
import api from '@/lib/api'
export default {
    [types.GET_MONITORS] (context) { // 获取monitors
        ajax({
            url: api.getMonitorData
        }).then(res => {
            const monitors = res.monaList || []
            context.state.monitors = monitors.map((item, index) => {
                return {
                    id: item.vdcam_id,
                    name: item.vdcam_name,
                    lng: item.vdcam_gislong,
                    lat: item.vdcam_gislatd,
                    type: 'mn',
                    isActive: false,
                    index
                }
            })
        })
    },
    [types.GET_FMS] (context) { // 获取fms
        ajax({
            url: api.getFmsData
        }).then(res => {
            const fms = res.fmList || []
            context.state.fms = fms.map((item, index) => {
                if (index == 0) {
                    context.state.currActive.index = 0
                    context.state.currActive.type = 'fm'
                }
                return {
                    id: item.fldstnId,
                    gardenId: item.fldstnOrcId,
                    fieldId: item.fldstnOrcd01Id,
                    name: item.fldstnName,
                    lng: item.fldstnGislong,
                    lat: item.fldstnGislatd,
                    type: 'fm',
                    isActive: index == 0,
                    index
                }
            })
            context.dispatch(types.GET_FMS_DATA)
            context.dispatch(types.GET_FMS_CHART_DATA)
        })
    },
    [types.GET_FMS_DATA] (context) {
        const state = context.state
        const fmData = state.fmData
        setTimeout(() => {
            fmData.temperature = (20 * Math.random()).toFixed(2)
            fmData.humidity = (100 * Math.random()).toFixed(1)
            fmData.light = (10000 * Math.random()).toFixed(1)
            fmData.pressure = (10000 * Math.random()).toFixed(1)
        }, 1200)
    },
    [types.GET_FMS_CHART_DATA] (context) {
        const state = context.state
        const currFmDataType = state.currFmDataType
        const currFm = state.currFm
        if (currFmDataType == 'HOUR') {
            ajax({ url: api.getFmsHourChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.todayBrokenLineList || []
                state.fmChartDatas = list.map(item => {
                    return {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(50 * Math.random())
                    }
                })
            })
        } else if (currFmDataType == 'WEEK') {
            ajax({ url: api.getFmsWeekChartData }).then(res => {
                // state.chartUnit = res.unitContent
                const list = res.weekDayBrokenLineList || []
                state.fmChartDatas = list.map(item => {
                    return {
                        title: item.template_txdate, data: parseInt(item.brokenLineValue || 0) + parseInt(50 * Math.random())
                    }
                })
            })
        }
    }
}
