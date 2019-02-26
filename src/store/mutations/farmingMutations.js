import types from '@/store/constants/types'
export default {
    [types.FARMING_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    }
}
