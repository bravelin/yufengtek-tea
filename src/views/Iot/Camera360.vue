<template>
    <Plane class="camera360" :full="camera360FullState">
        <PlaneTitle>视频监控</PlaneTitle>
        <div class="plane-content" @touchstart="touchStart" @touchmove='touchMove' @touchend='touchEnd'>
            <div class="video-container flv" ref="container">
                <video ref="videoPlayer" class="video-js vjs-default-skin video-wrap" controls></video>
            </div>
            <div class="video-container hls" ref="proxyContainer" v-show="showProxyVideo">
                <video ref="proxyVideoPlayer" class="video-js vjs-default-skin video-wrap" controls></video>
            </div>
        </div>
        <PlaneTools :full="camera360FullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import { reg } from '@/lib/util'

    const fullProp = 'camera360FullState'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataVideo = `$store.state.${moduleNameSpace}.videoUrl360`
    const showProp = `$store.state.${moduleNameSpace}.camera360FullState`

    export default {
        name: 'Iot360Video',
        computed: {
            ...thisMapState(['videoUrl360', 'camera360FullState'])
        },
        created () {
            const that = this
            const store = that.$store
            document.addEventListener('keydown', that.doHandleKeyDown)
            document.addEventListener('keyup', that.doHandleKeyUp)
        },
        watch: {
            [showProp] (val) {
                const that = this
                if (val) {
                    that.init()
                }
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const refs = that.$refs
                that.videoWrap = refs.videoPlayer
                that.proxyVideoWrap = refs.proxyVideoPlayer
                that.init()
            })
        },
        data () {
            return {
                videoWrap: null,
                proxyVideoWrap: null,
                player: null,
                proxyPlayer: null,
                keyDown: false,
                key: '',
                moveUp: false,
                startX: '',
                startY: '',
                endX: '',
                endY: '',
                showProxyVideo: true,
                eE: '',
                key1: ''
            }
        },
        methods: {
            doHandleKeyDown (e) {
                e.preventDefault()
                const that = this
                const store = that.$store
                if (that.eE == '') {
                    that.eE = e.key
                    that.changeDirect(e)
                    if (typeof that.key == 'number') {
                        if (store.state[moduleNameSpace].camera.camera_type == '2' && !that.keyDown) {
                            that.keyDown = true
                            store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, that.key)
                        }
                    }
                } else {
                    if (that.eE == e.key) {
                        console.log('保持不变')
                    } else {
                        if (that.key1 == '') {
                            if ((that.eE == 2 && e.key == 4) || (that.eE == 4 && e.key == 2)) { that.key1 = 5 }
                            if ((that.eE == 2 && e.key == 6) || (that.eE == 6 && e.key == 2)) { that.key1 = 7 }
                            if ((that.eE == 8 && e.key == 4) || (that.eE == 4 && e.key == 8)) { that.key1 = 4 }
                            if ((that.eE == 8 && e.key == 6) || (that.eE == 6 && e.key == 8)) { that.key1 = 6 }

                            if ((that.eE == 'ArrowDown' && e.key == 'ArrowLeft') || (that.eE == 'ArrowLeft' && e.key == 'ArrowDown')) { that.key1 = 5 }
                            if ((that.eE == 'ArrowDown' && e.key == 'ArrowRight') || (that.eE == 'ArrowRight' && e.key == 'ArrowDown')) { that.key1 = 7 }
                            if ((that.eE == 'ArrowUp' && e.key == 'ArrowLeft') || (that.eE == 'ArrowLeft' && e.key == 'ArrowUp')) { that.key1 = 4 }
                            if ((that.eE == 'ArrowUp' && e.key == 'ArrowRight') || (that.eE == 'ArrowRight' && e.key == 'ArrowUp')) { that.key1 = 6 }
                            if (that.key1 != '' && that.keyDown) {
                                that.key = that.key1
                                var p = new Promise(function (resolve, reject) {
                                    store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, 'up')
                                    resolve('ok')
                                })
                                p.then(function (e) {
                                    console.log(e)
                                    store.dispatch(moduleNameSpace + '/' + types.CHANGE_GUN_DIRECTION, that.key)
                                })
                            }
                        }
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
                        that.eE = ''
                        that.key1 = ''
                    }
                }
            },
            changeDirect (e) {
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
                this.key = key
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
                that.$nextTick(() => {
                    const { w, h } = that.getSize()
                    if (w > 500) {
                        that.initVideo(w, h)
                    }
                })
            },
            initVideo (w, h) {
                const that = this
                const videoUrl = that.videoUrl360
                if (!videoUrl) {
                    return
                }
                const videoWrap = that.videoWrap
                const proxyVideoWrap = that.proxyVideoWrap
                const url = reg.ios.test(navigator.userAgent) ? videoUrl.replace(/https:/, 'http:') : videoUrl.replace(/http:/, 'https:')
                const proxyUrl = that.getProxyUrl(url)
                const playerOptions = {
                    autoplay: true,
                    techOrder: ['html5', 'flvjs'],
                    flvjs: {
                        mediaDataSource: {
                            isLive: true,
                            cors: true,
                            withCredentials: false,
                        }
                    },
                    preload: 'auto',
                    language: 'zh-CN',
                    sources: [{ type: 'video/mp4', src: url }],
                    notSupportedMessage: '暂时无法播放',
                    html5: { hls: { withCredentials: false } },
                    controlBar: {
                        fullscreenToggle: true,
                        remainingTimeDisplay: false,
                        timeDivider: false,
                        durationDisplay: false
                    }
                }
                const proxyPlayerOptions = {
                    autoplay: true,
                    preload: 'auto',
                    language: 'zh-CN',
                    sources: [{ type: 'application/x-mpegURL', src: proxyUrl }],
                    notSupportedMessage: '暂时无法播放',
                    html5: { hls: { withCredentials: false } },
                    controlBar: {
                        fullscreenToggle: true,
                        remainingTimeDisplay: false,
                        timeDivider: false,
                        durationDisplay: false
                    }
                }
                const width = w - 10
                const height = h - 10
                videoWrap.style.width = width + 'px'
                videoWrap.style.height = height + 'px'
                proxyVideoWrap.style.width = width + 'px'
                proxyVideoWrap.style.height = height + 'px'
                let player = that.player
                let proxyPlayer = that.proxyPlayer
                that.$nextTick(() => {
                    if (player) {
                        player.reset()
                        player.src({ src: url, type: 'video/x-flv' })
                        player.load()
                        setTimeout(() => { player.play() }, 100)
                    } else {
                        player = that.player = videojs(videoWrap, playerOptions, () => {
                            player.on('error', () => {
                                player.src({ src: url, type: 'video/x-flv' })
                                player.ready(() => {
                                    player.load()
                                    setTimeout(() => { player.play() }, 100)
                                    setTimeout(() => {
                                        if (!reg.ios.test(navigator.userAgent)) {
                                            console.log('切换成flv.........')
                                            that.showProxyVideo = false
                                            that.proxyPlayer && that.proxyPlayer.dispose()
                                        }
                                    }, 2000)
                                })
                            })
                        })
                        setTimeout(() => { player.play() }, 50)
                    }
                    // hls格式的视频
                    if (that.proxyPlayer) {
                        that.proxyPlayer.src(proxyUrl)
                        that.proxyPlayer.load()
                    } else {
                        that.proxyPlayer = videojs(proxyVideoWrap, proxyPlayerOptions)
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
                } else {
                    return { w: 0, h: 0 }
                }
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.IOT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            },
            getProxyUrl (url) {
                const pos = url.lastIndexOf('/')
                return (reg.ios.test(navigator.userAgent) ? 'http' : 'https') + '://hls01open.ys7.com/openlive/' + url.slice(pos + 1, -4) + '.m3u8'
            }
        },
        beforeDestroy() {
            const that = this
            if (that.player) {
                that.player.dispose()
            }
            if (that.proxyPlayer) {
                that.proxyPlayer.dispose()
            }
            document.removeEventListener('keydown', that.doHandleKeyDown)
            document.removeEventListener('keyup', that.doHandleKeyUp)
        }
    }
</script>