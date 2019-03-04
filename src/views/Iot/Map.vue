<template>
    <div class="map-container" id="map-container"></div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'
    import mapStyle from './mapStyleV1'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = `$store.state.${moduleNameSpace}.iotDatas`

    let fm1IconNormal = null
    let fm1IconActive = null
    let fm2IconNormal = null
    let fm2IconActive = null
    let gunIconNormal = null
    let gunIconActive = null
    let wfIconNormal = null
    let wfIconActive = null
    let sphereIconNormal = null
    let photoIconNormal = null

    export default {
        name: 'ProductionMonitorMap',
        data () {
            return {
                map: null,
                mapReady: false,
                markers: [], // 标记
            }
        },
        computed: {
            ...thisMapState(['iotDatas', 'currActive'])
        },
        watch: {
            [dataProp] () {
                this.addMarkers()
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const map = new BMap.Map('map-container')
                const mapCenterPoint = new BMap.Point(config.iotMonitorMap.center[0], config.iotMonitorMap.center[1])
                map.centerAndZoom(mapCenterPoint, config.iotMonitorMap.zoom)
                map.enableScrollWheelZoom(true)
                // map.setMapStyleV2({ styleJson: mapStyle })
                map.setMapStyle({ styleJson: mapStyle })

                // 标记的ICON对象初始化
                const iconSize = new BMap.Size(25, 25)
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
                photoIconNormal = new BMap.Icon(config.photoMarkerImgUrl.normal, iconSize, {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                that.map = map
                that.mapReady = true
                if (that.iotDatas.length != 0) {
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
                        map.removeOverlay(item)
                    })
                }
                that.markers = that.iotDatas.map(item => that.createMarker(item))
            },
            // 创建标记
            createMarker (data) {
                const that = this
                const { lng, lat, id, type } = data
                const position = new BMap.Point(lng, lat)
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
                    icon = sphereIconNormal
                } else if (type == types.IOT_TYPE_360) {
                    icon = photoIconNormal
                }
                const marker = new BMap.Marker(position, { icon })
                that.map.addOverlay(marker)
                marker.self = data
                marker.addEventListener('click', (e) => {
                    that.doHandlerClickMarker(e.target.self, e.target)
                })
                return marker
            },
            // marker标记的点击处理，删除旧标记、旧Active标记，新增新标记、新Active标记
            doHandlerClickMarker (data, marker) {
                const that = this
                const store = that.$store
                if (data.isActive) { // 当前是选中的marker标记
                    return
                }
                if (data.type == types.IOT_TYPE_SPHERE || data.type == types.IOT_TYPE_360) { // 弹出全景
                    store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                        fullStateName: 'photoViewerFullState', state: true
                    })
                    store.commit(moduleNameSpace + '/' + types.CHANGE_PHOTO_VIEW_URL, data.photoViewUrl)
                    return
                }
                // 其他标记切换active和normal状态
                const map = that.map
                const markers = that.markers
                const currActive = that.currActive
                let markerId = null
                let oldData = null
                for (let i = 0; i < markers.length;) {
                    markerId = markers[i].self.id
                    if (markerId == currActive.id || markerId == data.id) {
                        if (markerId == currActive.id) {
                            oldData = markers[i].self
                        }
                        map.removeOverlay(markers[i])
                        markers.splice(i, 1)
                    } else {
                        i++
                    }
                }
                store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    id: data.id, type: data.type
                })
                const obj1 = that.createMarker(oldData)
                const obj2 = that.createMarker(data)
                that.markers.push(obj1)
                that.markers.push(obj2)
                if (data.type == types.IOT_TYPE_FM1) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM1_DATA)
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM1_CHART_DATA)
                } else if (data.type == types.IOT_TYPE_FM2) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM2_DATA)
                    store.dispatch(moduleNameSpace + '/' + types.GET_FM2_CHART_DATA)
                } else if (data.type == types.IOT_TYPE_WF) {
                    store.dispatch(moduleNameSpace + '/' + types.GET_WF_DATA)
                    store.dispatch(moduleNameSpace + '/' + types.GET_WF_CHART_DATA)
                }
            }
        }
    }
</script>
