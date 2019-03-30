<template>
    <div class="page origin-page">
        <Map></Map>
        <div>
            <div>
                <CityRank></CityRank>
                <CountStat></CountStat>
            </div>
            <AddressList></AddressList>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import AddressList from './AddressList'
    import CityRank from './CityRank'
    import CountStat from './CountStat'
    import Map from './Map'
    import socket from '@/lib/socket'

    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'origin-index',
        components: {
            Map, AddressList, CityRank, CountStat
        },
        computed: {
            ...mapState(['screenFullState'])
        },
        data() {
            return {
                ws: null,
                wsUrl: 'wss://tea.yufengtek.com/tea-IIS-Web/myHandler',
                lockReconnect: false,
                tt: '',
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_DATA)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, { currentPage: 1 })
            // socket.init()
            // that.createWebSocket()
            // that.webSocketLink()
            store.dispatch(moduleNameSpace + '/' + types.GETWEBSOCKET)
        },
        methods: {
            webSocketLink () {
                let that = this
                var heartCheck = {
                    timeout: 5000,
                    timeoutObj: null,
                    reset: function () {
                        clearInterval(this.timeoutObj)
                        return this
                    },
                    start: function () {
                        this.timeoutObj = setInterval(function () {
                            if (that.ws.readyState==1) {
                                that.ws.send('HeartBeat')
                            }
                            
                            // console.log("HeartBeat")
                        }, this.timeout)
                    }
                }
                if ('WebSocket' in window) {
                    that.ws = new WebSocket(that.wsUrl)
                     console.log(that.ws.readyState)
                }
                that.ws.onopen = function (e) {
                    heartCheck.reset().start()
                   
                }
                that.ws.onmessage = function (e) {
                    const addressList = that.$store.state[moduleNameSpace].addressList
                    var ss = typeof e.data
                    // console.log(ss)
                    if (ss == 'string' && e.data != 'Hello') {
                        var data = JSON.parse(e.data)
                        if (data.date == addressList[0].date) {
                            addressList[0].list.unshift(data)
                        } else {
                            const addr = { date: data.date, list: [data] }
                            addressList.unshift(addr)
                        }
                        that.$store.state[moduleNameSpace].addressList = addressList
                    }
                    console.log(e)
                }
                that.ws.send = function(e) {
                    console.log(that.ws)
                    
                    console.log('发送消息成功')
                }
                that.ws.onclose = function () {
                    heartCheck.reset()
                    console.log('连接关闭')
                }
            }
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            const fullProps = ['cityRankFullState', 'countStateFullState', 'mapFullState']
            console.log(this.$store.state[moduleNameSpace].websocket)
            // this.ws.onclose()
            this.$store.state[moduleNameSpace].websocket.onclose()
            this.$store.state[moduleNameSpace].websocket.send('111')
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.ORIGIN_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/origin.scss';
</style>
