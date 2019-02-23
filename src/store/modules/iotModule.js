import actions from '@/store/actions/iotActions'
import mutations from '@/store/mutations/iotMutations'

export default {
    namespaced: true,
    state: {
        monitors: [],
        fms: [],
        currActive: {
            index: 0,
            type: 'mn' // mn、fm
        },
        currFm: 'temperature', // temperature humidity light pressure
        currFmName: '温度',
        chartUnit: '%', // 图表的单位
        currFmDataType: 'HOUR', // HOUR WEEK
        fmData: {
            temperature: '12.13',
            humidity: '52.7',
            light: '9987.0',
            pressure: '988.51'
        },
        fmChartDatas: [], // 时刻/七天数据
        curveChartFullState: false, // 控制全屏状态
    },
    actions,
    mutations
}