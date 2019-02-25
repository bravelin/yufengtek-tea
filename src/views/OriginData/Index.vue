<template>
    <div class="page origin-page">
        <Map></Map>
        <div>
            <div>
                <CityRank></CityRank>
                <CountStat></CountStat>
            </div>
            <AddressList></AddressList>
        </div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import AddressList from './AddressList'
    import CityRank from './CityRank'
    import CountStat from './CountStat'
    import Map from './Map'

    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'origin-index',
        components: {
            Map, AddressList, CityRank, CountStat
        },
        computed: {
            ...mapState(['screenFullState'])
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/origin.scss';
</style>
