<template>
    <div class="page farming-info-page">
        <Map></Map>
        <div>
            <PlantAct></PlantAct>
            <FertilizerAct></FertilizerAct>
            <ProtectionAct></ProtectionAct>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import Map from './Map'
    import PlantAct from './PlantAct'
    import FertilizerAct from './FertilizerAct'
    import ProtectionAct from './ProtectionAct'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'farming-info-index',
        components: {
            Map, PlantAct, FertilizerAct, ProtectionAct
        },
        computed: {
            ...mapState(['screenFullState'])
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_PLANT_ACT_DATA)
            store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_FERTILIZER_ACT_DATA)
            store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_PROTECTION_ACT_DATA)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/farming.scss';
</style>
