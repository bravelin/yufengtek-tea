<!--总体数据-->
<template>
    <Plane class="total-data-wrap" :full="totalDataFullState">
        <PlaneTitle>总体数据</PlaneTitle>
        <div class="plane-content" :class="{ hide: !totalData.length }" v-if="totalData.length">
            <div>
                <h4>{{ totalData[0].data }}</h4>
                <div>{{ totalData[0].unit }}</div>
                <div>{{ totalData[0].label }}</div>
            </div>
            <div>
                <h4>{{ totalData[1].data }}</h4>
                <div>{{ totalData[1].unit }}</div>
                <div>{{ totalData[1].label }}</div>
            </div>
        </div>
        <div v-show="!totalData.length" class="iconfont null-data-tag">&#xe642;</div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.PLANT
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState
    const dataProp = 'totalData'
    const fullProp = 'totalDataFullState'

    export default {
        name: 'PlantTotalData',
        computed: {
            ...thisMapState([dataProp, fullProp]),
            miniScreen () {
                return this.$store.state.winWidth < 1380
            }
        },
        methods: {
            doFullStateChange (payload) {
                const that = this
                that.$store.commit(moduleNameSpace + '/' + types.PLANT_CHANGE_FULL_STATE, {
                    fullStateName: fullProp,
                    state: payload
                })
            }
        }
    }
</script>
