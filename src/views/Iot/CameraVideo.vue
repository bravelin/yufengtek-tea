<template>
    <Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>
        <div class="plane-content">
            <div id="containerVideo" class="video-container" ref="container" :style="{ height: containerHeight + 'px' }">
                <video-js :id="videoId" class="vjs-default-skin video-wrap" controls></video-js>
            </div>
        </div>
    </Plane>
</template>
<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import config from '@/lib/config'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataVideo = `$store.state.${moduleNameSpace}.videoUrl`
    const showProp = `$store.state.${moduleNameSpace}.currActive.type`

    export default {
        name: 'ProductionCameraVideo',
        computed: {
            ...thisMapState(['videoUrl'])
        },
        watch: {
            [dataVideo] (val) {
                this.init()
            },
            [showProp] (val) {
                if (val == types.IOT_TYPE_GUN) {
                    this.init()
                }
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.videoWrap = document.getElementById(that.videoId)
                that.init()
            })
        },
        data () {
            return {
                videoId: 'v' + Math.random(),
                videoWrap: null,
                player: null,
                containerHeight: 0,
                width: 0,
                height: 0
            }
        },
        methods: {
            init () {
                const that = this
                const { w, h } = that.getSize()
                if (h >= 200) {
                    that.initVideo(w, h)
                }
            },
            initVideo (w, h) {
                const that = this
                if (!that.videoUrl) {
                    return
                }
                const videoWrap = that.videoWrap
                const url = `${config.proxyUrl}?url=` + encodeURIComponent(that.videoUrl)
                const playerOptions = {
                    autoplay: true,
                    preload: 'auto',
                    language: 'zh-CN',
                    sources: [{ type: 'application/x-mpegURL', src: url }],
                    notSupportedMessage: '暂时无法播放',
                    html5: { hls: { withCredentials: false } },
                    controlBar: {
                        fullscreenToggle: true,
                        remainingTimeDisplay: false,
                        timeDivider: false,
                        durationDisplay: false
                    }
                }
                that.containerHeight = h
                that.width = w - 10
                that.height = h - 10
                videoWrap.style.width = that.width + 'px'
                videoWrap.style.height = that.height + 'px'
                that.$nextTick(() => {
                    if (that.player) {
                        that.player.src(url)
                        that.player.load()
                    } else {
                        that.player = videojs(videoWrap, playerOptions)
                    }
                })
            },
            getSize () {
                const that = this
                const container = that.$refs.container
                if (container) {
                    const styles = getComputedStyle(container, null)
                    const w = parseInt(styles.width) || 0
                    const h = (12 / 16) * w
                    return { w, h }
                }
            }
        },
        beforeDestroy() {
            const that = this
            if (that.player) {
                that.player.dispose()
            }
        }
    }
</script>
