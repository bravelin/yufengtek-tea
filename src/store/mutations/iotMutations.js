import types from '@/store/constants/types'
export default {
    [types.CHANGE_ACTIVE_MARKER] (state, payload) {
        const currActive = state.currActive
        const currIndex = currActive.index
        const currType = currActive.type
        const data = currType == 'mn' ? state.monitors : state.fms
        data[currIndex].isActive = false
        const activeData = payload.type == 'mn' ? state.monitors : state.fms
        activeData[payload.index].isActive = true
        currActive.type = payload.type
        currActive.index = payload.index
    },
    [types.SWITCH_FM] (state, payload) {
        state.currFm = payload.value
        state.currFmName = payload.name
        if (payload.value == 'temperature') {
            state.chartUnit = '℃'
        } else if (payload.value == 'humidity') {
            state.chartUnit = '%'
        } else if (payload.value == 'light') {
            state.chartUnit = 'Lux'
        } else if (payload.value == 'pressure') {
            state.chartUnit = 'Pa'
        }
        console.log('payload.value...', payload.value, state.chartUnit)
    },
    [types.SWITCH_FM_DATA_TYPE] (state, val) {
        state.currFmDataType = val // val为 HOUR WEEK
    },
    [types.IOT_CURVE_FULL_STATE_CHANGE] (state, payload) {
        state.curveChartFullState = payload !== undefined ? payload : !state.curveChartFullState
    }
}
