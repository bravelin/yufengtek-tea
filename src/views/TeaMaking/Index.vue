<template>
    <Plane class="full-screen">
        <PlaneTitle>制茶信息</PlaneTitle>
        <FullScreenButton :full="screenFullState"></FullScreenButton>
    </Plane>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.TEAMAKING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'tea-making-index',
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