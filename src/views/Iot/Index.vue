<template>
    <div class="page iot-page">
        <div class="left-container">
            <Amount></Amount>
            <FM1Charts v-show="currActive.type == types.IOT_TYPE_FM1"></FM1Charts>
            <FM2Charts v-show="currActive.type == types.IOT_TYPE_FM2"></FM2Charts>
            <WFCharts v-show="currActive.type == types.IOT_TYPE_WF"></WFCharts>
            <CameraVideo v-show="currActive.type == types.IOT_TYPE_GUN"></CameraVideo>
        </div>
        <GMap></GMap>
        <PhotoViewer v-show="photoViewerFullState"></PhotoViewer>
        <Camera360 v-show="camera360FullState"></Camera360>
        <Message></Message>
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
    import Camera360 from './Camera360'
    import GMap from './GMap'
    import PhotoViewer from './PhotoViewer'
    import Message from '@/components/Message'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'iot-index',
        computed: {
            ...thisMapState(['currActive', 'photoViewerFullState', 'camera360FullState', 'fm1', 'fm2'])
        },
        components: {
            FM1Charts, FM2Charts, WFCharts, GMap, CameraVideo, Amount, PhotoViewer, Camera360, Message
        },
        data () {
            return {
                types,
                timer: null
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_IOT_DATA)
            that.timer = setInterval(() => {
                let bool = (that.currActive.type == 'IOT_TYPE_FM1' && that.fm1.time == 'HOUR') || (that.currActive.type == 'IOT_TYPE_FM2' && that.fm2.time == 'HOUR')
                let mimute = new Date().getMinutes()
                if (bool) {
                    store.dispatch(moduleNameSpace + '/' + (that.currActive.type == 'IOT_TYPE_FM1' ? types.GET_FM1_DATA : types.GET_FM2_DATA))
                    if (mimute == 31 || mimute == 1) {
                        store.dispatch(moduleNameSpace + '/' + (that.currActive.type == 'IOT_TYPE_FM1' ? types.GET_FM1_DATA : types.GET_FM2_DATA))
                    }
                }
            }, 1000 * 60)
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            const stateArr = [
                { state: 'photoViewerFullState' },
                { state: 'camera360FullState' },
                { state: 'curveChartFullState', subModuleName: 'fm1' },
                { state: 'curveChartFullState', subModuleName: 'fm2' },
                { state: 'curveChartFullState', subModuleName: 'wf' },
            ]
            stateArr.forEach(item => {
                store.commit(`${moduleNameSpace}/${types.IOT_CHANGE_FULL_STATE}`, {
                    fullStateName: item.state, state: false, subModuleName: item.subModuleName
                })
            })
            store.commit(moduleNameSpace + '/' + types.CHANGE_CONTROL_BUTTON_STATUS, false)
            store.commit(moduleNameSpace + '/' + types.CHANGE_VISIBLE_IOT_TYPE, '')
            store.commit(moduleNameSpace + '/' + types.CHANGE_ACTIVE_MARKER, { index: 0, type: types.IOT_TYPE_FM1 })
            that.timer && clearInterval(that.timer)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/iot.scss';
</style>
