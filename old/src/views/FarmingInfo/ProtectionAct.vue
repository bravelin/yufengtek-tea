<!--植保活动-->
<template>
    <Plane class="protection-act-wrap act-wrap" :full="protectionFullState">
        <PlaneTitle>植保活动<div class="unit" v-show="protectionActLineDatas.length && protectionActPieDatas.length">单位：亩</div></PlaneTitle>
        <div class="plane-content" :class="{ hide: !protectionActLineDatas.length || !protectionActPieDatas.length }">
            <ProtectionActPie></ProtectionActPie>
            <ProtectionActLine></ProtectionActLine>
        </div>
        <PlaneTools :full="protectionFullState" @change="doFullStateChange" v-show="protectionActLineDatas.length && protectionActPieDatas.length"></PlaneTools>
        <div v-show="!protectionActLineDatas.length || !protectionActPieDatas.length" class="iconfont null-data-tag">&#xe642;</div>
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
    const dataProp1 = 'protectionActLineDatas'
    const dataProp2 = 'protectionActPieDatas'

    export default {
        name: 'farming-fertilizer-act',
        components: {
            ProtectionActPie, ProtectionActLine
        },
        computed: {
            ...thisMapState([fullProp, dataProp1, dataProp2])
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
