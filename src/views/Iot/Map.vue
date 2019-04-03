<template>
    <div class="map-container" id="map-container"></div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'
    import mapStyle from './mapStyleV1'
    // import '@/lib/InfoBox_min.js'
    // import '@/lib/MarkerClusterer_min.js'
    // import '@/lib/TextIconOverlay_min.js'
    import { constants } from 'fs'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = `$store.state.${moduleNameSpace}.iotDatas`
    const mapSiseProp = `$store.state.${moduleNameSpace}.mapSise`

    let fm1IconNormal = null // 正常
    let fm1IconActive = null // 选中
    let fm2IconNormal = null
    let fm2IconActive = null
    let gunIconNormal = null
    let gunIconActive = null
    let wfIconNormal = null
    let wfIconActive = null
    let sphereIconNormal = null
    let sphereIconActive = null
    let photoIconNormal = null
    let photoIconActive = null

    export default {
        name: 'ProductionMonitorMap',
        data () {
            return {
                map: null,
                mapReady: false,
                markers: [], // 标记
                activeIcon: false,
                infoWindow: '',
                markerClusterer: '', // 是否被聚合
                mk: '', // 聚合的标记
                markerActive: '', // 选中的标记
                displayType: false
            }
        },
        computed: {
            ...thisMapState(['iotDatas', 'currActive', 'camera', 'emVos', 'Fm1', 'Fm2'])
        },
        watch: {
            [dataProp] () {
                this.addMarkers()
            },
            [mapSiseProp] () {
                console.log(156)
                this.addMarkers()
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                // 创建map实例
                const map = new BMap.Map('map-container', { enableMapClick: false })
                const mapCenterPoint = new BMap.Point(config.iotMonitorMap.center[0], config.iotMonitorMap.center[1]) // 创建点坐标
                map.centerAndZoom(mapCenterPoint, config.iotMonitorMap.zoom) // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true) // 开启鼠标滚动缩放
                // map.setMapStyleV2({ styleJson: mapStyle })
                map.setMapStyle({ styleJson: mapStyle }) // 地图样式
                // 自定义控件类
                function ZoomControl () {
                    // 设置默认停靠位置和偏移量
                    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT
                    this.defaultOffset = new BMap.Size(10, 10)
                }
                ZoomControl.prototype = new BMap.Control()
                ZoomControl.prototype.initialize = function (map) {
                    // 创建一个DOM元素
                    var div = document.createElement('div')
                    // 添加文字说明
                    div.appendChild(document.createTextNode('复位'))
                    // 设置样式
                    div.style.cursor = 'pointer'
                    div.style.border = '1px solid gray'
                    div.style.height = '40px'
                    div.style.lineHeight = '40px'
                    div.style.textAlign = 'center'
                    div.style.width = '40px'
                    div.style.borderRadius = '50%'
                    div.style.backgroundColor = 'rgba(15, 71, 130, 1)'
                    div.style.color = 'white'
                    div.style.fontSize = '12px'
                    // 绑定事件，点击一次放大两级
                    div.onclick = function (e) {
                        map.reset()
                    }
                    // 添加DOM元素到地图中
                    map.getContainer().appendChild(div)
                    // 将DOM元素返回
                    return div
                }
                var myZoomCtrl = new ZoomControl()
                // 添加到地图当中
                map.addControl(myZoomCtrl)
                // 设置标注图标，标记的ICON对象初始化，通过icon类自定义图标
                const iconSize = new BMap.Size(25, 25)
                // Icon(url: String, size: Size, opts: IconOptions)
                fm1IconNormal = new BMap.Icon(config.fm1MarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                fm1IconActive = new BMap.Icon(config.fm1MarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                fm2IconNormal = new BMap.Icon(config.fm2MarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                fm2IconActive = new BMap.Icon(config.fm2MarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                gunIconNormal = new BMap.Icon(config.gunMarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                gunIconActive = new BMap.Icon(config.gunMarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                wfIconNormal = new BMap.Icon(config.wfMarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                wfIconActive = new BMap.Icon(config.wfMarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                sphereIconNormal = new BMap.Icon(config.sphereMarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                sphereIconActive = new BMap.Icon(config.sphereMarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                photoIconNormal = new BMap.Icon(config.photoMarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                photoIconActive = new BMap.Icon(config.photoMarkerImgUrl.active, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                that.map = map
                map.addEventListener('zoomend', function () { // 地图缩放
                    that.markerClusterer.clearMarkers()
                    that.infoWindow = ''
                    that.addMarkers()
                })
                map.addEventListener('moveend', function showInfo () { // 地图拖拽结束
                    that.markerClusterer.clearMarkers()
                    that.addMarkers()
                    that.infoWindow = ''
                })
                var displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i) // 判断是否是其他设备
                that.displayType = displayType
                if (displayType) {
                    map.disableDragging()
                    map.addEventListener("touchmove", function (e) {
                        map.enableDragging()
                    });
                    // TODO: 触摸结束时触发次此事件  此时开启禁止拖动
                    map.addEventListener("touchend", function (e) {
                        map.disableDragging()
                    })
                }
                that.mapReady = true // 准备就绪
                if (that.camera.length != 0) {
                    that.addMarkers()
                }
            })
        },
        methods: {
            // 增加Monitor标记
            addMarkers () {
                const that = this
                const map = that.map
                if (!map) {
                    return
                }
                // 删除所有的Monitor标记
                if (that.markers.length) {
                    that.markers.forEach(item => {
                        map.removeOverlay(item) // 移除标注物
                    })
                }
                if (that.markerClusterer) {
                    //that.map.reset()
                    that.markerClusterer.clearMarkers()
                    that.infoWindow = ''
                    // that.addMarkers()
                }
                that.markers = that.iotDatas.map(item => that.createMarker(item))
                var markerClusterer = new BMapLib.MarkerClusterer(that.map, { markers: that.iotDatas.map(item => that.createMarker(item)),
                maxZoom: 16 })
                that.markerClusterer = markerClusterer
                var mk = markerClusterer._clusters
                that.mk = mk
                var oldmk = []
                for (var i = 0; i < mk.length; i++) {
                    var mCount = mk[i]._markers.length
                    for (var j = 0; j < mk[i]._markers.length; j++) {
                        that.addMarkerCluS(mk[i]._markers[j])
                    }
                    if (mCount < 2) continue
                    var options = []
                    mk[i]._clusterMarker.removeEventListener('mouseover')
                    that.addMarkerClu(mk[i]._center, mk[i]._clusterMarker)
                }
                // that.camera.forEach(item => that.createMarker(item))
                // console.log(that.markers)
                // that.markers.push(that.emVos.forEach(item => that.createMarker(item)))
                // that.markers.push(that.Fm1.map(item => that.createMarker(item)))
                // that.markers.push(that.Fm2.map(item => that.createMarker(item)))
            },
            // 自定义标记点
            addMarkerCluS (marker) {
                var that = this
                marker.addEventListener('click', (e) => {
                    that.doHandlerClickMarker(e.target.self, e.target)
                })
            },
            // 点聚合标记
            addMarkerClu (point, data) {
                let icon = fm1IconActive
                var that = this
                const marker = new BMap.Marker(point)
                var opts = {
                    offset: { width: 10, height: 20 },
                    boxStyle: {
                        width: '220px',
                        padding: '5px',
                        marginBottom: '5px',
                        marginleft: '6px',
                    },
                    closeIconUrl: 'images/icon-wf.png',
                    closeIconMargin: '5px 8px 4px 4px',
                    enableAutoPan: false,
                }
                var content = "<div style='color:white;background:rgba(15, 71, 130, 1);border-radius:5px; padding:10px;box-shadow:0 0 5px rgba(255, 255, 255, 1)'>" +
                                "查看该区域设备" + "<ul class='map-ul'><li class='map-li'><image class='map-image' src='images/icon-wf.png'></image><span>水肥一体化</span></li>" +
                                "<li class='map-li'><image class='map-image' src='images/icon-360.png' /><span>全景摄像头</span></li>" +
                                "<li class='map-li'><image class='map-image' src='images/icon-FM1.png' /><span>监控FM1</span></li>" +
                                "<li class='map-li'><image class='map-image' src='images/icon-gun.png' /><span>普通摄像头</span></li>" +
                                "<li class='map-li'><image class='map-image' src='images/icon-FM2.png' /><span>监控FM2</span></li>" + 
                                "<li class='map-li'><image class='map-image' src='images/icon-sphere.png' /><span>云台摄像头</span></li></ul>"
                                "<div class='info-triangle'></div></div>"
                // that.infoWindow = new BMapLib.InfoBox(that.map, content, opts)
                data.onclick = function () {
                    console.log('1235')
                    if (that.infoWindow) {
                        that.infoWindow.close()
                        const mapCenterPoint = new BMap.Point(marker.point.lng, marker.point.lat) // 创建点坐标
                        that.map.centerAndZoom(mapCenterPoint, 20)
                    }
                }
                data.addEventListener('mouseover', (e) => {
                    that.infoWindow = new BMapLib.InfoBox(that.map, content, opts)
                    that.infoWindow.open(marker)
                        // }
                        // that.map.removeOverlay(that.markers[e.target.self.index])
                        // const tt = e.target.self
                        // tt.isActive = true
                        // const obj1 = that.createMarker(tt)
                        // that.markers.splice(e.target.self.index, 1, obj1)
                        // console.log(that.markers)
                   // }
                })
                // data.onmouseover = function() {
                // console.log(4568)
                // that.infoWindow = new BMapLib.InfoBox(that.map,content, opts);
                // that.infoWindow.open(marker)
                // }
                // data.addEventListener('mouseout', (e) => {
                //     // if (!that.activeIcon) {
                //         console.log(1235)
                //         // that.activeIcon = true
                //         // console.log(that.map.getZoom())
                //         // if(that.map.getZoom() > 18) {
                //             console.log('get info?')
                //             that.infoWindow = new BMapLib.InfoBox(that.map, content, opts)
                //             // that.infoWindow.open(marker)
                //         // }
                //         // that.map.removeOverlay(that.markers[e.target.self.index])
                //         // const tt = e.target.self
                //         // tt.isActive = true
                //         // const obj1 = that.createMarker(tt)
                //         // that.markers.splice(e.target.self.index, 1, obj1)
                //         // console.log(that.markers)
                //     // }
                // })
                data.onmouseout = function() {
                    if (that.infoWindow) {
                        that.infoWindow.close()
                        console.log(that.infoWindow)
                    }
                }
            },
            // 创建标记
            createMarker (data) {
                const that = this
                /* eslint-disable */
                const { address_gislong, address_gislatd, type } = data
                const position = new BMap.Point(address_gislong, address_gislatd)
                let icon = null
                if (type == types.IOT_TYPE_FM1) {
                    icon = data.isActive ? fm1IconActive : fm1IconNormal
                } else if (type == types.IOT_TYPE_FM2) {
                    icon = data.isActive ? fm2IconActive : fm2IconNormal
                } else if (type == types.IOT_TYPE_GUN) {
                    icon = data.isActive ? gunIconActive : gunIconNormal
                } else if (type == types.IOT_TYPE_WF) {
                    icon = data.isActive ? wfIconActive : wfIconNormal
                } else if (type == types.IOT_TYPE_SPHERE) {
                    icon = data.isActive ? sphereIconActive : sphereIconNormal
                } else if (type == types.IOT_TYPE_360) {
                    icon = data.isActive ? photoIconActive : photoIconNormal
                }
                var opts = {
                    offset: {width:10, height:20},
                    boxStyle:{
                        width: "120px",
                        padding: '5px',
                        marginBottom: "5px",
                        marginleft:"6px",
                    },
                    closeIconUrl: 'images/icon-wf.png',
                    closeIconMargin: "5px 8px 4px 4px",
                    enableAutoPan: false,
                }
                var content = "<div style='color:white;background:rgba(15, 71, 130, 1);border-radius:5px; padding:10px;box-shadow:0 0 5px rgba(255, 255, 255, 1)'>" +
                                "查看该设备" +
                                "<div class='info-triangle'></div></div>"
                const marker = new BMap.Marker(position, { icon })
                marker.self = data
                marker.addEventListener('click', (e) => {
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                    that.$store.state[moduleNameSpace].mapSize = true
                    // const mapCenterPoint = new BMap.Point(e.target.self.address_gislong, e.target.self.address_gislatd) // 创建点坐标
                    //that.map.centerAndZoom(mapCenterPoint, 20)
                    //that.addMarkers()
                    that.activeIcon = false
                    that.map.removeOverlay(that.markers[e.target.self.index])
                    const tt = e.target.self
                    tt.isActive = false
                    const obj1 = that.createMarker(tt)
                    that.markers.splice(e.target.self.index, 1, obj1)
                    //that.doHandlerClickMarker(e.target.self, e.target)
                })
                marker.addEventListener('mouseover', (e) => { 
                    if (!that.activeIcon) {
                        that.activeIcon = true
                            that.infoWindow = new BMapLib.InfoBox(that.map,content,opts);
                            that.infoWindow.open(marker)
                    }
                })
                marker.addEventListener('mouseout', (e) => {
                    if(that.infoWindow){
                        that.activeIcon = false
                        that.infoWindow.close()
                    }
                })
                if (data.index == 0) { // 获取第一个标红的标记
                    that.markerActive = marker
                }
                return marker
            },
            // marker标记的点击处理，删除旧标记、旧Active标记，新增新标记、新Active标记
            doHandlerClickMarker (data, marker) {
                const that = this
                const store = that.$store
                if (data.isActive) { // 当前是选中的marker标记
                    return
                }
                if (data.type == types.IOT_TYPE_SPHERE) { // 弹出全景,展示图片
                    store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                        fullStateName: 'photoViewerFullState', state: true
                    })
                    store.commit(`${moduleNameSpace}/${types.IOT_TYPE_OF_DISPLAY}`, {
                        fullStateName: ''
                    })
                    store.dispatch(moduleNameSpace + '/' + types.CHANGE_PHOTO_VIEW_URL, data.em_devid)
                    return
                }
                if (data.type == types.IOT_TYPE_360) {
                    store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                        fullStateName: 'photoViewerFullState', state: true
                    })
                    store.commit(`${moduleNameSpace}/${types.IOT_TYPE_OF_DISPLAY}`, {
                        fullStateName: 'camera'
                    })
                    store.dispatch(moduleNameSpace + '/' + types.GET_360_DATA, data)
                    return
                }
                console.log('here')
                // 其他标记切换active和normal状态
                that.markerClusterer.removeMarker(that.markerActive) // 去除点红的标记
                const markerActive1 = that.markerActive
                markerActive1.self.isActive = false
                that.markerClusterer.addMarker(that.createMarker(markerActive1.self))
                // 标红新的标记
                that.markerClusterer.removeMarker(marker)
                const markerActive = marker
                that.markerActive = markerActive
                markerActive.self.isActive = true
                that.markerClusterer.addMarker(that.createMarker(markerActive.self))
                // const map = that.map
                // const markers = that.markers
                // const currActive = that.currActive
                // let markerId = null
                // let oldData = null
                // let j = 1
                // for (var i = 0; i < markers.length; i++) {
                //     if (markers[i].self.isActive) {
                //         // console.log(markers[0].self.isActive)
                //         j = i
                //     }
                // }
                // oldData = markers[j].self
                // oldData.isActive = false
                // data.isActive = true
                // map.removeOverlay(markers[j])
                // map.removeOverlay(markers[data.index])
                // const obj1 = that.createMarker(oldData)
                // const obj2 = that.createMarker(data)
                // markers.splice(j, 1, obj1)
                // markers.splice(data.index, 1, obj2)
                store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    id: data.index, type: data.type
                })
                if (data.type == types.IOT_TYPE_FM1) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA, data.sno)
                    // store.dispatch(moduleNameSpace + '/' + types.GET_FM1_CHART_DATA)
                } else if (data.type == types.IOT_TYPE_FM2) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, data.sno)
                    // store.dispatch(moduleNameSpace + '/' + types.GET_FM2_CHART_DATA)
                } else if (data.type == types.IOT_TYPE_WF) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_WF_DATA)
                    store.dispatch(moduleNameSpace + '/' + types.GET_WF_CHART_DATA)
                } else if (data.type == types.IOT_TYPE_GUN) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_GUN_DATA, data)
                    // store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                    //     fullStateName: 'photoViewerFullState', state: true
                    // })
                }
            }
        }
    }
</script>
