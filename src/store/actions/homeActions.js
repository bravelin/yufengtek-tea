import types from '@/store/constants/types'
const amountRankOriginData = [
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
]
const Num = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
export default {
    // 获取茶树排行数据
    [types.HOME_GET_AMOUNT_RANK_DATA] (context) {
        setTimeout(() => {
            if (context.state.currSelectedRegion == '') {
                context.state.amountRankDatas = amountRankOriginData.sort((a, b) => { return a.data > b.data ? 1 : -1 })
            } else {
                let list = Num.map(item => {
                    return { place: '公司' + item, data: parseInt(Math.random() * 1500) }
                })
                list.sort((a, b) => { return a.data > b.data ? 1 : -1 })
                context.state.amountRankDatas = list
            }
        }, 600)
    },
    // 获取施肥比例数据
    [types.HOME_GET_FARMING_ACT_DATA] (context) {
        const tempData = [{ label: '有机肥', value: 32 }, { label: '无机肥', value: 22 }, { label: '饼肥', value: 46 }, { label: '复合肥', value: 26 }]
        setTimeout(() => {
            context.state.farmingActdatas = tempData.map(item => {
                return { label: item.label, value: parseInt(100 * Math.random()) }
            })
        }, 700)
    },
    // 获取采摘数据
    [types.HOME_GET_PICK_DATA] (context) {
        const tempData = [{ label: '大红袍', value: 292 }, { label: '奇种', value: 495 }, { label: '肉桂', value: 742 }, { label: '水仙', value: 1035 }, { label: '名枞', value: 535 }]
        setTimeout(() => {
            let total = 0
            let data = 0
            let baseData = context.state.currSelectedRegion == '' ? 1000 : 400
            context.state.pickDatas = tempData.map(item => {
                data = parseInt(baseData * Math.random())
                total += data
                return { label: item.label, value: data }
            })
            context.state.teaTotalAmount = total
        }, 400)
    },
    // 获取出库入库数据
    [types.HOME_GET_WAREHOUSE_DATA] (context) {
        const tempData = [
            { date: '1月', in: 1380, out: 1140 },
            { date: '2月', in: 580, out: 654 },
            { date: '3月', in: 880, out: 741 },
            { date: '4月', in: 254, out: 365 },
            { date: '5月', in: 630, out: 470 },
            { date: '6月', in: 471, out: 369 },
            { date: '7月', in: 1120, out: 874 },
            { date: '8月', in: 635, out: 147 },
            { date: '9月', in: 208, out: 259 },
            { date: '10月', in: 544, out: 998 },
            { date: '11月', in: 639, out: 657 },
            { date: '12月', in: 479, out: 759 }
        ]
        setTimeout(() => {
            let baseData = context.state.currSelectedRegion == '' ? 1500 : 400
            context.state.warehouseDatas = tempData.map(item => {
                return {
                    date: item.date,
                    in: parseInt(baseData * Math.random()) + 50,
                    out: parseInt(baseData * Math.random()) + 50
                }
            })
        }, 1000)
    },
    // 获取城市溯源数据
    [types.HOME_GET_CITY_DATA] (context) {
        const tempData = [
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
        setTimeout(() => {
            let baseData = context.state.currSelectedRegion == '' ? 360 : 90
            context.state.cityDatas = tempData.map(item => {
                return { name: item.name, value: parseInt(baseData * Math.random()) }
            })
        }, 200)
    },
    // 获取监控设备数据
    [types.HOME_GET_MONITOR_AMOUNT] (context) {
        setTimeout(() => {
            let baseData = context.state.currSelectedRegion == '' ? 600 : 100
            context.state.cameraAmount = parseInt(baseData * Math.random()) + 50
            context.state.monitorAmount = parseInt(baseData * Math.random()) + 30
        }, 250)
    },
    // 获取制茶等级数据
    [types.HOME_GET_TEA_LEVEL_DATA] (context) {
        const tempData = [
            { label: '大师级', value: 292 },
            { label: '特级', value: 495 },
            { label: '一级', value: 742 },
            { label: '二级', value: 1035 }
        ]
        setTimeout(() => {
            let baseData = context.state.currSelectedRegion == '' ? 1400 : 500
            context.state.levelDatas = tempData.map(item => {
                return {
                    label: item.label,
                    value: parseInt(baseData * Math.random()) + 30
                }
            })
        }, 600)
    }
}
