<template>
    <div class="map-container" id="map-container"></div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'
    import mapStyle from './mapStyleV1'
    import '@/lib/InfoBox_min.js'
import { constants } from 'fs';
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = `$store.state.${moduleNameSpace}.iotDatas`
    const mapSise = `$store.state.${moduleNameSpace}.mapSise`

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
                infoWindow: ''
            }
        },
        computed: {
            ...thisMapState(['iotDatas', 'currActive', 'camera', 'emVos', 'Fm1', 'Fm2'])
        },
        watch: {
            [dataProp] () {
                this.addMarkers()
            },
            [mapSise] () {
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
                that.mapReady = true // 准备就绪
                if (that.camera.length != 0) {
                    console.log(7898)
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
                that.markers = that.iotDatas.map(item => that.createMarker(item))
                // that.camera.forEach(item => that.createMarker(item))
                // console.log(that.markers)
                // that.markers.push(that.emVos.forEach(item => that.createMarker(item)))
                // that.markers.push(that.Fm1.map(item => that.createMarker(item)))
                // that.markers.push(that.Fm2.map(item => that.createMarker(item)))
            },
            // 创建标记
            createMarker (data) {
                const that = this
                /* eslint-disable */
                const { address_gislong, address_gislatd, type } = data
                const position = new BMap.Point(address_gislong, address_gislatd)
                let icon = null
                // let infoWindow = ''
                // console.log(data.isActive)
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
                        width: "240px",
                        padding: '5px',
                        marginBottom: "5px",
                        marginleft:"6px",
                    },
                    closeIconMargin: "5px 8px 4px 4px",
                    closeIconUrl: 'none',
                    enableAutoPan: false,
                }
                var content = "<div style='color:white;background:rgba(15, 71, 130, 1);border-radius:5px;'>" +
                                "查看该区域设备" + "<ul><li><image src='images/360.png'></image><span>水肥一体化</span></li>" +
                                "<li><image src='images/360.png'></image><span>监控FM1</span></li><li><image src='images/360.png'></image><span>监控FM2</span></li></ul>"
                                "<div class='info-triangle'></div></div>"
                const marker = new BMap.Marker(position, { icon })
                that.map.addOverlay(marker) // 向地图添加标注
                marker.self = data
                marker.addEventListener('click', (e) => {
                    that.infoWindow.close()
                    that.$store.state[moduleNameSpace].mapSize = true
                    console.log(that.$store.state)
                    //const mapCenterPoint = new BMap.Point(27.6591, 117.8702) // 创建点坐标
                    // that.map.centerAndZoom(mapCenterPoint, 20)
                    //that.mappanTo(center: Point, opts: PanOptions)
                    //that.addMarkers()
                    that.activeIcon = false
                    that.map.removeOverlay(that.markers[e.target.self.index])
                    const tt = e.target.self
                    tt.isActive = false
                    const obj1 = that.createMarker(tt)
                    that.markers.splice(e.target.self.index, 1, obj1)
                    that.doHandlerClickMarker(e.target.self, e.target)
                })
                marker.addEventListener('mouseover', (e) => {
                    if (!that.activeIcon) {
                        that.activeIcon = true
                        that.infoWindow = new BMapLib.InfoBox(that.map,content,opts);
                        that.infoWindow.open(marker)
                        that.map.removeOverlay(that.markers[e.target.self.index])
                        const tt = e.target.self
                        tt.isActive = true
                        const obj1 = that.createMarker(tt)
                        that.markers.splice(e.target.self.index, 1, obj1)
                        // console.log(that.markers)
                    }
                })
                marker.addEventListener('mouseout', (e) => {
                    if (that.activeIcon && (that.$store.state[moduleNameSpace].currActive.id != e.target.self.index)) {
                        that.infoWindow.close()
                        that.activeIcon = false
                        that.map.removeOverlay(that.markers[e.target.self.index])
                        const tt = e.target.self
                        tt.isActive = false
                        const obj1 = that.createMarker(tt)
                        that.markers.splice(e.target.self.index, 1, obj1)
                    }
                })
                // this.markers.push(marker)
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
                // 其他标记切换active和normal状态
                const map = that.map
                const markers = that.markers
                const currActive = that.currActive
                let markerId = null
                let oldData = null
                let j = 1
                for (var i = 0; i < markers.length; i++) {
                    if (markers[i].self.isActive) {
                        // console.log(markers[0].self.isActive)
                        j = i
                    }
                }
                oldData = markers[j].self
                oldData.isActive = false
                data.isActive = true
                map.removeOverlay(markers[j])
                map.removeOverlay(markers[data.index])
                const obj1 = that.createMarker(oldData)
                const obj2 = that.createMarker(data)
                markers.splice(j, 1, obj1)
                markers.splice(data.index, 1, obj2)
                store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    id: data.index, type: data.type
                })
                // const obj1 = that.createMarker(oldData)
                // const obj2 = that.createMarker(data)
                // that.markers.push(obj1)
                // that.markers.push(obj2)
                // that.markers.map((item,index) => {item.self.index = index})
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
