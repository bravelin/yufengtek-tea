<!--物联监控-->
<template>
    <Plane class="iot-wrap">
        <div class="plane-container">
            <div class="iot-item">
                <div><i class="iconfont">&#xe62e;</i><div>摄像头</div></div>
                <div>{{ cameraAmount }}</div>
            </div>
            <div class="iot-item">
                <div><i class="iconfont">&#xe61b;</i><div>监测站</div></div>
                <div>{{ monitorAmount }}</div>
            </div>
            <div class="iot-item">
                <div><i class="iconfont">&#xe60c;</i><div>水肥设备</div></div>
                <div>{{ waterFertilizerAmount }}</div>
            </div>
        </div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'app-iot',
        computed: {
            ...thisMapState(['cameraAmount', 'monitorAmount', 'fertilizerAmount', 'waterFertilizerAmount'])
        }
    }
</script>