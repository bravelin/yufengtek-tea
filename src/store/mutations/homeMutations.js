import types from '@/store/constants/types'
export default {
    // 地图切换
    [types.HOME_MAP_CHANGE] (state, payload) {
        state.map.label = payload.label
        state.map.place = payload.place
    }
}
