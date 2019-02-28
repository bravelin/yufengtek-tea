<template>
    <Plane class="iot-container camera-video">
        <PlaneTitle>视频监控</PlaneTitle>
        <div class="plane-content">
            <div class="video-container" ref="container" :style="{ height: containerHeight + 'px' }">
                <!-- <video-player class="video-player-box" :options="playerOptions" :playsinline="true" @ready="playerReadied"></video-player> -->
                <video id="myPlayer" :style="{ width: width + 'px', height: height + 'px' }" controls playsInline webkit-playsinline autoplay>
                    <source src="http://hls01open.ys7.com/openlive/3cb95e485da24838ae7d65b99ff6cc27.m3u8" type="application/x-mpegURL"/>
                </video>
            </div>
        </div>
    </Plane>
</template>
<script>
    import '@/lib/ezuikit'

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
                const h = (12 / 16) * w
                that.containerHeight = h
                that.width = w
                that.height = h
                // that.playerOptions.width = w
                // that.playerOptions.height = h
                that.player = new EZUIPlayer('myPlayer')
            })
        },
        data () {
            return {
                ready: false,
                player: null,
                containerHeight: 0,
                width: 0,
                height: 0,
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
            playerReadied () {}
        }
    }
</script>
