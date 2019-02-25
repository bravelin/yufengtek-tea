import actions from '@/store/actions/originActions'
import mutations from '@/store/mutations/originMutations'
const tempDatas = [
    {
        date: '2018-10-16',
        list: [
            { time: '09:10', place: '江西省赣州市南康区东山大道110号', tel: '196****2202' },
            { time: '09:11', place: '广东省广州市南沙区五湖大道111号', tel: '196****2203' },
            { time: '09:12', place: '广东省广州市南沙区大道112号', tel: '196****2204' },
            { time: '09:13', place: '广东省广州市南沙区大道113号', tel: '196****2205' },
            { time: '09:14', place: '广东省广州市南沙区大道114号', tel: '196****2206' },
        ]
    },
    {
        date: '2018-10-15',
        list: [
            { time: '12:10', place: '江西省赣州市南康区东山大道110号', tel: '196****2202' },
            { time: '13:11', place: '江西省赣州市南康区东山大道111号', tel: '196****2203' },
            { time: '13:12', place: '江西省赣州市南康区东山大道112号', tel: '196****2204' },
            { time: '15:13', place: '江西省赣州市南康区东山大道113号', tel: '196****2205' },
            { time: '16:14', place: '江西省赣州市南康区东山大道114号', tel: '196****2206' },
        ]
    },
    {
        date: '2018-10-14',
        list: [
            { time: '12:10', place: '江西省赣州市南康区东山大道110号', tel: '196****2202' },
            { time: '13:11', place: '江西省赣州市南康区东山大道111号', tel: '196****2203' },
            { time: '13:12', place: '江西省赣州市南康区东山大道112号', tel: '196****2204' },
            { time: '15:13', place: '江西省赣州市南康区东山大道113号', tel: '196****2205' },
            { time: '16:14', place: '江西省赣州市南康区东山大道114号', tel: '196****2206' },
        ]
    },
    {
        date: '2018-10-13',
        list: [
            { time: '12:10', place: '江西省赣州市南康区东山大道110号', tel: '196****2202' },
            { time: '13:11', place: '江西省赣州市南康区东山大道111号', tel: '196****2203' },
            { time: '13:12', place: '江西省赣州市南康区东山大道112号', tel: '196****2204' },
            { time: '15:13', place: '江西省赣州市南康区东山大道113号', tel: '196****2205' },
            { time: '16:14', place: '江西省赣州市南康区东山大道114号', tel: '196****2206' },
        ]
    }
]

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
        ],
        countStatDatas: [ // 溯源次数统计
            { label: '1月', value: 224 },
            { label: '2月', value: 334 },
            { label: '3月', value: 552 },
            { label: '4月', value: 661 },
            { label: '5月', value: 741 },
            { label: '6月', value: 356 },
            { label: '7月', value: 471 },
            { label: '8月', value: 308 },
            { label: '9月', value: 224 },
            { label: '10月', value: 781 }
        ],
        addressList: tempDatas,
        mapDatas: [
            { name: '大庆', value: [125.03, 46.58, 112] },
            { name: '武汉', value: [114.31, 30.52, 693] },
            { name: '合肥', value: [117.27, 31.86, 256] },
            { name: '菏泽', value: [115.480656, 35.23375, 364] },
            { name: '廊坊', value: [116.7, 39.53, 455] },
            { name: '衢州', value: [118.88, 28.97, 102] },
            { name: '长沙', value: [113, 28.21, 95] },
            { name: '秦皇岛', value: [119.57, 39.95, 475] },
            { name: '荆州', value: [112.239741, 30.335165, 147] },
        ]
    },
    actions,
    mutations
}