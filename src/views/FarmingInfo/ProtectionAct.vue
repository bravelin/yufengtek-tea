<!--植保活动-->
<template>
    <Plane class="protection-act-wrap act-wrap" :full="protectionFullState">
        <PlaneTitle>植保活动</PlaneTitle>
        <div class="plane-content">
            <ProtectionActPie></ProtectionActPie>
            <ProtectionActLine></ProtectionActLine>
        </div>
        <FullScreenButton :full="protectionFullState" @change="doFullStateChange"></FullScreenButton>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ProtectionActPie from './ProtectionActPie'
    import ProtectionActLine from './ProtectionActLine'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.FARMING
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const fullProp = 'protectionFullState'

    export default {
        name: 'farming-fertilizer-act',
        components: {
            ProtectionActPie, ProtectionActLine
        },
        computed: {
            ...thisMapState([fullProp])
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