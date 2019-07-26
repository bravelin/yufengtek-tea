<template>
    <Plane class="photo-viewer no-shadow" :full="photoViewerFullState">
        <PlaneTitle class="no-icon">{{ photoViewName || '全景图'}}<span v-show="photoViewTime">拍摄时间：{{photoViewTime}}</span></PlaneTitle>
        <div class="plane-content" id="container" ref="container"></div>
        <PlaneTools :full="photoViewerFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.IOT
    const fullProp = 'photoViewerFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const viewUrlProp = `$store.state.${moduleNameSpace}.photoViewUrl`

    export default {
        name: 'IotPhotoViewer',
        computed: {
            ...thisMapState(['photoViewerFullState', 'photoViewUrl', 'currActive', 'photoViewName', 'photoViewTime'])
        },
        watch: {
            [viewUrlProp] (val, oldval) {
                clearTimeout(this.timer)
                this.init()
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
                    that.timer = setTimeout(() => { that.init() }, 200)
                } else if (that.photoViewUrl) {
                    if(that.viewer) removepano('krpano')
                    embedpano({
                        xml:"./jslib/krpano.xml",
                        target: "container", 
                        id: 'krpano',
                        initvars:{source: that.photoViewUrl}, 
                        onready : function(krpano_interface) {
                            that.viewer = krpano_interface
                        }
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
        },
        beforeDestroy() {
            if(this.viewer) removepano('krpano')
        },
    }
</script>
