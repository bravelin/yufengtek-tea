import types from '@/store/constants/types'
export default {
    [types.ORIGIN_CHANGE_FULL_STATE] (state, payload) {
        state[payload.fullStateName] = payload.state
    },
    [types.ORIGIN_REAL_TIME_DATA] (state, payload) {
        const { type, data } = payload
        if (type == 1) {
            state.addressList[0].list.unshift(data)
        } else if (type == 2) {
            state.addressList.unshift(data)
        }
    }
}
