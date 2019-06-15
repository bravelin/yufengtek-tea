<!--施肥活动-->
<template>
    <Plane class="fertilizer-act-wrap act-wrap" :full="fertilizerFullState">
        <PlaneTitle>施肥活动<div class="unit" v-show="fertilizerActLineDatas.length && fertilizerActPieDatas.length">单位：吨</div></PlaneTitle>
        <div class="plane-content" :class="{ hide: !fertilizerActLineDatas.length || !fertilizerActPieDatas.length }">
            <FertilizerActPie></FertilizerActPie>
            <FertilizerActLine></FertilizerActLine>
        </div>
        <PlaneTools :full="fertilizerFullState" @change="doFullStateChange" v-show="fertilizerActLineDatas.length && fertilizerActPieDatas.length"></PlaneTools>
        <div v-show="!fertilizerActLineDatas.length || !fertilizerActPieDatas.length" class="iconfont null-data-tag">&#xe642;</div>
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
    const dataProp1 = 'fertilizerActLineDatas'
    const dataProp2 = 'fertilizerActPieDatas'

    export default {
        name: 'farming-fertilizer-act',
        computed: {
            ...thisMapState([fullProp, dataProp1, dataProp2])
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
