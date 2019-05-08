import types from '@/store/constants/types'
import StorageTags from '@/lib/storageTags'
const win = window
const doc = document
const ls = localStorage

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
        doc.body.style.minHeight = state.winHeight + 'px'
        let count = state.windowResizeState + 1
        count = (count > 99999) ? 1 : count // 防止无限增大
        state.windowResizeState = count
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
    },
    // 更新用户信息
    [types.UPDATE_USER_INFO] (state, payload) {
        state.userToken = payload.userToken
        state.userId = payload.userId
        state.userName = payload.userName
        state.userRole = payload.userRole
        ls.setItem(StorageTags.userToken, state.userToken)
        ls.setItem(StorageTags.userId, state.userId)
        ls.setItem(StorageTags.userName, state.userName)
        ls.setItem(StorageTags.userRole, state.userRole)
        ls.setItem(StorageTags.password, payload.password)
    },
    // 清除用户信息
    [types.CLEAR_USER_INFO] (state) {
        state.userToken = ''
        state.userId = ''
        state.userName = ''
        state.userRole = ''
        ls.removeItem(StorageTags.userToken)
        ls.removeItem(StorageTags.userId)
        ls.removeItem(StorageTags.userName)
        ls.removeItem(StorageTags.userRole)
        ls.removeItem(StorageTags.password)
    }
}