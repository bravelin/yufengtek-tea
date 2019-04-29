<!--物联监控-->
<template>
    <div class="iotList">
        <Plane class="iot-wrap">
            <div class="iot-item" :class="{ activeItem: activeIotItem == 'camera' }" @click="changeIotDatas('camera')">
                <div><i class="iconfont">&#xe62e;</i><div>摄像头</div></div>
                <div>{{ cameraAmount }}</div>
            </div>
        </Plane>
        <Plane class="iot-wrap" >
            <div class="iot-item" :class="{ activeItem: activeIotItem == 'monitor' }" @click="changeIotDatas('monitor')">
                <div><i class="iconfont">&#xe61b;</i><div>监测站</div></div>
                <div>{{ monitorAmount }}</div>
            </div>
        </Plane>
    </div>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    // 直接给数据
    export default {
        name: 'IotAmount',
        computed: {
            ...thisMapState(['cameraAmount', 'monitorAmount', 'fertilizerAmount', 'waterFertilizerAmount'])
        },
        data() {
            return {
                activeIotItem: ''
            }
        },
        methods: {
            changeIotDatas (value) {
                const store = this.$store
                if (this.activeIotItem != value) {
                    this.activeIotItem = value
                    store.dispatch(moduleNameSpace + '/' + types.GET_IOT_DATA, value)
                }
            }
        }
    }
</script>
