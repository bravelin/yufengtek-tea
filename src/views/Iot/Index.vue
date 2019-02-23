<template>
    <div class="page iot-page">
        <div class="left-container">
            <Amount></Amount>
            <Charts v-show="currActive.type=='fm'"></Charts>
            <CameraVideo v-show="currActive.type=='mn'"></CameraVideo>
        </div>
        <Map></Map>
        <Search></Search>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Amount from './Amount'
    import Charts from './Charts'
    import CameraVideo from './CameraVideo'
    import Map from './Map'
    import Search from './Search'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'iot-index',
        computed: {
            ...thisMapState(['currActive'])
        },
        components: {
            Charts, Map, Search, CameraVideo, Amount
        },
        data () {
            return {
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_MONITORS)
            store.dispatch(moduleNameSpace + '/' + types.GET_FMS)
        },
        beforeDestroy () {
            const store = this.$store
            store.commit(`${moduleNameSpace}/${types.IOT_CURVE_FULL_STATE_CHANGE}`, false)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/iot.scss';
</style>
