<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <Title></Title>
        <div class="app-wrap" :style="{ height: pageHeight + 'px' }">
            <div>
                <Iot></Iot>
                <FarmingInfo></FarmingInfo>
                <TeaMakingInfo></TeaMakingInfo>
            </div>
            <div>
                <PlantInfo></PlantInfo>
                <Warehouse></Warehouse>
            </div>
            <div>
                <OriginData></OriginData>
                <WeatherInfo></WeatherInfo>
                <OutputValue></OutputValue>
            </div>
        </div>
        <router-view :style="{ height: pageHeight + 'px' }" style="display: none"/>
        <Spinner v-show="loading"></Spinner>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner'
    import Title from '@/views/Title'
    import Iot from '@/views/Iot'
    import FarmingInfo from '@/views/FarmingInfo'
    import TeaMakingInfo from '@/views/TeaMakingInfo'
    import PlantInfo from '@/views/PlantInfo'
    import Warehouse from '@/views/Warehouse'
    import OriginData from '@/views/OriginData'
    import WeatherInfo from '@/views/WeatherInfo'
    import OutputValue from '@/views/OutputValue'
    import Api from '@/lib/api'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'

    export default {
        name: 'app',
        components: {
            Spinner, Title, Iot, FarmingInfo, TeaMakingInfo, PlantInfo, Warehouse, OriginData, WeatherInfo, OutputValue
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapState(['loading', 'winHeight', 'chartFullPage']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 68
                return h > 720 ? h : 720
            }
        },
        created () {
            const that = this
            const store = that.$store
            const win = window
            // 监听窗口大小的改变
            win.addEventListener('resize', () => {
                store.commit(types.GET_WINDOW_SIZE)
            })
            store.commit(types.GET_WINDOW_SIZE)
        }
    }
</script>
<style lang="scss">
    @import './style/common/app.scss';
</style>
