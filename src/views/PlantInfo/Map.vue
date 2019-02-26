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

    const moduleNameSpace = ns.PLANT
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
                store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_STAT_DATA)
                store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TREE_AGE_DATA)
                store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TEA_FARM_DATA)
                store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TEA_VARIETIES_DATA)
            }
        }
    }
</script>
