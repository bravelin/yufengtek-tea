<template>
    <div class="plane" :class="{ 'full-screen' : full }">
        <i></i><i></i>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'Plane',
        props: {
            full: {
                type: Boolean,
                default: false
            }
        }
    }
</script>