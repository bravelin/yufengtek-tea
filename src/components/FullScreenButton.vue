<template>
    <i class="iconfont full-icon" v-html="full ? '&#xe621;' : '&#xe629;'" @click="change()"></i>
</template>
<script>
    export default {
        name: 'FullScreenButton',
        props: {
            full: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            change () {
                const that = this
                that.$emit('change', !that.full)
            }
        }
    }
</script>