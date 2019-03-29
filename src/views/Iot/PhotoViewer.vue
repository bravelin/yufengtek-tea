<template>
    <Plane class="photo-viewer" :full="photoViewerFullState">
        <PlaneTitle>{{display=='' ? '全景图' : '视频监控'}}</PlaneTitle>
        <div class="plane-content" ref="container" v-show="display==''"></div>
        <CameraVideo v-show="display=='camera'"></CameraVideo>
        <PlaneTools :full="photoViewerFullState" @change="doFullStateChange" :style="{display: displayType}"></PlaneTools>
    </Plane>
</template>
<script>

    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import PhotoSphereViewer from 'photo-sphere-viewer'
    import CameraVideo from './Camera360'
    const moduleNameSpace = ns.IOT
    const fullProp = 'photoViewerFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullStateProp = `$store.state.${moduleNameSpace}.${fullProp}`
    const viewUrlProp = `$store.state.${moduleNameSpace}.photoViewUrl`
    const resizeStateProp = `$store.state.windowResizeState`

    export default {
        name: 'iot-photo-viewer',
        computed: {
            ...thisMapState(['photoViewerFullState', 'photoViewUrl', 'currActive', 'display'])
        },
        watch: {
            [viewUrlProp] () {
                this.doRefresh()
            }
        },
        created() {
            var displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i)
            this.displayType = displayType ? 'block' : ''
        },
        components: {
            CameraVideo
        },
        data () {
            return {
                container: null,
                viewer: null,
                displayType: 'none',
                types
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                console.log(this.display)
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
                    setTimeout(() => { that.init() }, 1000)
                } else {
                    that.viewer = new PhotoSphereViewer({
                        panorama: that.photoViewUrl,
                        container: that.container,
                        time_anim: false,
                        navbar: true,
                        default_fov: 90
                    })
                }
            },
            doRefresh () {
                const that = this
                const store = that.$store
                if (that.viewer) {
                    const photoViewUrl = store.state[moduleNameSpace]['photoViewUrl']
                    that.viewer.setPanorama(that.photoViewUrl)
                }
            },
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
