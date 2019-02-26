import types from '@/store/constants/types'
export default {
    [types.PLANT_CHANGE_CURR_REGION] (state, payload) {
        state.currSelectedRegion = payload
    }
}
