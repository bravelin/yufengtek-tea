import types from '@/store/constants/types'
const win = window
const doc = document
export default {
    [types.SWITCH_LOADING] (state, isShow) {
        state.loading = isShow
    },
    [types.SWITCH_SCREEN_FULL] (state, fullState) {
        state.screenFullState = fullState
    },
    [types.GET_WINDOW_SIZE] (state) {
        state.winHeight = doc.documentElement.clientHeight || win.innerHeight
        state.winWidth = doc.documentElement.clientWidth || win.innerWidth
        console.log(doc.documentElement.clientWidth)
        console.log(win.innerWidth)
        doc.body.style.minHeight = state.winHeight + 'px'
        state.windowResizeState = state.windowResizeState + 1
    },
    [types.SET_CURR_ROUTER] (state, payload) {
        const currRouter = state.currRouter
        currRouter.from = payload.from
        currRouter.to = payload.to
        currRouter.query = payload.query
        currRouter.instance = payload.instance
        if (!currRouter.to) {
            state.loading = false
            state.screenFullState = false
        }
    }
}