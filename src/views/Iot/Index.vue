<template>
    <Plane class="full-screen">
        <PlaneTitle>物联监控</PlaneTitle>
        <FullScreenButton :full="screenFullState"></FullScreenButton>
    </Plane>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'iot-index',
        computed: {
            ...mapState(['screenFullState'])
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
        }
    }
</script>