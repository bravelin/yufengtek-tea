import types from '@/store/constants/types'
export default {
    [types.CHANGE_ACTIVE_MARKER] (state, payload) {
        const currActive = state.currActive
        const lastActiveObj = state.iotDatas[currActive.index]
        if (lastActiveObj) {
            lastActiveObj.isActive = false
        }
        currActive.index = payload.index
        currActive.type = payload.type
        state.iotDatas[currActive.index].isActive = true
    },
    [types.SWITCH_FM1_TYPE] (state, payload) {
        const fm1 = state.fm1
        fm1.type = payload.value
        fm1.name = payload.name
        if (payload.value == 'temperature') {
            fm1.chartUnit = '℃'
        } else if (payload.value == 'humidity') {
            fm1.chartUnit = '%'
        } else if (payload.value == 'light') {
            fm1.chartUnit = 'Lux'
        } else if (payload.value == 'pressure') {
            fm1.chartUnit = 'Pa'
        }
    },
    [types.SWITCH_FM1_TIME_TYPE] (state, val) {
        state.fm1.time = val // val为 HOUR WEEK
    },
    [types.CHANGE_VISIBLE_IOT_TYPE] (state, type) {
        state.currVisibleIotType = type
        state.iotDatas = state.iotDatas.map(item => {
            if (item.type == types.IOT_TYPE_GUN || item.type == types.IOT_TYPE_360 || item.type == types.IOT_TYPE_SPHERE) {
                item.show = (type == '' || type == 'camera')
            } else {
                item.show = (type == '' || type == 'monitor')
            }
            return item
        })
    },
    [types.SWITCH_FM2_TYPE] (state, payload) {
        const fm2 = state.fm2
        fm2.type = payload.value
        fm2.name = payload.name
        if (payload.value == 'temperature') {
            fm2.chartUnit = '℃'
        } else if (payload.value == 'humidity') {
            fm2.chartUnit = '%'
        } else if (payload.value == 'wind') {
            fm2.chartUnit = 'm/s'
        } else if (payload.value == 'rain') {
            fm2.chartUnit = 'mm'
        }
    },
    [types.SWITCH_FM2_TIME_TYPE] (state, val) {
        state.fm2.time = val // val为 HOUR WEEK
    },
    [types.SWITCH_WF_TYPE] (state, payload) {
        const wf = state.wf
        wf.type = payload.value
        wf.name = payload.name
        if (payload.value == 'ec') {
            wf.chartUnit = 'mS/cm'
        } else if (payload.value == 'ph') {
            wf.chartUnit = ''
        } else if (payload.value == 'water') {
            wf.chartUnit = 'L'
        } else if (payload.value == 'fertilizer') {
            wf.chartUnit = 'kg'
        }
    },
    [types.SWITCH_WF_TIME_TYPE] (state, val) {
        state.wf.time = val // val为 HOUR WEEK
    },
    [types.IOT_CHANGE_FULL_STATE] (state, payload) {
        if (payload.subModuleName) {
            state[payload.subModuleName][payload.fullStateName] = payload.state
        } else {
            state[payload.fullStateName] = payload.state
        }
    },
    [types.GET_GUN_DATA] (state, payload) {
        state.videoUrl = payload.camera_url
        state.videoName = payload.camera_name
    },
    [types.GET_360_DATA] (state, payload) {
        state.camera = payload
        state.videoUrl360 = payload.camera_url
        state.video360Name = payload.camera_name
    },
    [types.CHANGE_CONTROL_BUTTON_STATUS] (state, isActive) {
        state.controlButtonIsActive = isActive
    }
}
