<template>
    <router-link class="iconfont full-icon" tag="i" :to="link" v-html="full ? '&#xe73d;' : '&#xe73c;'"></router-link>
</template>
<script>
    export default {
        name: 'FullScreenButton',
        props: {
            link: {
                type: Object,
                default () {
                    return { path: '/' }
                }
            },
            full: {
                type: Boolean,
                default: false
            }
        }
    }
</script>