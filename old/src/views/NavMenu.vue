<template>
    <div class="nav-menu">
        <div class="logo" @click="doRefreshPage()" :class="{ spec: userRole == '1' }"><div>智所未见&nbsp;尽在未来</div></div>
        <ul class="menu">
            <router-link tag="li" :to="{ name: 'home' }">智慧全息</router-link>
            <router-link tag="li" :to="{ name: 'iot' }">物联监控</router-link>
            <router-link tag="li" :to="{ name: 'plant' }">种植分布</router-link>
            <router-link tag="li" :to="{ name: 'farming' }">农事活动</router-link>
            <router-link tag="li" :to="{ name: 'warehouse' }">出库入库</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">溯源数据</router-link>
        </ul>
        <AppTitle></AppTitle>
    </div>
</template>
<script>
    import AppTitle from './AppTitle'
    import types from '@/store/constants/types'
    import { mapState } from 'vuex'

    export default {
        name: 'NavMenu',
        components: {
            AppTitle
        },
        computed: {
            ...mapState(['userRole'])
        },
        methods: {
            doRefreshPage () {
                if (window.useFlash && location.hash.indexOf('?flash=true') < 0) {
                    location.href = location.href + '?flash=true'
                } else {
                    location.reload(true)
                }
            }
        }
    }
</script>
