<!--施肥活动-->
<template>
    <Plane class="fertilizer-act-wrap act-wrap" :full="fertilizerFullState">
        <PlaneTitle>施肥活动<div class="unit">单位：吨</div></PlaneTitle>
        <div class="plane-content">
            <FertilizerActPie></FertilizerActPie>
            <FertilizerActLine></FertilizerActLine>
        </div>
        <PlaneTools :full="fertilizerFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import FertilizerActPie from './FertilizerActPie'
    import FertilizerActLine from './FertilizerActLine'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullProp = 'fertilizerFullState'

    export default {
        name: 'farming-fertilizer-act',
        computed: {
            ...thisMapState([fullProp])
        },
        components: {
            FertilizerActPie, FertilizerActLine
        },
        methods: {
            // full state change
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.FARMING_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
