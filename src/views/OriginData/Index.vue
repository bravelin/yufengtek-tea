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
    import config from '@/lib/config'

    const moduleNameSpace = ns.ORIGIN
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'origin-index',
        components: {
            Map, AddressList, CityRank, CountStat
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_SCREEN_FULL, true)
            store.commit(types.SWITCH_LOADING, false)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_DATA)
            store.dispatch(moduleNameSpace + '/' + types.GET_ORIGIN_LIST_DATA, { currentPage: 1 })
        },
        beforeDestroy () {
            const that = this
            const store = that.$store
            const fullProps = ['cityRankFullState', 'countStateFullState', 'mapFullState']
            fullProps.forEach(prop => {
                store.commit(moduleNameSpace + '/' + types.ORIGIN_CHANGE_FULL_STATE, {
                    fullStateName: prop,
                    state: false
                })
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/origin.scss';
</style>
