import actions from '@/store/actions/teaMakingActions'
import mutations from '@/store/mutations/teaMakingMutations'

export default {
    namespaced: true,
    state: {
        totalAmount: 2564,
        makingDatas: [
            { label: '大师级', value: 292 },
            { label: '特级', value: 495 },
            { label: '一级', value: 742 },
            { label: '二级', value: 1035 }
        ]
    },
    actions,
    mutations
}