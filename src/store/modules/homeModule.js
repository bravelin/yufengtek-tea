import actions from '@/store/actions/homeActions'
import mutations from '@/store/mutations/homeMutations'

export default {
    namespaced: true,
    state: {
        cameraAmount: 369,
        monitorAmount: 457,
        teaTotalAmount: 2564,
        farmingActdatas: [{ label: '种植', value: 32 }, { label: '施肥', value: 22 }, { label: '植保', value: 46 }],
        pickDatas: [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ],
        // 等级
        levelDatas: [
            { label: '大师级', value: 292 },
            { label: '特级', value: 495 },
            { label: '一级', value: 742 },
            { label: '二级', value: 1035 }
        ],
        // 茶树排行
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
        warehouseUnit: '吨',
        // 入库数据
        inWarehouseDatas: [
            { date: '1月', data: 1380 },
            { date: '2月', data: 1120 },
            { date: '3月', data: 590 },
            { date: '4月', data: 663 },
            { date: '5月', data: 356 },
            { date: '6月', data: 100 },
            { date: '7月', data: 1298 },
            { date: '8月', data: 990 },
            { date: '9月', data: 798 }
        ],
        // 出库数据
        outWarehouseDatas: [
            { date: '1月', data: 1080 },
            { date: '2月', data: 1020 },
            { date: '3月', data: 520 },
            { date: '4月', data: 660 },
            { date: '5月', data: 356 },
            { date: '6月', data: 100 },
            { date: '7月', data: 1198 },
            { date: '8月', data: 970 },
            { date: '9月', data: 790 }
        ],
        cityDatas: [
            { name: '北京市', value: 53 },
            { name: '天津市', value: 13 },
            { name: '南昌市', value: 15 },
            { name: '南宁市', value: 6 },
            { name: '武夷山市', value: 223 },
            { name: '深圳市', value: 53 },
            { name: '赣州市', value: 43 },
            { name: '南京市', value: 123 },
            { name: '抚州市', value: 43 },
            { name: '福州市', value: 22 },
            { name: '厦门市', value: 69 },
            { name: '上海市', value: 111 },
            { name: '苏州市', value: 200 },
            { name: '兰州市', value: 31 },
            { name: '齐齐哈尔市', value: 53 },
            { name: '广州', value: 323 },
            { name: '惠州市', value: 93 },
            { name: '河源市', value: 83 },
            { name: '长沙市', value: 143 },
            { name: '武汉市', value: 323 },
            { name: '石家庄市', value: 23 },
            { name: '太原市', value: 99 },
            { name: '杭州市', value: 88 },
            { name: '镇江市', value: 222 },
            { name: '鹰潭市', value: 103 },
            { name: '瑞金市', value: 53 },
            { name: '遵义市', value: 253 },
            { name: '贵阳市', value: 43 },
            { name: '昆明市', value: 13 },
            { name: '拉萨市', value: 63 },
            { name: '保定市', value: 39 },
            { name: '邯郸市', value: 45 },
        ],
        plantInfoData: [
            { name: '星村镇', value: [117.792448, 27.69912, 10] },
            { name: '兴田镇', value: [117.992448, 27.52912, 100] },
        ]
    },
    actions,
    mutations
}