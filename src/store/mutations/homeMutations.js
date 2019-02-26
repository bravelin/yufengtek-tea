import types from '@/store/constants/types'
export default {
    [types.HOME_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    }
}
