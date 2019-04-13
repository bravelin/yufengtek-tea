import actions from '@/store/actions/iotActions'
import mutations from '@/store/mutations/iotMutations'
import types from '@/store/constants/types'

export default {
    namespaced: true,
    state: {
        cameraAmount: 0,
        monitorAmount: 0,
        waterFertilizerAmount: 0, // 水肥设备
        iotDatas: [], // 设备数据
        camera: [],
        emVos: [],
        Fm1: [],
        Fm2: [],
        photoViewUrl: '',
        currActive: {
            type: types.IOT_TYPE_FM1,
            id: 0
        }, // 默认为FM1
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
            sno: '',
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        fm2: {
            type: 'wind', // wind rain temperature humidity
            name: '风速',
            chartUnit: 'm/s',
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: {
                wind: '12',
                rain: '52',
                temperature: '17',
                humidity: '16'
            },
            sno: '',
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
        camera360FullState: false, // 360摄像头的全屏状态
        videoUrl: '', // 监控录像地址
        videoUrl360: '', // 球机摄像头地址
        display: '',
        mapSise: 14, // 地图处于的放大等级
    },
    actions,
    mutations
}