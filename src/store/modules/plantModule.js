import actions from '@/store/actions/plantActions'
import mutations from '@/store/mutations/plantMutations'

export default {
    namespaced: true,
    state: {
        currSelectedRegion: '',
        // 茶树种植排行
        amountRankUnit: '亩',
        amountRankDatas: [
            { place: '星村镇', data: 1200 },
            { place: '五夫镇', data: 1120 },
            { place: '上梅乡', data: 1033 },
            { place: '杨庄乡', data: 982 },
            { place: '兴田镇', data: 900 },
            { place: '岚谷乡', data: 890 },
            { place: '吴屯乡', data: 721 },
            { place: '崇安街道', data: 523 },
            { place: '武夷街道', data: 356 },
            { place: '新丰街道', data: 280 }
        ],
        // 山场品质
        farmTotalArea: 0,
        teaFarmTypeDatas: [],

        // 茶树品种
        varietiesTotalData: 0,
        varietiesDatas: [],
        treeAgeDistributeUnit: '亩',
        treeAgeDistributeDatas: [],
        totalData: [],

        // 全屏状态控制
        totalDataFullState: false,
        treeAgeFullState: false,
        teaVarietiesFullState: false,
        plantRankFullState: false,
        teaFarmFullState: false,
        mapFullState: false
    },
    actions,
    mutations
}