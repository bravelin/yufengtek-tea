<template>
    <div class="page warehouse-page">
        <Map></Map>
        <div>
            <InOutCircle></InOutCircle>
            <div>
                <InLine></InLine>
                <OutLine></OutLine>
            </div>
            <div>
                <InConstrast></InConstrast>
                <OutConstrast></OutConstrast>
            </div>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Map from './Map'
    import InLine from './InLine'
    import InOutCircle from './InOutCircle'
    import InConstrast from './InConstrast'
    import OutLine from './OutLine'
    import OutConstrast from './OutConstrast'

    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'WarehouseIndex',
        components: {
            Map, InLine, InOutCircle, InConstrast, OutLine, OutConstrast
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_DATA)
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_CURR_REGION, '')
            const fullProps = ['mapFullState', 'inCircleChartFullState', 'outCircleChartFullState', 'inLineChartFullState', 'outLineChartFullState', 'inConstrastFullState', 'outConstrastFullState']
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/warehouse.scss';
</style>
