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
            store.dispatch(moduleNameSpace + '/' + types.FARMING_GET_ACT_DATA)
            store.commit(types.SWITCH_LOADING, false)
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            store.commit(moduleNameSpace + '/' + types.FARMING_CHANGE_CURR_REGION, '')
            const fullProps = ['plantFullState', 'protectionFullState', 'fertilizerFullState', 'mapFullState']
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.FARMING_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/farming.scss';
</style>
