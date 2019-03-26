<template>
    <div class="page iot-page">
        <div class="left-container">
            <Amount></Amount>
            <FM1Charts v-show="currActive.type==types.IOT_TYPE_FM1"></FM1Charts>
            <FM2Charts v-show="currActive.type==types.IOT_TYPE_FM2"></FM2Charts>
            <WFCharts v-show="currActive.type==types.IOT_TYPE_WF"></WFCharts>
            <CameraVideo v-show="currActive.type==types.IOT_TYPE_GUN"></CameraVideo>
        </div>
        <Map></Map>
        <!--<Search></Search>-->
        <PhotoViewer v-show="photoViewerFullState"></PhotoViewer>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Amount from './Amount'
    import FM1Charts from './FM1Charts'
    import FM2Charts from './FM2Charts'
    import WFCharts from './WFCharts'
    import CameraVideo from './CameraVideo'
    import Map from './Map'
    import Search from './Search'
    import PhotoViewer from './PhotoViewer'
    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'iot-index',
        computed: {
            ...thisMapState(['currActive', 'photoViewerFullState'])
        },
        components: {
            FM1Charts, FM2Charts, WFCharts, Map, CameraVideo, Amount, PhotoViewer
        },
        data () {
            return {
                types
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_IOT_DATA)
            window.aa = store
            // currActive 当前选中的数据类型
        },
        beforeDestroy () {
            const store = this.$store
            store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                fullStateName: 'photoViewerFullState', state: false
            })
            store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, {
                    id: 0, type: types.IOT_TYPE_FM1
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/iot.scss';
</style>
