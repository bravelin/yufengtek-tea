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
    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'PlantMap',
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
                store.commit(moduleNameSpace + '/' + types.FARMING_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_PLANT_ACT_DATA)
                store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_FERTILIZER_ACT_DATA)
                store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_PROTECTION_ACT_DATA)
            }
        }
    }
</script>
