<!--种植活动-->
<template>
    <Plane class="plant-act-wrap act-wrap" :full="plantFullState">
        <PlaneTitle>种植活动<div class="unit">单位：亩</div></PlaneTitle>
        <div class="plane-content">
            <PlantActPie></PlantActPie>
            <PlantActLine></PlantActLine>
        </div>
        <PlaneTools :full="plantFullState" @change="doFullStateChange"></PlaneTools>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import PlantActPie from './PlantActPie'
    import PlantActLine from './PlantActLine'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'

    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullProp = 'plantFullState'

    export default {
        name: 'farming-plant-act',
        computed: {
            ...thisMapState([fullProp])
        },
        components: {
            PlantActPie, PlantActLine
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
