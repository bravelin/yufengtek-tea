<template>
    <Plane class="iot-container camera-video">
        <PlaneTitle>视频监控<span v-show="videoName">（{{ videoName }}）</span></PlaneTitle>
        <div class="plane-content">
            <div class="video-container" ref="container" :style="{ height: containerHeight + 'px' }">
                <video ref="videoPlayer" class="video-js vjs-default-skin video-wrap" controls></video>
            </div>
        </div>
    </Plane>
</template>
<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import { reg } from '@/lib/util'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const modulePrefix = `$store.state.${moduleNameSpace}`
    const dataVideo = `${modulePrefix}.videoUrl`
    const showProp = `${modulePrefix}.currActive.type`
    const photoViewerFullStateProp = `${modulePrefix}.photoViewerFullState`
    const camera360FullStateProp = `${modulePrefix}.camera360FullState`

    export default {
        name: 'IotCameraVideo',
        computed: {
            ...thisMapState(['videoUrl', 'videoName'])
        },
        watch: {
            [dataVideo] (val) {
                this.init()
            },
            [showProp] (val) {
                const that = this
                if (val == types.IOT_TYPE_GUN) {
                    this.init()
                } else if (that.player) {
                    that.player.pause()
                }
            },
            [photoViewerFullStateProp] (val) {
                this.doPauseOrResume(val)
            },
            [camera360FullStateProp] (val) {
                this.doPauseOrResume(val)
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
            })
        },
        data () {
            return {
                player: null,
                containerHeight: 0,
                inProcessing: false
            }
        },
        methods: {
            init () {
                const that = this
                that.$nextTick(() => {
                    const { w, h } = that.getSize()
                    if (h >= 200) {
                        that.initVideo(w, h)
                    }
                })
            },
            initVideo (w, h) {
                const that = this
                const videoUrl = that.videoUrl
                if (!videoUrl) {
                    return
                }
                if (that.inProcessing) { // 防止同时初始化
                    return
                }
                that.inProcessing = true
                setTimeout(() => { that.inProcessing = false }, 300)
                const videoWrap = that.$refs.videoPlayer
                // ios下需要http协议的url才能播放
                let url = reg.ios.test(navigator.userAgent) ? videoUrl.replace(/https:/, 'http:') : videoUrl.replace(/http:/, 'https:')
                console.log('1...', url)
                if (url.indexOf('.hd.') < 0) { // 切换成高清的
                    url = url.replace('.m3u8', '.hd.m3u8')
                    console.log('2...', url)
                }
                const playerOptions = {
                    autoplay: true,
                    preload: 'auto',
                    language: 'zh-CN',
                    sources: [{ type: 'application/x-mpegURL', src: url }],
                    notSupportedMessage: '暂时无法播放',
                    html5: { hls: { withCredentials: false } },
                    controlBar: {
                        playToggle: false,
                        fullscreenToggle: true,
                        remainingTimeDisplay: false,
                        timeDivider: false,
                        durationDisplay: false
                    }
                }
                that.containerHeight = h
                let width = w
                let height = h
                videoWrap.style.width = width + 'px'
                videoWrap.style.height = height + 'px'
                videoWrap.style.objectFit = 'fill'
                that.$nextTick(() => {
                    if (that.player) {
                        that.player.src(url)
                        that.player.load()
                    } else {
                        that.player = videojs(videoWrap, playerOptions)
                    }
                })
            },
            doPauseOrResume (val) {
                const that = this
                if (that.player) {
                    val ? that.player.pause() : that.player.play()
                }
            },
            getSize () {
                const that = this
                const container = that.$refs.container
                if (container) {
                    const styles = getComputedStyle(container, null)
                    const w = parseInt(styles.width) || 0
                    const h = (12 / 16) * w
                    return { w, h }
                } else {
                    return { w: 0, h: 0 }
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
