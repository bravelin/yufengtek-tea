import actions from '@/store/actions/iotActions'
import mutations from '@/store/mutations/iotMutations'
import types from '@/store/constants/types'

export default {
    namespaced: true,
    state: {
        cameraAmount: 116,
        monitorAmount: 234,
        waterFertilizerAmount: 205, // 水肥设备
        iotDatas: [], // 设备数据
        photoViewUrl: './360/01.jpg',
        currActive: {
            type: types.IOT_TYPE_FM1,
            id: '001'
        },
        fm1: {
            type: 'temperature', // temperature humidity light pressure
            name: '温度',
            chartUnit: '℃',
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: {
                temperature: '12.13',
                humidity: '52.7',
                light: '9987.0',
                pressure: '988.51'
            },
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        fm2: {
            type: 'wind', // wind rain temperature humidity
            name: '温度',
            chartUnit: '℃',
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: {
                wind: '12',
                rain: '52',
                temperature: '17',
                humidity: '16'
            },
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        wf: {
            type: 'ec', // ec ph water fertilizer
            name: 'EC',
            chartUnit: 'mS/cm', // L kg
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: {
                ec: '12',
                ph: '7',
                water: '17',
                fertilizer: '16'
            },
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        photoViewerFullState: false, // 全景的全屏状态
    },
    actions,
    mutations
}