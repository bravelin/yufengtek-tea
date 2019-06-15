import types from '@/store/constants/types'
export default {
    [types.WAREHOUSE_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    },
    [types.WAREHOUSE_CHANGE_FULL_STATE] (state, payload) {
        state[payload.fullStateName] = payload.state
    }
}
