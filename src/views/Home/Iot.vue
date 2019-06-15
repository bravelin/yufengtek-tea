<!--物联监控-->
<template>
    <Plane class="iot-wrap">
        <PlaneTitle>物联监控</PlaneTitle>
        <div :class="{ hide: !iotDatas.length }" class="plane-content">
            <div class="left">
                <div></div>
                <div>
                    <h3>{{ monitorAmount + cameraAmount }}</h3>
                    <div>总设备</div>
                </div>
                <div :class="'dot ' + item.type + ' ' + item.size" v-for="item in iotDatas" :key="item.type"><div></div><div>{{ item.name }}</div><div>{{ item.data }}</div></div>
            </div>
            <router-link class="right" :to="{ name: 'iot' }" tag="ul">
                <li><div>监测站设备</div><div>{{ monitorAmount }}</div></li>
                <li><div>摄像头设备</div><div>{{ cameraAmount }}</div></li>
            </router-link>
        </div>
        <div v-show="!iotDatas.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'HomeIot',
        computed: {
            ...thisMapState(['cameraAmount', 'monitorAmount']),
            iotDatas () {
                const originData = this.$store.state[moduleNameSpace].iotDatas
                if (originData.length) {
                    const datas = originData.map(item => item.data)
                    const baseNum = Math.max(...datas)
                    let size = 0
                    return originData.map(item => {
                        if (baseNum < 10) {
                            size = 0
                        } else if (item.data >= baseNum * 0.8) {
                            size = 3
                        } else if (item.data >= baseNum * 0.6) {
                            size = 2
                        } else if (item.data >= baseNum * 0.4) {
                            size = 1
                        }
                        return { name: item.name, data: item.data, type: item.type, size: `s${size}` }
                    })
                } else {
                    return []
                }
            }
        }
    }
</script>