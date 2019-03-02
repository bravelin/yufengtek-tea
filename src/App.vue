<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <Sky></Sky>
        <NavMenu></NavMenu>
        <router-view :style="{ height: pageHeight + 'px' }"/>
        <Spinner v-show="loading"></Spinner>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner'
    import Api from '@/lib/api'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'
    import NavMenu from '@/views/NavMenu'
    import Sky from '@/components/Sky'

    export default {
        name: 'app',
        components: {
            Spinner, NavMenu, Sky
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapState(['loading', 'winHeight', 'screenFullState']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 105
                return h > 680 ? h : 680
            }
        },
        created () {
            const that = this
            const store = that.$store
            const win = window
            // 监听窗口大小的改变
            win.addEventListener('resize', () => {
                store.commit(types.GET_WINDOW_SIZE)
            })
            store.commit(types.GET_WINDOW_SIZE)
        }
    }
</script>
<style lang="scss">
    @import './style/common/app.scss';
</style>
