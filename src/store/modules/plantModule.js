import actions from '@/store/actions/plantActions'
import mutations from '@/store/mutations/plantMutations'

export default {
    namespaced: true,
    state: {
        plantInfoData: [
            { name: '星村镇', value: [117.792448, 27.69912, 10] },
            { name: '兴田镇', value: [117.992448, 27.52912, 100] },
        ],
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
            { place: '新丰街道', data: 200 }
        ],
        // 山场品质
        farmTotalArea: 4438,
        teaFarmTypeDatas: [
            { label: '高山', value: 2566 },
            { label: '半岩', value: 895 },
            { label: '正岩', value: 442 },
            { label: '其他', value: 535 }
        ],
        // 茶树品种
        varietiesTotalData: 2564,
        varietiesDatas: [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ],
        treeAgeDistributeUnit: '亩',
        treeAgeDistributeDatas: [
            { place: '3-4年', data: 1200 },
            { place: '5-8年', data: 3120 },
            { place: '9-20年', data: 5033 },
            { place: '20年以上', data: 982 }
        ],
        totalData: [
            { label: '茶园总数', data: '1322', unit: '家' },
            { label: '茶园面积', data: '14.2万', unit: '亩' },
            { label: '预估产量', data: '1988', unit: '吨' }
        ]
    },
    actions,
    mutations
}