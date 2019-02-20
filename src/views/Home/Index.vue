<template>
    <div class="page home-page">
    </div>
</template>

<script>
    import Api from '@/lib/api'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'
    const moduleNameSpace = ns.HOME

    export default {
        name: 'Home',
        components: {
        },
        computed: {
        },
        data () {
            return {
            }
        },
        created () {
            const that = this
            that.$store.commit(types.SWITCH_LOADING, false)
        },
        activated () {
            const that = this
            that.$store.commit(types.SWITCH_LOADING, false)
        },
        deactivated () {
            console.log('deactivated......')
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.$store.commit(types.SWITCH_LOADING, false)
            })
        },
        methods: {
        },
        beforeDestroy () {
            const store = this.$store
        }
    }
</script>

<style lang="scss">
    @import '@/style/views/home.scss';
</style>
