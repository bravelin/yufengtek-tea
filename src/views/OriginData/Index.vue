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
                lockReconnect : false,
                tt: '',
                heartCheck: {
                    timeout: 3000,
                    timeoutObj: null,
                    serverTimeoutObj: null,
                    start: function(){
                        console.log('start');
                        var self = this;
                        this.timeoutObj && clearTimeout(this.timeoutObj);
                        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                        this.timeoutObj = setTimeout(function(){
                        //这里发送一个心跳，后端收到后，返回一个心跳消息，
                        console.log('55555');
                        this.ws.send("123456789");
                        self.serverTimeoutObj = setTimeout(function() {
                            console.log(111);
                            console.log(ws);
                            this.ws.close();
                            // createWebSocket();
                        }, self.timeout);

                        }, this.timeout)
                    }
                }
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_DATA)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, { currentPage: 1 })
            // that.createWebSocket()
            that.webSocketLink()
            //store.dispatch(moduleNameSpace + '/' + types.GETWEBSOCKET)
        },
        methods: {
            webSocketLink () {
                let that = this
                var heartCheck = {
                    timeout: 5000,
                    timeoutObj: null,
                    reset: function(){
                        clearInterval(this.timeoutObj)
                        return this
                    },
                    start: function(){
                        this.timeoutObj = setInterval(function(){
                            that.ws.send("HeartBeat")
                            //console.log("HeartBeat")
                            }, this.timeout)
                    }, 
                }
                if ('WebSocket' in window) {
                    that.ws = new WebSocket(that.wsUrl)
                }
                that.ws.onopen = function (e) {
                    heartCheck.reset().start()
                }
                that.ws.onmessage = function (e) {
                    const addressList = that.$store.state[moduleNameSpace].addressList
                    var ss = typeof e.data
                    // console.log(ss)
                    if (ss == 'string' && e.data!='Hello') {
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
                    console.log('发送消息成功')
                }
                that.ws.onclose = function () {
                    heartCheck.reset()
                    console.log('连接关闭')
                }
            },
            createWebSocket() {
                var that = this
                // try {
                    that.ws = new WebSocket(that.wsUrl);
                    that.init();
                // } catch(e) {
                    // console.log('catch');
                    // that.reconnect(that.wsUrl);
                // }
            },

            init() {
                var that = this
                that.ws.onclose = function () {
                    console.log('链接关闭');
                    that.reconnect(wsUrl);
                };
                that.ws.onerror = function() {
                    console.log('发生异常了');
                    that.reconnect(wsUrl);
                };
                that.ws.onopen = function () {
                    //心跳检测重置
                    that.heartCheck.start();
                };
                that.ws.send = function (mess) {
                    //心跳检测重置
                    console.log(mess)
                    //that.heartCheck.start();
                };
                that.ws.onmessage = function (event) {
                    //拿到任何消息都说明当前连接是正常的
                    console.log('接收到消息');
                    that.heartCheck.start();
                }
            },
            reconnect(url) {
                var that = this
                if(that.lockReconnect) {
                    return;
                };
                that.lockReconnect = true;
                //没连接上会一直重连，设置延迟避免请求过多
                that.tt && clearTimeout(that.tt);
                that.tt = setTimeout(function () {
                    that.createWebSocket(url);
                    that.lockReconnect = false;
                }, 4000);
            }
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            const fullProps = ['cityRankFullState', 'countStateFullState', 'mapFullState']
            console.log(this.$store.state[moduleNameSpace].websocket)
            this.ws.onclose()
            //this.$store.state[moduleNameSpace].websocket.onclose()
            //this.$store.state[moduleNameSpace].websocket.send('111')
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
