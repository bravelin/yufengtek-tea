export default {
    mapStyle: 'amap://styles/darkblue',
    fm1MarkerImgUrl: {
        normal: './images/fm1.png',
        active: './images/fm1_active.png'
    },
    fm2MarkerImgUrl: {
        normal: './images/fm2.png',
        active: './images/fm2_active.png'
    },
    gunMarkerImgUrl: {
        normal: './images/gun.png',
        active: './images/gun_active.png'
    },
    wfMarkerImgUrl: {
        normal: './images/wf.png',
        active: './images/wf_active.png'
    },
    sphereMarkerImgUrl: {
        normal: './images/sphere.png',
        active: './images/sphere_active.png'
    },
    photoMarkerImgUrl: {
        normal: './images/360.png',
        active: './images/360_active.png'
    },
    iotMonitorMap: {
        center: [117.8689366, 27.658368], // 物联监控地图中心点
        zoom: 14
    },
    // 生产环境
    // baseUrl: 'http://192.168.0.136:8066',
    // baseUrl: 'https://tea.yufengtek.com/tea-IIS-Web',
    socketUrl: 'wss://tea.yufengtek.com/tea-IIS-Web/myHandler',

    // 开发环境下
    baseUrl: '',
    // socketUrl: 'wss://tea.yufengtek.com/tea-IIS-Web/myHandler',
}