<template>
    <div class="page plant-info-page">
        <Map></Map>
        <div>
            <TotalData></TotalData>
            <TreeAge></TreeAge>
            <TeaVarieties></TeaVarieties>
        </div>
        <div>
            <PlantRank></PlantRank>
            <TeaFarm></TeaFarm>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Map from './Map'
    import PlantRank from './PlantRank'
    import TeaFarm from './TeaFarm'
    import TeaVarieties from './TeaVarieties'
    import TotalData from './TotalData'
    import TreeAge from './TreeAge'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'iot-index',
        components: {
            Map, PlantRank, TeaFarm, TeaVarieties, TotalData, TreeAge
        },
        computed: {
            ...mapState(['screenFullState'])
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_STAT_DATA)
            store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TREE_AGE_DATA)
            store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TEA_FARM_DATA)
            store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_TEA_VARIETIES_DATA)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/plant.scss';
</style>