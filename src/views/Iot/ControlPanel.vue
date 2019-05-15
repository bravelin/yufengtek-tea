<template>
    <div class="control-panel" :class="{ active: controlButtonIsActive }" @click="doChangeStatus()">
        <div class="inner-control-panel">
            <div @click="doClick('ZoomIn', $event)">+</div>
            <div class="iconfont" @click="doClick('Stop', $event)">&#xe663;</div>
            <div @click="doClick('ZoomOut', $event)">-</div>
        </div>
        <div class="control-panel-top control-button" @click="doClick('ArrowUp', $event)"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-bottom control-button" @click="doClick('ArrowDown', $event)"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-left control-button" @click="doClick('ArrowLeft', $event)"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-right control-button" @click="doClick('ArrowRight', $event)"><i class=" iconfont">&#xe6ab;</i></div>
    </div>
</template>
<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { createNamespacedHelpers, mapState } from 'vuex'

    const moduleNameSpace = ns.IOT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'ControlPanel',
        computed: {
            ...thisMapState(['controlButtonIsActive'])
        },
        methods: {
            doClick (type, event) {
                event && event.stopPropagation()
                this.$emit('change', type)
            },
            doChangeStatus () {
                this.$store.commit(moduleNameSpace + '/' + types.CHANGE_CONTROL_BUTTON_STATUS, true)
            }
        }
    }
</script>
