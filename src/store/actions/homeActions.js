import types from '@/store/constants/types'
export default {
    [types.GET_HOME_ORIGIN_DATA] (context) {
        setTimeout(() => {
            const datas = context.state.originDatas
            const list = datas.map(item => {
                return {
                    time: item.time, data: parseInt(Math.random() * 3200) + 200
                }
            })
            context.state.originDatas = list
        }, 250)
    }
}
