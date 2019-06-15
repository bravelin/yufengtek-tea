<template>
    <h2 class="plane-title" @click="doClick()"><slot></slot></h2>
</template>
<script>
    export default {
        name: 'PlaneTitle',
        methods: {
            doClick () { this.$emit('click') }
        }
    }
</script>