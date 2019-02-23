<template>
    <div class="map-container"></div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import config from '@/lib/config'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fmsDataProp = `$store.state.${moduleNameSpace}.fms`
    const monitorDataProp = `$store.state.${moduleNameSpace}.monitors`

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
                const map = new AMap.Map(that.$el, {
                    zoom: config.iotMonitorMap.zoom,
                    center: config.iotMonitorMap.center,
                    mapStyle: config.mapStyle, // 设置地图的显示样式
                    viewMode: '2D', // 设置地图模式
                    lang: 'zh_cn' // 设置地图语言类型
                })
                map.on('complete', () => {
                    that.mapReady = true
                    that.map = map
                    if (that.mapMonitorMarkers.length == 0) {
                        if (that.monitors.length) {
                            that.addMonitorMarkers()
                        }
                        if (that.fms.length) {
                            that.addFmMarkers()
                        }
                    }
                })
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
                map.remove(that.mapMonitorMarkers)
                that.mapMonitorMarkers = that.monitors.map(item => that.createMarker(item))
                map.add(that.mapMonitorMarkers)
            },
            // 增加fm标记
            addFmMarkers () {
                const that = this
                const map = that.map
                if (!map) {
                    return
                }
                map.remove(that.mapFmMarkers)
                that.mapFmMarkers = that.fms.map(item => that.createMarker(item))
                map.add(that.mapFmMarkers)
            },
            // 创建标记
            createMarker (data) {
                const that = this
                const { name, lng, lat, id, type } = data
                const position = new AMap.LngLat(lng, lat)
                let imageUrl = ''
                if (type == 'mn') {
                    imageUrl = data.isActive ? config.monitorMarkerImgUrl.active : config.monitorMarkerImgUrl.normal
                } else if (type == 'fm') {
                    imageUrl = data.isActive ? config.fmMarkerImgUrl.active : config.fmMarkerImgUrl.normal
                }
                const marker = new AMap.Marker({
                    position,
                    offset: new AMap.Pixel(-11, -22),
                    icon: imageUrl,
                    title: name,
                    zoom: 13
                })
                marker.self = data
                marker.on('click', (e) => {
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
                        map.remove(oldActiveMarker)
                        break
                    }
                }
                const newActiveMarkerObjs = data.type == 'mn' ? that.mapMonitorMarkers : that.mapFmMarkers
                const newActiveMarkerDatas = data.type == 'mn' ? that.monitors : that.fms
                for (let j = 0; j < newActiveMarkerObjs.length; j++) {
                    if (newActiveMarkerObjs[j].self.id == data.id) {
                        newActiveMarkerObjs.splice(j, 1)
                        map.remove(marker)
                        break
                    }
                }
                that.$store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    index: data.index,
                    type: data.type
                })
                const obj1 = that.createMarker(oldActiveMarkerData)
                const obj2 = that.createMarker(data)
                map.add(obj1)
                map.add(obj2)
                oldActiveMarkerObjs.push(obj1)
                newActiveMarkerObjs.push(obj2)
            }
        }
    }
</script>
