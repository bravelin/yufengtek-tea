import types from '@/store/constants/types'
export default {
    [types.WAREHOUSE_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    }
}
