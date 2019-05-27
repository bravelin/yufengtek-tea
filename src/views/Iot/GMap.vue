<!--google地图-->
<template>
    <div class="map-container" id="map-container">
        <div ref="wrap" class="map-wrap"></div>
        <div class="iconfont map-reset-btn" @click="doResetMap()" title="复位" v-show="showResetBtn">&#xe62f;</div>
    </div>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const modulePrefix = `$store.state.${moduleNameSpace}`
    const dataProp = `${modulePrefix}.iotDatas`

    const iotTypeObj = {
        [types.IOT_TYPE_SPHERE]: '全景摄像头',
        [types.IOT_TYPE_FM1]: 'FM1监控设备',
        [types.IOT_TYPE_FM2]: 'FM2监控设备',
        [types.IOT_TYPE_GUN]: '普通摄像头',
        [types.IOT_TYPE_360]: '云台摄像头'
    }

    export default {
        name: 'ProductionMonitorGMap',
        data () {
            return {
                map: null,
                markers: [], // 标记对象
                markerCluster: null, // 聚合对象
                showResetBtn: false, // 控制复位按钮的显示
                centerPosition: [0, 0]
            }
        },
        computed: {
            ...thisMapState(['currVisibleIotType', 'currActive']),
            ...mapState(['userRole']),
            iotDatas () {
                const that = this
                return that.$store.state[moduleNameSpace].iotDatas.filter(item => item.show)
            }
        },
        watch: {
            [dataProp] () {
                this.addMarkers()
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
            })
            document.body.addEventListener('click', that.handlePageClick)
        },
        methods: {
            init () {
                const that = this
                const mapCenterPoint = new google.maps.LatLng(config.iotMonitorMap.center[1], config.iotMonitorMap.center[0]) // 创建点坐标
                that.map = new google.maps.Map(that.$refs.wrap, {
                    center: mapCenterPoint,
                    zoom: config.iotMonitorMap.zoom,
                    maxZoom: 20,
                    mapTypeId: 'hybrid',
                    gestureHandling: 'greedy',
                    keyboardShortcuts: false,
                    styles: [
                        {
                            elementType: 'labels.icon', // 将所有默认标记去除
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                })
                that.map.addListener('zoom_changed', () => {
                    that.doRefreshTips()
                })
                that.map.addListener('center_changed', () => {
                    that.doRefreshTips()
                })
                if (that.iotDatas.length) {
                    that.addMarkers()
                }
            },
            doRefreshTips () {
                const that = this
                that.showResetBtn = true
                setTimeout(() => { that.refreshMarkerTips() }, 1000)
                setTimeout(() => { that.refreshMarkerTips() }, 3000)
            },
            // 在地图上添加标记
            addMarkers () {
                const that = this
                if (that.markerCluster) {
                    that.markerCluster.clearMarkers()
                }
                that.deleteAllMarkers()
                // 计算中心点
                let totalX = 0
                let totalY = 0
                let tempValue = 0
                that.iotDatas.forEach(item => {
                    if (item.address_gislong < item.address_gislatd) {
                        tempValue = item.address_gislatd
                        item.address_gislatd = item.address_gislong
                        item.address_gislong = tempValue
                    }
                    totalX += item.address_gislong
                    totalY += item.address_gislatd
                    that.markers.push(that.createMarker(item))
                })
                if (that.centerPosition[0] == 0) {
                    that.centerPosition[0] = totalX / that.iotDatas.length
                    that.centerPosition[1] = totalY / that.iotDatas.length
                    that.doResetMap()
                }
                that.markerCluster = new MarkerClusterer(that.map, that.markers, {
                    gridSize: 30, maxZoom: 16
                })
                setTimeout(() => { that.refreshMarkerTips() }, 3000)
            },
            // 创建标记
            createMarker (marker) {
                const that = this
                const markerType = marker.type
                const lat = marker.address_gislatd
                const lng = marker.address_gislong
                const isActive = marker.isActive
                const icon = that.getMarkerIcon(markerType, isActive)
                const iotName = marker.camera_name || marker.name || ''
                const mapMarker = new google.maps.Marker({
                    position: { lat, lng },
                    draggable: that.userRole == '2',
                    map: marker.show ? that.map : null,
                    icon,
                    title: markerType + (iotName ? ` ${iotName}` : '')
                })
                mapMarker.iot_index = marker.index
                // 点击响应
                mapMarker.addListener('click', () => {
                    if (!marker.isActive) {
                        that.doHandlerClickMarker(marker)
                    }
                })
                // 拖动，改变位置
                if (that.userRole == '2') {
                    mapMarker.addListener('dragend', (e) => {
                        // console.log('drag end....', marker, e.latLng.lat(), e.latLng.lng())
                        const sno = marker.sno || marker.camera_sno || marker.em_devid
                        let type = ''
                        if (marker.type == types.IOT_TYPE_GUN || marker.type == types.IOT_TYPE_360) {
                            type = 'camera'
                        } else if (marker.type == types.IOT_TYPE_SPHERE) {
                            type = 'em'
                        } else if (marker.type == types.IOT_TYPE_FM1) {
                            type = 'fm1'
                        } else if (marker.type == types.IOT_TYPE_FM2) {
                            type = 'fm2'
                        }
                        if (sno && type) {
                            that.$ajax({
                                url: '/data/momitor/updateLocation',
                                method: 'post',
                                data: { sno, type, address_gislong: e.latLng.lng(), address_gislatd: e.latLng.lat() }
                            }).then(res => {
                                if (res.code == 200) {
                                    that.$store.commit(types.SWITCH_MESSAGE_TIP, { tip: '设备位置修改成功！', show: true })
                                }
                            })
                        }
                    })
                }
                return mapMarker
            },
            // 处理点击标记事件
            doHandlerClickMarker (iotObj) {
                const that = this
                const store = that.$store
                if (!iotObj.isActive) {
                    const type = iotObj.type
                    if (type == types.IOT_TYPE_SPHERE) { // 弹出全景,展示图片
                        store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, { fullStateName: 'photoViewerFullState', state: true })
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_PHOTO_VIEW_URL, iotObj.em_devid)
                    } else if (type == types.IOT_TYPE_360) { // 360视频
                        store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, { fullStateName: 'camera360FullState', state: true })
                        store.commit(moduleNameSpace + '/' + types.GET_360_DATA, iotObj)
                    } else {
                        // 其他类型标记切换active和normal状态
                        const oldIndex = that.currActive.index
                        const oldActiveMarker = that.markers[oldIndex]
                        const oldActiveIotObj = that.iotDatas[oldIndex]
                        if (oldActiveMarker) {
                            const icon = that.getMarkerIcon(oldActiveIotObj.type, false)
                            oldActiveMarker.setIcon(icon)
                        }
                        const marker = that.markers[iotObj.index]
                        if (marker) {
                            const icon = that.getMarkerIcon(iotObj.type, true)
                            marker.setIcon(icon)
                        }
                        store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, { index: iotObj.index, type })
                        if (type == types.IOT_TYPE_FM1) {
                            store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA, { sno: iotObj.sno, iotName: iotObj.name })
                        } else if (iotObj.type == types.IOT_TYPE_FM2) {
                            store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA, { sno: iotObj.sno, iotName: iotObj.name })
                        } else if (iotObj.type == types.IOT_TYPE_GUN) {
                            store.commit(moduleNameSpace + '/' + types.GET_GUN_DATA, iotObj)
                        }
                    }
                    that.doRefreshTips()
                }
            },
            // 获取标记的
            getMarkerIcon (markerType, isActive) {
                let icon = ''
                if (markerType == types.IOT_TYPE_SPHERE) {
                    icon = config.sphereMarkerImgUrl[isActive ? 'active' : 'normal']
                } else if (markerType == types.IOT_TYPE_FM1) {
                    icon = config.fm1MarkerImgUrl[isActive ? 'active' : 'normal']
                } else if (markerType == types.IOT_TYPE_GUN) {
                    icon = config.gunMarkerImgUrl[isActive ? 'active' : 'normal']
                } else if (markerType == types.IOT_TYPE_FM2) {
                    icon = config.fm2MarkerImgUrl[isActive ? 'active' : 'normal']
                } else if (markerType == types.IOT_TYPE_360) {
                    icon = config.photoMarkerImgUrl[isActive ? 'active' : 'normal']
                }
                return icon
            },
            // 删除所有标记
            deleteAllMarkers () {
                const that = this
                if (that.markers.length) {
                    that.markers.forEach(item => item.setMap(null))
                    that.markers = []
                }
            },
            // 更新marker标记的tip
            refreshMarkerTips () {
                const markerDivs = [...document.querySelectorAll('div[data-title^=IOT]'), ...document.querySelectorAll('div[title^=IOT]')]
                let div = null
                let type = ''
                let titleStr = ''
                markerDivs.forEach(dom => {
                    if (!dom.querySelector('div')) { // 创建tip DOM
                        titleStr = dom.getAttribute('title').split(' ')
                        type = titleStr[0]
                        dom.style.overflow = 'visible'
                        dom.setAttribute('data-title', type)
                        const div = document.createElement('div')
                        div.style.background = 'rgba(12, 24, 56, 0.9)'
                        div.style.position = 'absolute'
                        if (titleStr.length > 1) {
                            div.innerHTML = titleStr[1] + `(${iotTypeObj[type]})`
                        } else {
                            div.innerHTML = '查看该' + iotTypeObj[type]
                        }
                        dom.appendChild(div)
                        dom.removeAttribute('title')
                    } else {
                        dom.removeAttribute('title')
                    }
                })
            },
            // 页面点击事件处理
            handlePageClick (e) {
                const that = this
                const target = e.target
                if (target && target.classList.contains('google-cluster-tip')) {
                    let iotIndex = target.getAttribute('data-iot-index')
                    if (iotIndex != undefined && iotIndex != null) {
                        const clickMarkerData = that.iotDatas[iotIndex - 0]
                        clickMarkerData && that.doHandlerClickMarker(clickMarkerData)
                    }
                }
            },
            // 复位地图至初始的中心点和缩放比例
            doResetMap () {
                const that = this
                if (that.map) {
                    let x = that.centerPosition[0] || config.iotMonitorMap.center[0]
                    let y = that.centerPosition[1] || config.iotMonitorMap.center[1]
                    const mapCenterPoint = new google.maps.LatLng(y, x) // 中心点
                    that.map.setOptions({
                        center: mapCenterPoint,
                        zoom: config.iotMonitorMap.zoom
                    })
                    that.showResetBtn = false
                }
            },
        },
        beforeDestroy () {
            const that = this
            document.body.removeEventListener('click', that.handlePageClick)
        }
    }
</script>
