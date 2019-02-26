import types from '@/store/constants/types'
export default {
    [types.FARMING_GET_PLANT_ACT_DATA] (context) {
        const tempData1 = [
            { label: '大红袍', value: 292 },
            { label: '奇种', value: 495 },
            { label: '肉桂', value: 742 },
            { label: '水仙', value: 1035 },
            { label: '名枞', value: 535 }
        ]
        const tempData2 = [
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
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1200 : 500
            context.state.plantActPieDatas = tempData1.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
            context.state.plantActLineDatas = tempData2.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
        }, 500)
    },
    [types.FARMING_GET_FERTILIZER_ACT_DATA] (context) {
        const tempData1 = [
            { label: '有机肥', value: 192 },
            { label: '无机肥', value: 405 },
            { label: '饼肥', value: 742 },
            { label: '复合肥', value: 435 }
        ]
        const tempData2 = [
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
        ]
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1200 : 500
            context.state.fertilizerActPieDatas = tempData1.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
            context.state.fertilizerActLineDatas = tempData2.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
        }, 500)
    },
    [types.FARMING_GET_PROTECTION_ACT_DATA] (context) {
        const tempData1 = [{ label: '虫害', value: 292 }, { label: '病害', value: 455 }]
        const tempData2 = [
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
        setTimeout(() => {
            const baseData = context.state.currSelectedRegion == '' ? 1200 : 500
            context.state.protectionActPieDatas = tempData1.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
            context.state.protectionActLineDatas = tempData2.map(item => {
                return {
                    label: item.label, value: parseInt(baseData * Math.random())
                }
            })
        }, 500)
    }
}
