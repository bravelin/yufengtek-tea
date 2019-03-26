<template>
    <!--<Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>-->
        <div class="plane-content cameraCenter">
            <div class="video-container" ref="container2" >
                <!-- <video-player class="video-player-box" :options="playerOptions" :playsinline="true" @ready="playerReadied"></video-player> -->
                <video :id="videoId" :style="{ width: width + 'px', height: height + 'px' }" controls playsInline webkit-playsinline autoplay>
                    <source :src="videoUrl360" type="application/x-mpegURL"/>
                </video>
            </div>
        </div>
    <!--</Plane>-->
</template>
<script>
    import '@/lib/ezuikit'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = `$store.state.${moduleNameSpace}.currActive.type`
    const dataVideo = `$store.state.${moduleNameSpace}.videoUrl360`
    export default {
        name: 'Production360Video',
        props: {
            url: {
                type: String
            }
        },
        computed: {
            ...thisMapState(['currActive', 'videoUrl360'])
        },
        created() {
            
            var that = this
            var displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i) // 判断是否是其他设备
            // if (displayType) {
                document.touchStart = function (e) {
                    console.log(e)
                }
            // }
            document.onkeydown = function (e) {
                e.preventDefault()
                const key = e.key
                if (that.$store.state[moduleNameSpace].camera.camera_type == '2' && !that.keyDown) {
                    that.keyDown = true
                    that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, key)
                }
            }
            document.onkeyup = function () {
                if (that.keyDown) {
                    that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                    that.keyDown = false
                }
            }
        },
        watch: {
            [dataProp] (val) {
                // 切换到此处再获取容器大小
                if (val == 'IOT_TYPE_GUN') {
                    // const { w, h } = this.getSize()
                    console.log(this.videoUrl360)
                    // this.initVideo(w, h)
                }
            },
            [dataVideo] (val) {
                // console.log(val)
                 // console.log(this.videoUrl360)
                const { w, h } = this.getSize()
                this.initVideo(w, h)
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
                videoId: 'v' + Math.random(),
                ready: false,
                player2: null,
                containerHeight: 0,
                width: 0,
                height: 0,
                keyDown: false,
                timer: null,
                displayType: false
                // playerOptions: {
                //     autoplay: true,
                //     width: 388,
                //     height: 211,
                //     fluid: false,
                //     preload: 'auto',
                //     language: 'zh-CN',
                //     sources: [{ type: 'application/x-mpegURL', src: 'http://hls01open.ys7.com/openlive/3cb95e485da24838ae7d65b99ff6cc27.m3u8' }],
                //     notSupportedMessage: '暂无法播放',
                //     controlBar: {
                //         fullscreenToggle: true,
                //         remainingTimeDisplay: false
                //     }
                // }
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
                // that.playerOptions.width = w
                // that.playerOptions.height = h
                that.$nextTick(() => {
                    if (document.getElementById(that.videoId)) {
                        that.player2 = new EZUIPlayer(that.videoId)
                        console.log(that.player2)
                    }
                })
            },
            getSize () {
                const that = this
                const container = that.$refs.container2
                if (container) {
                    const styles = getComputedStyle(container, null)
                    const w = parseInt(styles.height) * 4 / 3 || 0
                    const h = (12 / 16) * w
                    // console.log({w, h})
                    return { w, h }
                }
            },
            playerReadied () {}
        },
        beforeDestroy() {
            const that = this
            if (that.timer) {
                clearTimeout(that.timer)
            }
        },
    }
</script>
