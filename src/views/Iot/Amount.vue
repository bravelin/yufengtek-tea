<!--物联监控-->
<template>
    <Plane class="iot-wrap">
        <PlaneTitle>设备数量</PlaneTitle>
        <div class="plane-content">
            <div class="iot-item" :class="{ active: currVisibleIotType == 'monitor' }" @click="changeIotDatas('monitor')">
                <div>监测站设备</div>
                <div>{{ monitorAmount }}</div>
            </div>
            <div class="iot-item" :class="{ active: currVisibleIotType == 'camera' }" @click="changeIotDatas('camera')">
                <div>摄像头设备</div>
                <div>{{ cameraAmount }}</div>
            </div>
        </div>
    </Plane>
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
            ...thisMapState(['currVisibleIotType', 'cameraAmount', 'monitorAmount', 'fertilizerAmount', 'waterFertilizerAmount'])
        },
        methods: {
            changeIotDatas (value) {
                const that = this
                const store = that.$store
                if (that.currVisibleIotType != value) {
                    store.dispatch(moduleNameSpace + '/' + types.CHANGE_ACTIVE_IOT_TYPE, value)
                } else {
                    store.commit(moduleNameSpace + '/' + types.CHANGE_VISIBLE_IOT_TYPE, '')
                }
            }
        }
    }
</script>
