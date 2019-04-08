<template>
    <div class="plane-content cameraCenter" @touchstart="touchStart" @touchmove='touchMove' @touchend='touchEnd'>
        <div class="video-container" ref="container">
            <video-js :id="videoId" class="vjs-default-skin video-wrap" controls></video-js>
        </div>
    </div>
</template>
<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import config from '@/lib/config'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataVideo = `$store.state.${moduleNameSpace}.videoUrl360`
    const showProp = `$store.state.${moduleNameSpace}.photoViewerFullState`

    export default {
        name: 'Production360Video',
        computed: {
            ...thisMapState(['videoUrl360'])
        },
        created () {
            const that = this
            const store = that.$store
            const displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS)/i) // 判断是否是其他设备
            document.addEventListener('keydown', that.doHandleKeyDown)
            document.addEventListener('keyup', that.doHandleKeyUp)
        },
        watch: {
            [dataVideo] (val) {
                this.init()
            },
            [showProp] (val) {
                this.init()
            },
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
                ready: false,
                player: null,
                width: 0,
                height: 0,
                keyDown: false,
                key: '',
                displayType: false,
                moveUp: false,
                startX: '',
                startY: '',
                endX: '',
                endY: '',
            }
        },
        methods: {
            doHandleKeyDown (e) {
                e.preventDefault()
                const that = this
                const store = that.$store
                let key = e.key
                switch (e.key) {
                    case '1':
                        key = 5 // 左下
                        break
                    case '2':
                        key = 1 // 向下
                        break
                    case 'ArrowDown':
                        key = 1 // 向下
                        break
                    case '3':
                        key = 7 // 右下
                        break
                    case '4':
                        key = 2 // 向左
                        break
                    case 'ArrowLeft':
                        key = 2 // 向左
                        break
                    case '5':
                        key = 10 // 近焦
                        break
                    case '6':
                        key = 3 // 向右
                        break
                    case 'ArrowRight':
                        key = 3
                        break
                    case '7':
                        key = 4 // 左上
                        break
                    case '8':
                        key = 0 // 向上
                        break
                    case 'ArrowUp':
                        key = 0
                        break
                    case '9':
                        key = 6 // 左下
                        break
                    case '0':
                        key = 11 // 远焦距
                        break
                    case '+':
                        key = 8 // 放大
                        break
                    case '-':
                        key = 9 // 缩小
                        break
                }
                if (typeof key == 'number') {
                    if (store.state[moduleNameSpace].camera.camera_type == '2' && !that.keyDown) {
                        that.keyDown = true
                        that.key = key
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, key)
                    }
                }
            },
            doHandleKeyUp (e) {
                let key = e.key
                const that = this
                const store = that.$store
                if (typeof that.key == 'number') {
                    if (that.keyDown) {
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                        that.keyDown = false
                    }
                }
            },
            touchStart (e) {
                this.startX = e.touches[0].clientX
                this.startY = e.touches[0].clientY
            },
            touchMove (e) {
                var that = this
                e.preventDefault()
                e.stopPropagation()
                if ((e.touches[0].clientX - this.startX > 2 || e.touches[0].clientY - this.startY > 2) && !this.moveUp) {
                    this.moveUp = true
                    const endX = e.touches[0].clientX
                    const endY = e.touches[0].clientY
                    that.upOrDown(this.startX, this.startY, endX, endY)
                }
            },
            touchEnd () {
                var that = this
                that.$store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                this.moveUp = false
            },
            upOrDown (startX, startY, endX, endY) {
                const that = this
                const store = that.$store
                let direction = that.getSlideDirection(startX, startY, endX, endY)
                switch (direction) {
                    case 1:
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 0) // 向上
                        break
                    case 2:
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 1) // 向上
                        break
                    case 3:
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 2) // 向左
                        break
                    case 4:
                        store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 3) // 向右
                        break
                    default:
                        break
                    }
            },
            getSlideDirection (startX, startY, endX, endY) {
                const that = this
                let dy = startY - endY
                let dx = endX - startX
                let result = 0
                // 如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result
                }
                let angle = that.getSlideAngle(dx, dy)
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
            getSlideAngle (dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI
            },
            init () {
                const that = this
                const { w, h } = that.getSize()
                if (w > 500) {
                    that.initVideo(w, h)
                }
            },
            initVideo (w, h) {
                const that = this
                if (!that.videoUrl360) {
                    return
                }
                // const url = `${config.proxyUrl}?url=` + encodeURIComponent(that.videoUrl360)
                // var url = ''
                // var displayType = !!navigator.userAgent.match(/(iPhone|iPod|iPad|ios|SymbianOS)/i) // 判断是否是其他设备
                // if (!displayType) {
                //     url = `${config.proxyUrl}?url=` + encodeURIComponent(that.videoUrl360)
                // } else {
                //     url = that.videoUrl
                // }
                const url = that.videoUrl360.replace(/http:/, 'https:')
                const videoWrap = that.videoWrap
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
                const container = that.$refs.container.parentNode
                if (container) {
                    const styles = getComputedStyle(container, null)
                    const w = parseInt(styles.width) || 0
                    const h = parseInt(styles.height) || 0
                    return { w, h }
                }
            }
        },
        beforeDestroy() {
            const that = this
            if (that.player) {
                that.player.dispose()
            }
            document.removeEventListener('keydown', that.doHandleKeyDown)
            document.removeEventListener('keyup', that.doHandleKeyUp)
        }
    }
</script>
