import actions from '@/store/actions/farmingActions'
import mutations from '@/store/mutations/farmingMutations'

export default {
    namespaced: true,
    state: {
        farmingActdatas: [{ label: '种植', value: 32 }, { label: '施肥', value: 22 }, { label: '植保', value: 46 }]
    },
    actions,
    mutations
}