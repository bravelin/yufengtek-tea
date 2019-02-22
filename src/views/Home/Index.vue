<template>
    <div class="page home-page">
        <div>
            <AmountRank></AmountRank>
            <FarmingInfo></FarmingInfo>
            <InWarehouse></InWarehouse>
        </div>
        <div>
            <PlantInfo></PlantInfo>
            <Plane class="tea-making-wrap">
                <div class="wrap-title">
                    <PlaneTitle>采摘信息</PlaneTitle>
                    <PlaneTitle>制茶等级</PlaneTitle>
                </div>
                <div class="charts">
                    <PickInfo></PickInfo>
                    <LevelInfo></LevelInfo>
                </div>
            </Plane>
        </div>
        <div>
            <OriginData></OriginData>
            <Iot></Iot>
            <OutWarehouse></OutWarehouse>
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
    import InWarehouse from './InWarehouse'
    import OutWarehouse from './OutWarehouse'
    import AmountRank from './AmountRank'
    import PickInfo from './PickInfo'
    import LevelInfo from './LevelInfo'
    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'home-index',
        components: {
            FarmingInfo, Iot, OriginData, PlantInfo, InWarehouse, OutWarehouse, AmountRank, PickInfo, LevelInfo
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
        }
    }
</script>
<style lang="scss">
    @import '../../style/views/home.scss';
</style>
