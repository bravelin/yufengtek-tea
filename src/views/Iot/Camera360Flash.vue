<template>
    <Plane class="camera360 no-shadow" :full="camera360FullState">
        <PlaneTitle @click="doHideControlButton()">视频监控<span v-show="video360Name">（{{ video360Name }}）</span></PlaneTitle>
        <div class="plane-content">
            <div class="video-container flv" ref="container">
                <video id="camera-360-flash" playsInline webkit-playsinline autoplay></video>
            </div>
            <div class="video-container loading" v-show="showLoading">
                <Loading></Loading>
            </div>
        </div>
        <PlaneTools :full="camera360FullState" @change="doFullStateChange"></PlaneTools>
        <ControlPanel @change="doControlPanelChange"></ControlPanel>
    </Plane>
</template>

<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import { reg } from '@/lib/util'
    import ControlPanel from './ControlPanel'
    import Loading from '@/components/Loading'

    const fullProp = 'camera360FullState'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const modulePrefix = `$store.state.${moduleNameSpace}`
    const dataVideo = `${modulePrefix}.videoUrl360`
    const showProp = `${modulePrefix}.camera360FullState`
    const resizeStateProp = `$store.state.windowResizeState`
    const mapCodeObj = { 'ArrowUp': 0, 'ArrowDown': 1, 'ArrowLeft': 2, 'ArrowRight': 3, 'ZoomIn': 8, 'ZoomOut': 9, 'Stop': 'stop' }

    export default {
        name: 'Iot360FlashVideo',
        components: {
            ControlPanel, Loading
        },
        computed: {
            ...thisMapState(['videoUrl360', 'video360Name', 'camera', 'camera360FullState'])
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
                } else {
                    if (that.player) {
                        that.player.stop()
                    }
                    that.showLoading = true
                    that.player = null
                    const refs = that.$refs
                    refs.container.innerHTML = `<video id="camera-360-flash" controls playsInline webkit-playsinline autoplay></video>`
                    setTimeout(() => {
                        that.videoWrap = refs.container.querySelector('video')
                    }, 50)
                    that.$store.commit(moduleNameSpace + '/' + types.CHANGE_CONTROL_BUTTON_STATUS, false)
                }
            },
            [resizeStateProp] () { // 监听当前窗口大小
                const that = this
                const { w, h } = that.getSize()
                const width = w
                const height = h
                const videoWrap = that.videoWrap
                if (that.player && that.videoWrap) {
                    videoWrap.style.width = width + 'px'
                    videoWrap.style.height = height + 'px'
                }
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const refs = that.$refs
                that.videoWrap = refs.container.querySelector('video')
                that.init()
            })
        },
        data () {
            return {
                videoWrap: null,
                player: null,
                currPressedKey: '', // 当前正在按下的键
                currPressedKeyCode: '', // 键值
                directionChangeReqList: [], // 摄像头转动请求列表
                reqListProcessing: false,
                showLoading: true, // 视频加载的loading效果
            }
        },
        methods: {
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
                const flash = that.getVideoUrl(videoUrl)
                console.log('播放地址...', flash)
                const width = w
                const height = h
                videoWrap.style.width = width + 'px'
                videoWrap.style.height = height + 'px'
                videoWrap.innerHTML = `<source src="${flash}" type="rtmp/flv" />`
                let player = that.player
                that.$nextTick(() => {
                    player = that.player = new EZUIKit.EZUIPlayer({
                        id: 'camera-360-flash'
                    })
                    setTimeout(() => { that.showLoading = false }, 3500)
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
            // 返回hls和flash格式的链接
            getVideoUrl (url) {
                const pos = url.lastIndexOf('/')
                const equipSno = url.substr(pos + 1, 32)
                const prefix = (reg.ios.test(navigator.userAgent) ? 'http' : 'https')
                return `rtmp://rtmp01open.ys7.com/openlive/${equipSno}${window.hd ? '.hd' : ''}`
            },
            doHandleKeyDown (e) {
                const that = this
                const keyCode = that.getKeyCode(e)
                if (typeof keyCode == 'number' && that.camera360FullState) {
                    that.currPressedKey = e.key
                    that.currPressedKeyCode = keyCode
                    that.rquestChange(keyCode)
                }
            },
            doHandleKeyUp (e) {
                const that = this
                let key = e.key
                if (typeof that.currPressedKeyCode == 'number' && that.camera360FullState) {
                    that.rquestChange('stop')
                    that.currPressedKey = ''
                    that.currPressedKeyCode = ''
                }
            },
            doHideControlButton () {
                this.$store.commit(moduleNameSpace + '/' + types.CHANGE_CONTROL_BUTTON_STATUS, false)
            },
            doControlPanelChange (type) {
                const that = this
                const directionCode = mapCodeObj[type]
                if (directionCode !== undefined) {
                    that.rquestChange(directionCode)
                    if (type != 'Stop') {
                        that.rquestChange('stop')
                    }
                }
            },
            getKeyCode (e) {
                console.log('key...', e.key)
                let k = ''
                switch (e.key) {
                    case '1':
                        k = 5 // 左下
                        break
                    case '2':
                        k = 1 // 向下
                        break
                    case 'ArrowDown':
                        k = 1 // 向下
                        break
                    case '3':
                        k = 7 // 右下
                        break
                    case '4':
                        k = 2 // 向左
                        break
                    case 'ArrowLeft':
                        k = 2 // 向左
                        break
                    case '5':
                        k = 10 // 近焦
                        break
                    case '6':
                        k = 3 // 向右
                        break
                    case 'ArrowRight':
                        k = 3
                        break
                    case '7':
                        k = 4 // 左上
                        break
                    case '8':
                        k = 0 // 向上
                        break
                    case 'ArrowUp':
                        k = 0
                        break
                    case '9':
                        k = 6 // 左下
                        break
                    case '0':
                        k = 11 // 远焦距
                        break
                    case '+':
                        k = 8 // 放大
                        break
                    case '-':
                        k = 9 // 缩小
                        break
                }
                return k
            },
            // 对摄像头的方向控制请求
            rquestChange (keyCode) {
                const that = this
                const list = that.directionChangeReqList
                if (keyCode != 'stop') { // 将队列前面的stop剔除
                    for (let i = 0; i < list.length;) {
                        if (list[i] == 'stop') {
                            list.splice(i, 1)
                        } else {
                            i++
                        }
                    }
                }
                list.push(keyCode)
                if (!that.reqListProcessing) {
                    that.reqListProcessing = true
                    that.changeGunDirection()
                }
            },
            // 处理请求队列
            changeGunDirection () {
                const that = this
                if (that.directionChangeReqList.length) {
                    const directionCode = that.directionChangeReqList.shift()
                    let request = null
                    const sno = that.camera.camera_sno
                    // console.log('request control camera...', directionCode)
                    if (directionCode == 'stop') {
                        request = that.$ajax({ url: '/data/momitor/CameraStop?sno=' + sno, method: 'post' })
                    } else {
                        request = that.$ajax({ url: '/data/momitor/CameraRun?sno=' + sno + '&direction=' + directionCode, method: 'post' })
                    }
                    request.then((res) => {
                        that.changeGunDirection()
                    })
                } else {
                    that.reqListProcessing = false
                }
            }
        },
        beforeDestroy() {
            const that = this
            if (that.player) {
                that.player.stop()
            }
            if (that.directionChangeReqList.length) {
                that.directionChangeReqList = ['stop']
                that.changeGunDirection() // 停止
            }
            document.removeEventListener('keydown', that.doHandleKeyDown)
            document.removeEventListener('keyup', that.doHandleKeyUp)
        }
    }
</script>
