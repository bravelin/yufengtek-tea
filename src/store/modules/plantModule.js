import actions from '@/store/actions/plantActions'
import mutations from '@/store/mutations/plantMutations'

export default {
    namespaced: true,
    state: {
        infoData: [
            { name: '星村镇', value: [117.792448, 27.69912, 10] },
            { name: '兴田镇', value: [117.992448, 27.52912, 100] },
        ]
    },
    actions,
    mutations
}