<template>
    <div class="nav-menu">
        <h3 @dblclick="doFull()">{{ userName == 'teadata' ? '茶叶大数据科技交互平台' : '武夷山市智慧茗园数据平台' }}</h3>
        <ul class="menu">
            <li :class="currRouter.to"></li>
            <router-link tag="li" :to="{ name: 'home' }">智慧全息</router-link>
            <router-link tag="li" :to="{ name: 'iot' }">物联监控</router-link>
            <router-link tag="li" :to="{ name: 'plant' }">种植分布</router-link>
            <router-link tag="li" :to="{ name: 'farming' }">农事活动</router-link>
            <router-link tag="li" :to="{ name: 'warehouse' }">出库入库</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">溯源数据</router-link>
        </ul>
        <div class="tag"></div>
        <div class="logout" @click="doLogout()"></div>
        <div class="logo spec" @dblclick="doRefreshPage()" v-show="userRole == '1'"></div>
        <div class="curr-time" v-show="userRole != '1'" @dblclick="doRefreshPage()">{{ currTime }}</div>
        <div class="circle" @dblclick="doRefreshPage()"></div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { mapState } from 'vuex'
    import { formatTime } from '@/lib/util'

    export default {
        name: 'NavMenu',
        computed: {
            ...mapState(['userRole', 'currRouter', 'userName'])
        },
        data () {
            return {
                currTime: ''
            }
        },
        created () {
            setInterval(() => {
                this.currTime = formatTime(new Date(), 'yyyy.MM.dd hh:mm:ss')
            }, 1000)
        },
        methods: {
            doLogout () {
                const that = this
                const store = that.$store
                that.$ajax({ url: '/data/user/loginOut', method: 'post' })
                store.commit(types.CLEAR_USER_INFO)
                that.$router.push({ name: 'login' })
            },
            doRefreshPage () {
                let params = []
                if (window.useFlash) {
                    params.push('flash=true')
                }
                if (!window.hd) {
                    params.push('hd=false')
                }
                location.href = location.origin + '/#/' + this.$store.state.currRouter.to + (params.length ? '?' + params.join('&') : '')
                location.reload()
            },
            doFull () {
                const state = this.$store.state
                const screen = window.screen
                const tag = (screen.width == state.winWidth && screen.height == state.winHeight)
                if (!tag) {
                    const doc = document.documentElement
                    const requestFullScreen = doc.requestFullScreen || doc.webkitRequestFullScreen || doc.mozRequestFullScreen || doc.msRequestFullScreen
                    requestFullScreen.call(doc)
                } else {
                    const doc = document
                    const cancelFullScreen = doc.cancelFullScreen || doc.webkitCancelFullScreen || doc.mozCancelFullScreen || doc.exitFullscreen
                    cancelFullScreen.call(doc)
                }
            }
        }
    }
</script>
