import types from '@/store/constants/types'
export default {
    [types.ORIGIN_CHANGE_FULL_STATE] (state, payload) {
        state[payload.fullStateName] = payload.state
    }
}
