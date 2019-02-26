<template>
    <div class="page home-page">
        <div>
            <AmountRank></AmountRank>
            <FarmingInfo></FarmingInfo>
            <PickInfo></PickInfo>
        </div>
        <div>
            <PlantInfo></PlantInfo>
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
    import PlantInfo from './PlantInfo'
    import WarehouseInfo from './WarehouseInfo'
    import AmountRank from './AmountRank'
    import PickInfo from './PickInfo'
    import LevelInfo from './LevelInfo'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'home-index',
        components: {
            FarmingInfo, Iot, OriginData, PlantInfo, WarehouseInfo, AmountRank, PickInfo, LevelInfo
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_AMOUNT_RANK_DATA)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_FARMING_ACT_DATA)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_PICK_DATA)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_WAREHOUSE_DATA)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_CITY_DATA)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_MONITOR_AMOUNT)
            store.dispatch(moduleNameSpace + '/' + types.HOME_GET_TEA_LEVEL_DATA)
        }
    }
</script>
<style lang="scss">
    @import '../../style/views/home.scss';
</style>
