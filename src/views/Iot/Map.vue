<template>
    <div class="map-container" id="map-container"></div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'
    import mapStyle from './mapStyleV1'
    import '@/lib/MarkerClusterer_min'
    import '@/lib/TextIconOverlay_min'
    import ZoomControl from './zoomControl'

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
                markers: [], // 标记
                activeIcon: false,
                otherActive: false,
                infoWindow: '',
                markerClusterer: '', // 是否被聚合
                mk: '', // 聚合的标记
                markerActive: '', // 选中的标记
                timer: '',
                activeLabel: true
            }
        },
        computed: {
            ...thisMapState(['iotDatas', 'currActive', 'camera', 'emVos'])
        },
        watch: {
            [dataProp] () {
                this.addMarkers()
                this.map.reset()
            },
            [mapSiseProp] () {
                this.addMarkers()
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                // 创建map实例
                const map = new BMap.Map('map-container', { enableMapClick: false }) // 禁止弹出风景名胜弹框
                const mapCenterPoint = new BMap.Point(config.iotMonitorMap.center[0], config.iotMonitorMap.center[1]) // 创建点坐标
                map.centerAndZoom(mapCenterPoint, config.iotMonitorMap.zoom) // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true) // 开启鼠标滚动缩放
                // map.setMapStyleV2({ styleJson: mapStyle })
                map.setMapStyle({ styleJson: mapStyle }) // 地图样式
                const myZoomCtrl = new ZoomControl(map)
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
                map.addEventListener('zoomend', function () { // 地图缩放清除所有聚合标记同时重新绘制
                    that.markerClusterer.clearMarkers()
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                    that.addMarkers()
                })
                map.addEventListener('moveend', () => { // 地图拖拽结束
                    that.markerClusterer.clearMarkers()
                    that.addMarkers()
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                })
                let displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i) // 判断是否是其他设备
                if (displayType) { // 移动端必须禁止拖拽移动才能触发点击事件
                    map.disableDragging()
                    map.addEventListener('touchmove', function (e) {
                        map.enableDragging()
                    })
                    // TODO: 触摸结束时触发次此事件  此时开启禁止拖动
                    map.addEventListener('touchend', function (e) {
                        map.disableDragging()
                    })
                }
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
                // if (that.markers.length) {
                //     that.markers.forEach(item => {
                //         map.removeOverlay(item) // 移除标注物
                //     })
                // }
                if (that.markerClusterer) {
                    // 清除
                    const mk = that.markerClusterer._clusters
                    for (var i = 0; i < mk.length; i++) {
                        mk[i]._clusterMarker.removeEventListener('mouseover')
                    }
                    that.markerClusterer.clearMarkers()
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                }
                that.markers = that.iotDatas.map(item => that.createMarker(item))
                // 将所有的图标聚合，自动生成marker标记，可直接用marker方法
                const markerClusterer = new BMapLib.MarkerClusterer(that.map, { markers: that.iotDatas.map(item => that.createMarker(item)), maxZoom: 16 })
                that.markerClusterer = markerClusterer
                const mk = markerClusterer._clusters
                that.mk = mk
                const oldmk = []
                let mCount
                let options
                console.log(mk)
                for (let i = 0; i < mk.length; i++) {
                    mCount = mk[i]._markers.length
                    if (mCount < 2) {
                        continue
                    }
                    options = []
                    mk[i]._clusterMarker.removeEventListener('mouseover')
                    that.addMarkerClu(mk[i]._center, mk[i]._clusterMarker, mk[i]._markers, i + 1)
                }
            },
            // 点聚合标记
            addMarkerClu (point, data, sMarkers, num) {
                const that = this
                let icon = fm1IconActive
                const marker = new BMap.Marker(point)
                let opts = {
                    offset: { width: 10, height: 0 },
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
                let showLabel1 = false
                let showLabel2 = false
                let showLabel3 = false
                let showLabel4 = false
                let showLabel5 = false
                let showLabel6 = false
                for (let k = 0; k < sMarkers.length; k++) {
                    switch (sMarkers[k].self.type) {
                        case 'IOT_TYPE_WF':
                            showLabel1 = true
                            break
                        case 'IOT_TYPE_SPHERE':
                            showLabel2 = true
                            break
                        case 'IOT_TYPE_FM1':
                            showLabel3 = true
                            break
                        case 'IOT_TYPE_GUN':
                            showLabel4 = true
                            break
                        case 'IOT_TYPE_FM2':
                            showLabel5 = true
                            break
                        case 'IOT_TYPE_360':
                            showLabel6 = true
                            break
                    }
                }
                const content = `<div class='boxContent' id='boxs_${num}'>
                                    查看该区域设备
                                    <ul class='map-ul'>
                                        ${showLabel1 ? `<li class='map-li' id='label1_${num}' :class='activeLabel:${this.activeLabel}'><image class='map-image' src='images/icon-wf.png'></image><span>水肥一体化</span></li>` : ''}
                                        ${showLabel2 ? `<li class='map-li' id='label2_${num}'><image class='map-image' src='images/icon-sphere.png'></image><span>全景摄像头</span></li>` : ''}
                                        ${showLabel3 ? `<li class='map-li' id='label3_${num}'><image class='map-image' src='images/icon-FM1.png'></image><span>监控FM1</span></li>` : ''}
                                        ${showLabel4 ? `<li class='map-li' id='label4_${num}'><image class='map-image' src='images/icon-gun.png'></image><span>普通摄像头</span></li>` : ''}
                                        ${showLabel5 ? `<li class='map-li' id='label5_${num}'><image class='map-image' src='images/icon-FM2.png'></image><span>监控FM2</span></li>` : ''}
                                        ${showLabel6 ? `<li class='map-li' id='label6_${num}'><image class='map-image' src='images/icon-360.png'></image><span>云台摄像头</span></li>` : ''}
                                    </ul>
                                </div>
                                <div class='boxStri'></div>`
                data.onclick = function () {
                    if (that.infoWindow) {
                        that.infoWindow.close()
                        that.activeIcon = false
                        const mapCenterPoint = new BMap.Point(marker.point.lng, marker.point.lat) // 创建点坐标
                        that.map.centerAndZoom(mapCenterPoint, 20)
                    }
                }
                data.addEventListener('mouseover', (e) => {
                    if (that.infoWindow) {
                       that.infoWindow.close()
                    }
                    clearTimeout(that.timer)
                    if (!that.activeIcon) {
                        that.infoWindow = new BMapLib.InfoBox(that.map, content, opts)
                        that.infoWindow.open(marker)
                        that.activeIcon = true
                        document.getElementById('boxs_' + num).addEventListener('mouseover', (e) => {
                            that.otherActive = false
                            if (!that.otherActive) {
                                that.otherActive = true
                            }
                        })
                        document.getElementById('boxs_' + num).addEventListener('mouseleave', (e) => {
                            if (that.otherActive) {
                                if (that.infoWindow) {
                                    that.infoWindow.close()
                                }
                                that.otherActive = false
                            }
                        })
                        if (showLabel1) {
                            document.getElementById('label1_' + num).addEventListener('click', (e) => {
                            })
                        }
                        if (showLabel2) {
                            // document.getElementById('label2_' + num).addEventListener('click', that.showInfo(sMarkers, 'IOT_TYPE_SPHERE'), false)
                            document.getElementById('label2_' + num).addEventListener('click', (e) => {
                                that.showInfo(sMarkers, 'IOT_TYPE_SPHERE')
                            })
                            document.getElementById('label2_' + num).addEventListener('mouseover', (e) => {
                                document.getElementById('label2_' + num).className = 'map-li activeLabel'
                            })
                            document.getElementById('label2_' + num).addEventListener('mouseleave', (e) => {
                                document.getElementById('label2_' + num).classList.remove('activeLabel')
                            })
                        }
                        if (showLabel3) {
                            document.getElementById('label3_' + num).addEventListener('click', (e) => {
                                that.showInfo(sMarkers, 'IOT_TYPE_FM1')
                            })
                            document.getElementById('label3_' + num).addEventListener('mouseover', (e) => {
                                document.getElementById('label3_' + num).className = 'map-li activeLabel'
                            })
                            document.getElementById('label3_' + num).addEventListener('mouseleave', (e) => {
                                document.getElementById('label3_' + num).classList.remove('activeLabel')
                            })
                        }
                        if (showLabel4) {
                            document.getElementById('label4_' + num).addEventListener('click', (e) => {
                                that.showInfo(sMarkers, 'IOT_TYPE_GUN')
                            })
                            document.getElementById('label4_' + num).addEventListener('mouseover', (e) => {
                                document.getElementById('label4_' + num).className = 'map-li activeLabel'
                            })
                            document.getElementById('label4_' + num).addEventListener('mouseleave', (e) => {
                                document.getElementById('label4_' + num).classList.remove('activeLabel')
                            })
                        }
                        if (showLabel5) {
                            document.getElementById('label5_' + num).addEventListener('click', (e) => {
                                that.showInfo(sMarkers, 'IOT_TYPE_FM2')
                            })
                            document.getElementById('label5_' + num).addEventListener('mouseover', (e) => {
                                document.getElementById('label5_' + num).className = 'map-li activeLabel'
                            })
                            document.getElementById('label5_' + num).addEventListener('mouseleave', (e) => {
                                document.getElementById('label5_' + num).classList.remove('activeLabel')
                            })
                        }
                        if (showLabel6) {
                            document.getElementById('label6_' + num).addEventListener('click', (e) => {
                                that.showInfo(sMarkers, 'IOT_TYPE_360')
                            })
                            document.getElementById('label6_' + num).addEventListener('mouseover', (e) => {
                                document.getElementById('label6_' + num).className = 'map-li activeLabel'
                            })
                            document.getElementById('label6_' + num).addEventListener('mouseleave', (e) => {
                                document.getElementById('label6_' + num).classList.remove('activeLabel')
                            })
                        }
                    }
                })
                data.onmouseout = function () {
                    that.timer = setTimeout(() => {
                        if (!that.otherActive && that.infoWindow) {
                            that.infoWindow.close()
                        }
                    }, 300)
                    if (that.activeIcon) {
                        that.activeIcon = false
                    }
                }
            },
            // 点击放大，选择
            showInfo (data, type) {
                const that = this
                that.otherActive = false
                for (let k = 0; k < data.length; k++) {
                    if (data[k].self.type == type) {
                        const log = data[k].self.address_gislong
                        const lat = data[k].self.address_gislatd
                        if (!data[k].self.isActive) {
                            that.doHandlerClickMarker(data[k].self, data[k]) // 标红选中的第一个
                        }
                        that.infoWindow.close()
                        const mapCenterPoint = new BMap.Point(log, lat) // 创建点坐标
                        that.map.centerAndZoom(mapCenterPoint, 20)
                        break
                    }
                }
            },
            // 创建标记
            createMarker (data) {
                const that = this
                let tip = ''
                switch (data.type) {
                    case 'IOT_TYPE_WF':
                        tip = '水肥一体化'
                        break
                    case 'IOT_TYPE_SPHERE':
                        tip = '全景摄像头'
                        break
                    case 'IOT_TYPE_FM1':
                        tip = '监控FM1'
                        break
                    case 'IOT_TYPE_GUN':
                        tip = '普通摄像头'
                        break
                    case 'IOT_TYPE_FM2':
                        tip = '监控FM2'
                        break
                    case 'IOT_TYPE_360':
                        tip = '云台摄像头'
                        break
                }
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
                let opts = {
                    offset: { width: 10, height: 20 },
                    boxStyle: {
                        width: '120px',
                        padding: '5px',
                        marginBottom: '5px',
                        marginleft: '6px',
                    },
                    closeIconUrl: 'images/icon-wf.png',
                    closeIconMargin: '5px 8px 4px 4px',
                    enableAutoPan: false,
                }
                let content = `<div class="map-info-tip">查看该${tip}<div class='info-triangle'></div></div>`
                const marker = new BMap.Marker(position, { icon })
                marker.self = data
                marker.addEventListener('click', (e) => {
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                    if (!e.target.self.isActive) {
                        that.doHandlerClickMarker(e.target.self, e.target)
                    }
                })
                marker.addEventListener('mouseover', (e) => {
                    clearTimeout(that.timer)
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                    if (!e.target.self.isActive) {
                        /* eslint-disable */
                        that.infoWindow = new BMapLib.InfoBox(that.map, content, opts)
                        that.infoWindow.open(marker)
                    }
                })
                marker.addEventListener('mouseout', (e) => {
                    if (that.infoWindow) {
                        that.infoWindow.close()
                    }
                })
                if (data.isActive) { // 获取第一个标红的标记
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
                    store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, { fullStateName: 'photoViewerFullState', state: true })
                    store.dispatch(moduleNameSpace + '/' + types.CHANGE_PHOTO_VIEW_URL, data.em_devid)
                } else if (data.type == types.IOT_TYPE_360) { // 360视频
                    store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, { fullStateName: 'camera360FullState', state: true })
                    store.dispatch(moduleNameSpace + '/' + types.GET_360_DATA, data)
                } else {
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
                    const mk = that.markerClusterer._clusters
                    that.mk = mk
                    let mCount
                    for (let i = 0; i < mk.length; i++) {
                        mCount = mk[i]._markers.length
                        if (mCount < 2) {
                            continue
                        }
                        mk[i]._clusterMarker.removeEventListener('mouseover')
                        that.addMarkerClu(mk[i]._center, mk[i]._clusterMarker, mk[i]._markers, i + 1)
                    }
                    store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, { id: data.index, type: data.type })
                    if (data.type == types.IOT_TYPE_FM1) {
                        store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA, data.sno)
                    } else if (data.type == types.IOT_TYPE_FM2) {
                        store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, data.sno)
                    } else if (data.type == types.IOT_TYPE_GUN) {
                        store.dispatch(moduleNameSpace + '/' + types.GET_GUN_DATA, data)
                    }
                }
            }
        }
    }
</script>
