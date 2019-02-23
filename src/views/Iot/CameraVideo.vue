<template>
    <Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>
        <div class="plane-content">
            <div class="video-container" ref="container" :style="{ height: containerHeight + 'px' }">
                <video-player class="video-player-box" :options="playerOptions" :playsinline="true" @ready="playerReadied"></video-player>
            </div>
        </div>
    </Plane>
</template>
<script>
    export default {
        name: 'ProductionCameraVideo',
        props: {
            url: {
                type: String
            }
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const container = that.$refs.container
                const styles = getComputedStyle(container, null)
                const w = parseInt(styles.width)
                const h = (10 / 16) * w
                that.containerHeight = h
                that.playerOptions.width = w
                that.playerOptions.height = h
            })
        },
        data () {
            return {
                ready: false,
                player: null,
                containerHeight: 0,
                playerOptions: {
                    autoplay: true,
                    width: 388,
                    height: 211,
                    fluid: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    sources: [{ type: 'video/mp4', src: 'http://vjs.zencdn.net/v/oceans.mp4' }],
                    notSupportedMessage: '暂无法播放',
                    controlBar: {
                        fullscreenToggle: true,
                        remainingTimeDisplay: false
                    }
                }
            }
        },
        methods: {
            playerReadied () {}
        }
    }
</script>
