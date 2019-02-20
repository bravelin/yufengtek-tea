import actions from '@/store/actions/originActions'
import mutations from '@/store/mutations/originMutations'

export default {
    namespaced: true,
    state: {
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
        ]
    },
    actions,
    mutations
}