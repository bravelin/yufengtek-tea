<template>
    <!--<Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>-->
        <div class="plane-content cameraCenter" @touchstart="touchStart" @touchmove='touchMove' @touchend='touchEnd' >
            <div class="video-container" ref="container2" id="containerVideo2">
                <!-- <video-player class="video-player-box" :options="playerOptions" :playsinline="true" @ready="playerReadied"></video-player> -->
                <video id="videoId2" :style="{ width: width + 'px', height: height + 'px' }" controls playsInline webkit-playsinline autoplay>
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
        created () {
            var that = this
            var displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i) // 判断是否是其他设备
            document.onkeydown = function (e) {
                e.preventDefault()
                const key = e.key
                if (typeof key == 'number') {
                    if (that.$store.state[moduleNameSpace].camera.camera_type == '2' && !that.keyDown) {
                        that.keyDown = true
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, key)
                    }
                }
            }
            document.onkeyup = function () {
                if (typeof key == 'number') {
                    if (that.keyDown) {
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                        that.keyDown = false
                    }
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
                const { w, h } = this.getSize()
                this.initVideo(w, h)
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
                that.video = document.getElementById('videoId2')
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
                displayType: false,
                moveUp: false,
                startX: '',
                startY: '',
                endX: '',
                endY: '',
                video: ''
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
            touchStart (e) {
                this.startX = e.touches[0].clientX
                this.startY = e.touches[0].clientY
            },
            touchMove (e) {
                var that = this
                if ((e.touches[0].clientX - this.startX > 2 || e.touches[0].clientY - this.startY > 2) && !this.moveUp) {
                    this.moveUp = true
                    const endX = e.touches[0].clientX
                    const endY = e.touches[0].clientY
                    that.upOrDown(this.startX, this.startY, endX, endY)
                }
            },
            touchEnd () {
                console.log('停止')
                var that = this
                that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                this.moveUp = false
            },
            upOrDown (startX, startY, endX, endY) {
                const that = this
                let direction = that.GetSlideDirection(startX, startY, endX, endY)
                switch (direction) {
                    case 1:
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 0) // 向上
                        break
                    case 2:
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 1) // 向上
                        break
                    case 3:
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 2) // 向左
                        break
                    case 4:
                        that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 3) // 向右
                        break
                    default:
                        break
                    }
            },
            GetSlideDirection (startX, startY, endX, endY) {
                const that = this
                let dy = startY - endY
                let dx = endX - startX
                let result = 0
                // 如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result
                }
                let angle = that.GetSlideAngle(dx, dy)
                if (angle >= -45 && angle < 45) {
                    result = 4
                } else if (angle >= 45 && angle < 135) {
                    result = 1
                } else if (angle >= -135 && angle < -45) {
                    result = 2
                } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    result = 3
                }
                return result
            },
            // 返回角度
            GetSlideAngle (dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI
            },
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
                    if (document.getElementById('videoId2')) {
                        if (that.player2) {
                            var videoHtml = document.getElementById('videoId2')
                            document.getElementById('videoId2').remove()
                            that.player = null
                            document.getElementById('containerVideo2').appendChild(that.video)
                            that.player2 = new EZUIPlayer('videoId2')
                        } else {
                            that.player2 = new EZUIPlayer('videoId2')
                        }
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
