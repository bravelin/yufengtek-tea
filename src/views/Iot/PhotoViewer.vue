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
            [viewUrlProp] () {
                this.doRefresh()
            }
        },
        created() {
            const displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i)
            this.displayType = displayType ? 'block' : ''
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
