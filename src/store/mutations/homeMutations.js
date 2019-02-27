import types from '@/store/constants/types'
export default {
    [types.HOME_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    },
    [types.HOME_CHANGE_FULL_STATE] (state, payload) {
        state[payload.fullStateName] = payload.state
    }
}
