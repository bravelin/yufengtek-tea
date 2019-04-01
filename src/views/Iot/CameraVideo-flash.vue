<template>
    <Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>
        <div class="plane-content">
            <div id="containerVideo" class="video-container" ref="container" :style="{ height: containerHeight + 'px' }">
                <video id="videoId" :style="{ width: width + 'px', height: height + 'px' }" controls playsInline webkit-playsinline autoplay>
                    <source :src="videoUrl" type="application/x-mpegURL"/>
                </video>
            </div>
        </div>
    </Plane>
</template>

<script>
    import '@/lib/ezuikit'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataVideo = `$store.state.${moduleNameSpace}.videoUrl`

    export default {
        name: 'ProductionCameraVideo',
        computed: {
            ...thisMapState(['videoUrl'])
        },
        watch: {
            [dataVideo] (val) {
                const that = this
                const { w, h } = that.getSize()
                that.initVideo(w, h)
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
                that.video = document.getElementById('videoId')
            })
        },
        data () {
            return {
                videoId: 'v' + Math.random(),
                video: '',
                ready: false,
                player: null,
                containerHeight: 0,
                width: 0,
                height: 0,
                keyDown: false,
                timer: null
            }
        },
        methods: {
            init () {
                const that = this
                const { w, h } = that.getSize()
                if (h < 200) {
                    that.timer = setTimeout(() => { that.init() }, 1200) // 第一次没法直接加载出来
                } else {
                    that.initVideo(w, h)
                }
            },
            initVideo (w, h) {
                const that = this
                that.containerHeight = h
                that.width = w - 10
                that.height = h - 10
                that.$nextTick(() => {
                    if (document.getElementById('videoId')) {
                        if (that.player) {
                            var videoHtml = document.getElementById('videoId')
                            document.getElementById('videoId').remove()
                            that.play = null
                            document.getElementById('containerVideo').appendChild(that.video)
                            that.player = new EZUIPlayer('videoId')
                        } else {
                            that.player = new EZUIPlayer('videoId')
                        }
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
            if (that.timer) {
                clearTimeout(that.timer)
            }
        }
    }
</script>
