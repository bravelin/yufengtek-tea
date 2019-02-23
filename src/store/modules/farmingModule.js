import actions from '@/store/actions/farmingActions'
import mutations from '@/store/mutations/farmingMutations'

export default {
    namespaced: true,
    state: {
        mapInfoData: [
            { name: '星村镇', value: [117.792448, 27.69912, 10] },
            { name: '兴田镇', value: [117.992448, 27.52912, 100] },
        ],
        plantActPieDatas: [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ],
        plantActLineDatas: [
            { label: '1月', value: 55 },
            { label: '2月', value: 257 },
            { label: '3月', value: 95 },
            { label: '4月', value: 350 },
            { label: '5月', value: 651 },
            { label: '6月', value: 752 },
            { label: '7月', value: 154 },
            { label: '8月', value: 255 },
            { label: '9月', value: 85 },
            { label: '10月', value: 123 }
        ],
        fertilizerActPieDatas: [
            { label: '大红袍', value: 192 },
            { label: '奇种', value: 405 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 435 },
            { label: '名枞', value: 935 }
        ],
        fertilizerActLineDatas: [
            { label: '1月', value: 655 },
            { label: '2月', value: 207 },
            { label: '3月', value: 195 },
            { label: '4月', value: 50 },
            { label: '5月', value: 251 },
            { label: '6月', value: 552 },
            { label: '7月', value: 254 },
            { label: '8月', value: 355 },
            { label: '9月', value: 285 },
            { label: '10月', value: 423 }
        ],
        protectionActPieDatas: [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 455 },
            { label: '肉桂', value: 242 },
            { label: '水仙', value: 135 },
            { label: '名枞', value: 435 }
        ],
        protectionActLineDatas: [
            { label: '1月', value: 105 },
            { label: '2月', value: 267 },
            { label: '3月', value: 595 },
            { label: '4月', value: 502 },
            { label: '5月', value: 351 },
            { label: '6月', value: 152 },
            { label: '7月', value: 654 },
            { label: '8月', value: 555 },
            { label: '9月', value: 385 },
            { label: '10月', value: 623 }
        ]
    },
    actions,
    mutations
}