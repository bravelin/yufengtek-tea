import types from '@/store/constants/types'
export default {
    [types.PLANT_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    },
    [types.PLANT_CHANGE_FULL_STATE] (state, payload) {
        state[payload.fullStateName] = payload.state
    }
}
