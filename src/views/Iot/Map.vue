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
    const fmsDataProp = `$store.state.${moduleNameSpace}.fms`
    const monitorDataProp = `$store.state.${moduleNameSpace}.monitors`

    let fmIconNormal = null
    let fmIconActive = null
    let cameraIconNormal = null
    let cameraIconActive = null

    export default {
        name: 'ProductionMonitorMap',
        data () {
            return {
                map: null,
                mapReady: false,
                mapMonitorMarkers: [], // monitor标记
                mapFmMarkers: [] // fm标记
            }
        },
        computed: {
            ...thisMapState(['monitors', 'fms', 'currActive'])
        },
        watch: {
            [fmsDataProp] () {
                this.addFmMarkers()
            },
            [monitorDataProp] () {
                this.addMonitorMarkers()
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
                fmIconNormal = new BMap.Icon(config.fmMarkerImgUrl.normal, new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                fmIconActive = new BMap.Icon(config.fmMarkerImgUrl.active, new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                cameraIconNormal = new BMap.Icon(config.monitorMarkerImgUrl.normal, new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })
                cameraIconActive = new BMap.Icon(config.monitorMarkerImgUrl.active, new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, 0)
                })

                that.map = map
                that.mapReady = true
                if (that.mapMonitorMarkers.length == 0) {
                    if (that.monitors.length) {
                        that.addMonitorMarkers()
                    }
                    if (that.fms.length) {
                        that.addFmMarkers()
                    }
                }
            })
        },
        methods: {
            // 增加Monitor标记
            addMonitorMarkers () {
                const that = this
                const map = that.map
                if (!map) {
                    return
                }
                // 删除所有的Monitor标记
                if (that.mapMonitorMarkers.length) {
                    that.mapMonitorMarkers.forEach(item => {
                        map.removeOverlay(item)
                    })
                }
                that.mapMonitorMarkers = that.monitors.map(item => that.createMarker(item))
            },
            // 增加fm标记
            addFmMarkers () {
                const that = this
                const map = that.map
                if (!map) {
                    return
                }
                // 删除所有的fm标记
                if (that.mapFmMarkers.length) {
                    that.mapFmMarkers.forEach(item => {
                        map.removeOverlay(item)
                    })
                }
                that.mapFmMarkers = that.fms.map(item => that.createMarker(item))
            },
            // 创建标记
            createMarker (data) {
                const that = this
                const { name, lng, lat, id, type } = data
                const position = new BMap.Point(lng, lat)
                let icon = null
                if (type == 'mn') {
                    icon = data.isActive ? cameraIconActive : cameraIconNormal
                } else if (type == 'fm') {
                    icon = data.isActive ? fmIconActive : fmIconNormal
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
                if (data.isActive) { // 当前是选中的marker标记
                    return
                }
                const map = that.map
                const oldActiveObj = that.currActive
                const oldActiveMarkerObjs = oldActiveObj.type == 'mn' ? that.mapMonitorMarkers : that.mapFmMarkers
                const oldActiveMarkerDatas = oldActiveObj.type == 'mn' ? that.monitors : that.fms
                const oldActiveMarkerData = oldActiveMarkerDatas[oldActiveObj.index]
                let oldActiveMarker = null
                for (let i = 0; i < oldActiveMarkerObjs.length; i++) {
                    if (oldActiveMarkerObjs[i].self.id == oldActiveMarkerData.id) {
                        oldActiveMarker = oldActiveMarkerObjs[i]
                        oldActiveMarkerObjs.splice(i, 1)
                        map.removeOverlay(oldActiveMarker)
                        break
                    }
                }
                const newActiveMarkerObjs = data.type == 'mn' ? that.mapMonitorMarkers : that.mapFmMarkers
                const newActiveMarkerDatas = data.type == 'mn' ? that.monitors : that.fms
                for (let j = 0; j < newActiveMarkerObjs.length; j++) {
                    if (newActiveMarkerObjs[j].self.id == data.id) {
                        newActiveMarkerObjs.splice(j, 1)
                        map.removeOverlay(marker)
                        break
                    }
                }
                that.$store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    index: data.index,
                    type: data.type
                })
                const obj1 = that.createMarker(oldActiveMarkerData)
                const obj2 = that.createMarker(data)
                oldActiveMarkerObjs.push(obj1)
                newActiveMarkerObjs.push(obj2)
            }
        }
    }
</script>
