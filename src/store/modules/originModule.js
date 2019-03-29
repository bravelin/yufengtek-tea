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
        cityDatas: [],
        countStatDatas: [], // 溯源次数统计,
        addressList: [], // 溯源地址数据
        totalPage: 1, // 溯源地址总页数
        currentPage: 1, // 溯源地址当前页
        originDate: '', // 选择日期时间
        websocket: null,
        mapDatas: [],
        mapFullState: false,
        cityRankFullState: false,
        countStateFullState: false
    },
    actions,
    mutations
}