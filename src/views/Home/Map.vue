<!--种植分布-->
<template>
    <Plane class="plant-distribute-wrap no-border" :full="mapFullState">
        <WuyishanMap @change="doMapChange" :curr="currSelectedRegion" :full="mapFullState"></WuyishanMap>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers, mapState } from 'vuex'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import WuyishanMap from '@/components/WuyishanMap'

    const moduleNameSpace = ns.HOME
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullProp = 'mapFullState'

    export default {
        name: 'HomeMap',
        components: {
            WuyishanMap
        },
        computed: {
            ...thisMapState(['currSelectedRegion', fullProp])
        },
        methods: {
            doMapChange (place) {
                const that = this
                const store = that.$store
                store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_CURR_REGION, place)
                store.dispatch(moduleNameSpace + '/' + types.HOME_GET_DATA, place)
            },
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.HOME_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>