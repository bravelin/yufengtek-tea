<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <NavMenu></NavMenu>
        <router-view :style="{ height: pageHeight + 'px' }"/>
        <Spinner v-show="loading"></Spinner>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'
    import NavMenu from '@/views/NavMenu'
    import initSocket from '@/lib/socket'
    import { getPageParams } from '@/lib/util'

    export default {
        name: 'app',
        components: {
            Spinner, NavMenu
        },
        computed: {
            ...mapState(['loading', 'winHeight', 'screenFullState']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 133
                if (state.winWidth <= 1200) {
                    h += 29
                } else if (state.winWidth <= 1400) {
                    h += 25
                }
                return h > 505 ? h : 505
            },
            isLogin () {
                return this.$store.state.currRouter.to === 'login'
            }
        },
        created () {
            const that = this
            const store = that.$store
            const win = window
            const pageParams = getPageParams()
            win.useFlash = pageParams.flash == 'true' // 视频是否使用flash播放，默认使用h5格式
            win.hd = !(pageParams.hd == 'false') // 视频是否使用高清，默认true
            // 监听窗口大小的改变
            win.addEventListener('resize', () => {
                store.commit(types.GET_WINDOW_SIZE)
            })
            store.commit(types.GET_WINDOW_SIZE)
            setTimeout(() => {
                if (store.state.userToken) {
                    initSocket()
                }
            }, 1000)
        }
    }
</script>
<style lang="scss">
    @import './style/common/app.scss';
</style>
