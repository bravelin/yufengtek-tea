<!--武夷地图-->
<template>
    <Plane class="map-wrap">
        <WuyishanMap @change="doMapChange" :curr="currSelectedRegion"></WuyishanMap>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import WuyishanMap from '@/components/WuyishanMap'
    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'warehouse-map',
        components: {
            WuyishanMap
        },
        computed: {
            ...thisMapState(['currSelectedRegion'])
        },
        methods: {
            doMapChange (place) {
                const that = this
                const store = that.$store
                store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_TODAY_DATA)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_THIS_YEAR_IN_DATA)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_THIS_YEAR_OUT_DATA)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_HISTORY_IN_DATA)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_HISTORY_OUT_DATA)
            }
        }
    }
</script>
