<template>
    <Plane class="photo-viewer" :full="photoViewerFullState">
        <PlaneTitle>全景图</PlaneTitle>
        <div class="plane-content" ref="container"></div>
        <PlaneTools :full="photoViewerFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import PhotoSphereViewer from 'photo-sphere-viewer'

    const moduleNameSpace = ns.IOT
    const fullProp = 'photoViewerFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const viewUrlProp = `$store.state.${moduleNameSpace}.photoViewUrl`

    export default {
        name: 'iot-photo-viewer',
        computed: {
            ...thisMapState(['photoViewerFullState', 'photoViewUrl', 'currActive'])
        },
        watch: {
            [viewUrlProp] (val, oldval) {
                if (oldval == '') {
                    clearTimeout(this.timer)
                    this.init()
                } else {
                    this.doRefresh()
                }
            }
        },
        data () {
            return {
                container: null,
                viewer: null,
                timer: null
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.container = that.$refs.container
                that.init()
            })
        },
        methods: {
            init () {
                const that = this
                const elStyle = getComputedStyle(that.container, null)
                const w = parseInt(elStyle.width)
                const h = parseInt(elStyle.height)
                if (isNaN(w) || isNaN(h)) { // 未获取到尺寸，1s之后重新获取
                    that.timer = setTimeout(() => { that.init() }, 1000)
                } else if (that.photoViewUrl) {
                    that.viewer = new PhotoSphereViewer({
                        panorama: that.photoViewUrl,
                        container: that.container,
                        time_anim: false,
                        navbar: ['autorotate', 'zoom', 'download', 'gyroscope', 'stereo', 'fullscreen'],
                        default_fov: 90,
                        anim_speed: '0.8rpm'
                    })
                }
            },
            doRefresh () {
                const that = this
                const store = that.$store
                if (that.viewer) {
                    that.viewer.setPanorama(that.photoViewUrl)
                }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp, state: payload
                })
            }
        }
    }
</script>
