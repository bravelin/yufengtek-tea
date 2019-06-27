import types from '@/store/constants/types'
import ajax from '@/lib/ajax'

export default {
    [types.GET_APP_VIDEO_TOKEN] (context) {
        const state = context.state
        ajax({ url: '/data/monitor/getCameraToken', method: 'post' }).then(res => {
            if (res.code == 200) {
                state.appVideoToken = res.repData.accessToken
                state.appVideoKey = res.repData.appKey
            }
        })
    }
}