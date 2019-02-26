<template>
    <div class="page warehouse-page">
        <Map></Map>
        <div>
            <InCircle></InCircle>
            <InLine></InLine>
            <InConstrast></InConstrast>
        </div>
        <div>
            <OutCircle></OutCircle>
            <OutLine></OutLine>
            <OutConstrast></OutConstrast>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Map from './Map'
    import InLine from './InLine'
    import InCircle from './InCircle'
    import InConstrast from './InConstrast'
    import OutLine from './OutLine'
    import OutCircle from './OutCircle'
    import OutConstrast from './OutConstrast'

    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'warehouse-index',
        components: {
            Map, InLine, InCircle, InConstrast, OutLine, OutCircle, OutConstrast
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_TODAY_DATA)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_THIS_YEAR_IN_DATA)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_THIS_YEAR_OUT_DATA)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_HISTORY_IN_DATA)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_HISTORY_OUT_DATA)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/warehouse.scss';
</style>
