<template>
    <div class="page home-page">
        <div>
            <AmountRank></AmountRank>
            <FarmingInfo></FarmingInfo>
            <PickInfo></PickInfo>
        </div>
        <div>
            <Map></Map>
            <WarehouseInfo></WarehouseInfo>
        </div>
        <div>
            <OriginData></OriginData>
            <Iot></Iot>
            <LevelInfo></LevelInfo>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import FarmingInfo from './FarmingInfo'
    import Iot from './Iot'
    import OriginData from './OriginData'
    import Map from './Map'
    import WarehouseInfo from './WarehouseInfo'
    import AmountRank from './AmountRank'
    import PickInfo from './PickInfo'
    import LevelInfo from './LevelInfo'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'HomeIndex',
        components: {
            FarmingInfo, Iot, OriginData, Map, WarehouseInfo, AmountRank, PickInfo, LevelInfo
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_DATA)
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_CURR_REGION, '')
            const fullProps = ['mapFullState', 'amountRankFullState', 'farmingInfoFullState', 'pickInfoFullState', 'warehouseFullState', 'originDataFullState', 'levelInfoFullState']
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '../../style/views/home.scss';
</style>
