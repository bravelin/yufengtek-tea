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
        name: 'PlantIndex',
        components: {
            Map, PlantRank, TeaFarm, TeaVarieties, TotalData, TreeAge
        },
        computed: {
            ...mapState(['screenFullState'])
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.PLANT_GET_DATA)
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_CURR_REGION, '')
            const fullProps = ['totalDataFullState', 'treeAgeFullState', 'teaVarietiesFullState', 'plantRankFullState', 'teaFarmFullState', 'mapFullState']
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/plant.scss';
</style>