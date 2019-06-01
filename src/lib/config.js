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
        center: [117.9289366, 27.659368], // 物联监控地图中心点，武夷山市
        zoom: 12
    },
    // 生产环境
    baseUrl: `${location.origin}/tea-Web-Bigdata`,
    socketUrl: `ws://${location.host}/tea-Web-Bigdata/myHandler`,
    // socketUrl: 'ws://192.168.2.117:8080/myHandler',
    mapAutoChangeTime: 5000,

    // 开发环境下
    // baseUrl: ''
}
