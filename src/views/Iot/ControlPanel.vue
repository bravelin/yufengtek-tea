<template>
    <div class="control-panel">
        <div class="inner-control-panel">
            <div @click="doClick('ZoomIn')">+</div>
            <div class="iconfont" @click="doClick('Stop')">&#xe663;</div>
            <div @click="doClick('ZoomOut')">-</div>
        </div>
        <div class="control-panel-top control-button" @click="doClick('ArrowUp')"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-bottom control-button" @click="doClick('ArrowDown')"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-left control-button" @click="doClick('ArrowLeft')"><i class=" iconfont">&#xe6ab;</i></div>
        <div class="control-panel-right control-button" @click="doClick('ArrowRight')"><i class=" iconfont">&#xe6ab;</i></div>
    </div>
</template>
<script>
    export default {
        name: 'ControlPanel',
        methods: {
            doClick (type) {
                this.$emit('change', type)
            }
        }
    }
</script>
