<!--出入库信息-->
<template>
    <Plane class="in-out-circle-wrap">
        <PlaneTitle>今日出入库信息</PlaneTitle>
        <div class="plane-content">
            <ul class="data-list">
                <li>
                    <div>{{ toDayInAmount }}<span>吨</span></div>
                    <div>入库</div>
                    <div>今日入库信息</div>
                </li>
                <li>
                    <div>{{ toDayOutAmount }}<span>吨</span></div>
                    <div>出库</div>
                    <div>今日出库信息</div>
                </li>
                <li>
                    <div>{{ stockWeight }}<span>吨</span></div>
                    <div>库存</div>
                    <div>剩余库存</div>
                </li>
            </ul>
        </div>
    </Plane>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import ns from '@/store/constants/ns'
    import echarts from '@/lib/echarts'
    import types from '@/store/constants/types'

    const moduleNameSpace = ns.WAREHOUSE
    const thisMapState = createNamespacedHelpers(moduleNameSpace).mapState

    export default {
        name: 'WarehouseInOutCircle',
        computed: {
            ...thisMapState(['toDayInAmount', 'toDayOutAmount', 'stockWeight']),
            miniScreen () {
                return this.$store.state.winWidth < 1380
            }
        }
    }
</script>
