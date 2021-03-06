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
        fm1List: [],
        fm2List: [],
        photoViewUrl: '',
        photoViewName: '',
        photoViewTime: '',
        controlButtonIsActive: false,
        currVisibleIotType: '', // Camera Monitor
        currActive: { type: types.IOT_TYPE_FM1, index: 0 },
        fm1: {
            iotName: '',
            type: 'temperature', // temperature humidity light pressure
            name: '温度',
            chartUnit: '℃',
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: { temperature: '-', humidity: '-', light: '-', pressure: '-' },
            sno: '',
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        fm2: {
            iotName: '',
            type: 'wind', // wind rain temperature humidity
            name: '风速',
            chartUnit: 'm/s',
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: { wind: '-', rain: '-', temperature: '-', humidity: '-' },
            sno: '',
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        wf: {
            type: 'ec', // ec ph water fertilizer
            name: 'EC',
            chartUnit: 'mS/cm', // L kg
            time: 'HOUR', // HOUR WEEK 数据时间类型
            data: { ec: '-', ph: '-', water: '-', fertilizer: '-' },
            chartDatas: [], // 时刻/七天图表数据
            curveChartFullState: false, // 控制全屏状态
        },
        photoViewerFullState: false, // 全景的全屏状态
        camera360FullState: false, // 360摄像头的全屏状态
        videoUrl: '', // 监控录像地址
        videoName: '',
        videoUrl360: '', // 球机摄像头地址
        video360Name: '',
    },
    actions,
    mutations
}