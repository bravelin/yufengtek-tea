<!--武夷地图-->
<template>
    <Plane class="map-wrap no-border" :full="mapFullState">
        <WuyishanMap @change="doMapChange" class="normal" :curr="currSelectedRegion" :full="mapFullState"></WuyishanMap>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import WuyishanMap from '@/components/WuyishanMap'

    const moduleNameSpace = ns.WAREHOUSE
    const fullProp = 'mapFullState'
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'WarehouseMap',
        components: {
            WuyishanMap
        },
        computed: {
            ...thisMapState(['currSelectedRegion', fullProp])
        },
        methods: {
            doMapChange (place) {
                const that = this
                const store = that.$store
                store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.WAREHOUSE_GET_DATA, place)
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.WAREHOUSE_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
