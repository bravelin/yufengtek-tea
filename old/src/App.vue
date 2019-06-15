<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <Sky></Sky>
        <NavMenu v-show="!isLogin"></NavMenu>
        <router-view :style="{ height: pageHeight + 'px' }"/>
        <Spinner v-show="loading"></Spinner>
        <button class="logout-btn" @dblclick="doLogout()">logout</button>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'
    import NavMenu from '@/views/NavMenu'
    import Sky from '@/components/Sky'
    import initSocket from '@/lib/socket'

    export default {
        name: 'app',
        components: {
            Spinner, NavMenu, Sky
        },
        computed: {
            ...mapState(['loading', 'winHeight', 'screenFullState']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 105
                return h > 540 ? h : 540
            },
            isLogin () {
                return this.$store.state.currRouter.to === 'login'
            }
        },
        created () {
            const that = this
            const store = that.$store
            const win = window

            win.useFlash = location.hash.indexOf('?flash=true') > 0
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
        },
        methods: {
            doLogout () {
                const that = this
                const store = that.$store
                that.$ajax({ url: '/data/user/loginOut' })
                store.commit(types.CLEAR_USER_INFO)
                that.$router.push({ name: 'login' })
            }
        }
    }
</script>
<style lang="scss">
    @import './style/common/app.scss';
</style>
