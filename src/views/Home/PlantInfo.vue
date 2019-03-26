<!--种植分布-->
<template>
    <Plane class="plant-distribute-wrap" :full="mapFullState">
        <WuyishanMap @change="doMapChange" :curr="currSelectedRegion" :full="mapFullState"></WuyishanMap>
        <PlaneTools :full="mapFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import WuyishanMap from '@/components/WuyishanMap'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullProp = 'mapFullState'

    export default {
        name: 'home-plant-info',
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
                store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.HOME_GET_AMOUNT_RANK_DATA, place)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_FARMING_ACT_DATA)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_PICK_DATA)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_WAREHOUSE_DATA)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_CITY_DATA)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_MONITOR_AMOUNT)
                // store.dispatch(moduleNameSpace + '/' + types.HOME_GET_TEA_LEVEL_DATA)
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>