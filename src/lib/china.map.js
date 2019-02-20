/**
 * 扩展echarts的map,中国和省两级
 */
import ajax from '@/lib/ajax'
import { jsonMap, placeMap } from '@/lib/geo.map'
import config from '@/lib/config'
const echarts = require('@/lib/echarts')
const InitMapName = '中国' // 初始地图

echarts.default.extendsMap = function (dom, options) {
    const chart = this.init(dom)
    chart.currMapName = '' // 当前Map名称
    const defaultOpt = {
        mapName: 'china', // 地图展示
        goDown: false, // 是否下钻
        bgColor: '#15467d', // 画布背景色
        activeArea: [], // 区域高亮
        data: []
    }
    if (options) {
        options = this.util.extend(defaultOpt, options)
    }
    // 层级索引
    let name = [options.mapName]
    let idx = 0
    let pos = { leftPlus: 90, leftCur: 90, left: 50, top: 160 }
    let style = {
        font: '16px "Microsoft YaHei"',
        textColor: '#eee',
        lineColor: '#2f90cd'
    }
    const handleEvents = {
        resetOption (i, o, n) {
            const breadcrumb = this.createBreadcrumb(n)
            let j = name.indexOf(n)
            let l = o.graphic.length
            let w = 102
            if (n.length == 3) {
                w = 118
            }
            if (j < 0) {
                o.graphic.push(breadcrumb)
                o.graphic[0].children[0].shape.x2 = w
                o.graphic[0].children[1].shape.x2 = w
                if (o.graphic.length > 2) {
                    let cityData = []
                    let cityJson
                    for (let x = 0; x < options.data.length; x++) {
                        if (n === options.data[x].city) {
                            options.data[x].forEach((data, index) => {
                                cityJson = { city: data.city, name: data.name, value: data.value, crew: data.crew, company: data.company, position: data.position, region: data.region }
                                cityData.push(cityJson)
                            })
                        }
                    }
                    if (cityData != null) {
                        // o.series[0].data = handleEvents.initSeriesData(cityData)
                    } else {
                        o.series[0].data = []
                    }
                }
                name.push(n)
                idx++
            } else {
                o.graphic.splice(j + 2, l)
                if (o.graphic.length <= 2) {
                    o.graphic[0].children[0].shape.x2 = 44
                    o.graphic[0].children[1].shape.x2 = 44
                }
                name.splice(j + 1, l)
                idx = j
            }
            o.geo.map = n
            o.geo.zoom = 0.4
            chart.clear()
            chart.setOption(o)
            this.zoomAnimation()
            chart.currMapName = n
            options.callback(n, placeMap[n], o, chart)
        },
        createBreadcrumb (name) {
            const breadcrumb = {
                type: 'group',
                id: name,
                left: 100,
                top: pos.top + 7,
                zlevel: 0,
                children: [{
                    type: 'text',
                    left: -68,
                    top: 'middle',
                    style: {
                        text: '·',
                        textAlign: 'center',
                        fill: style.textColor,
                        font: 'bold 16px "Microsoft YaHei"'
                    }
                }, {
                    type: 'text',
                    left: -52,
                    top: 'middle',
                    style: {
                        text: name,
                        textAlign: 'center',
                        fill: style.textColor,
                        font: style.font
                    }
                    // onclick () {
                    //     let name = this.style.text
                    //     handleEvents.resetOption(chart, option, name)
                    // }
                }]
            }
            return breadcrumb
        },
        zoomAnimation () {
            let count = null
            const zoom = function (per) {
                if (!count) {
                    count = per
                }
                count = count + per
                chart.setOption({ geo: { zoom: count } })
                if (count < 1) {
                    window.requestAnimationFrame(() => {
                        zoom(0.2)
                    })
                }
            }
            window.requestAnimationFrame(() => {
                zoom(0.2)
            })
        }
    }
    const option = {
        backgroundColor: options.bgColor,
        graphic: [{
            type: 'group',
            left: pos.left,
            top: pos.top - 5,
            z: 9999,
            zlevel: 0,
            children: [
                {
                    type: 'line',
                    left: 0,
                    top: -38,
                    shape: { x1: 0, y1: 0, x2: 44, y2: 0 },
                    style: { stroke: style.lineColor, lineWidth: 3 },
                    z: 99999
                }, {
                    type: 'line',
                    left: 0,
                    top: -5,
                    shape: { x1: 0, y1: 0, x2: 44, y2: 0 },
                    style: { stroke: style.lineColor, lineWidth: 3 }
                }]
            }, {
                id: name[idx],
                type: 'group',
                left: pos.left + 6,
                top: pos.top + 7,
                zlevel: 0,
                children: [{
                    type: 'text',
                    left: 5,
                    top: 'middle',
                    style: {
                        text: InitMapName,
                        textAlign: 'center',
                        fill: style.textColor,
                        font: style.font
                    },
                    onclick () {
                        if (chart.currMapName != InitMapName) {
                            handleEvents.resetOption(chart, option, InitMapName)
                        }
                    }
                }
            ]
        }],
        geo: {
            map: options.mapName,
            roam: true,
            zoom: 1,
            zlevel: 1,
            label: {
                normal: {
                    show: true,
                    textStyle: { color: '#fff', fontSize: 12 }
                },
                emphasis: {
                    textStyle: { color: '#fff' }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#2f90cd',
                    borderWidth: 1,
                    areaColor: '#15467d'
                },
                emphasis: {
                    areaColor: '#389BB7', borderWidth: 0
                }
            },
            regions: options.activeArea.map(item => {
                if (typeof item !== 'string') {
                    return {
                        name: item.name,
                        itemStyle: {
                            normal: {
                                areaColor: item.areaColor || '#389BB7'
                            }
                        },
                        label: {
                            normal: {
                                show: item.showLabel,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    }
                } else {
                    return {
                        name: item,
                        itemStyle: {
                            normal: {
                                borderColor: '#91e6ff',
                                areaColor: '#389BB7'
                            }
                        }
                    }
                }
            })
        },
        series: options.series || []
    }

    chart.setOption(option)
    chart.currMapName = InitMapName
    options.callback(InitMapName, placeMap[InitMapName], option, chart)

    // 添加事件
    chart.on('click', (params) => {
        const _self = chart
        if (options.goDown && params.name !== _self.currMapName) {
            if (placeMap[params.name]) {
                ajax({
                    url: config.geoJsonBaseUrl + jsonMap[placeMap[params.name]]
                }).then(res => {
                    if (res.type == 'FeatureCollection') { // 地图数据加载成功
                        echarts.default.registerMap(params.name, res)
                        handleEvents.resetOption(_self, option, params.name)
                    } else {
                        console.log('地图数据加载失败！')
                        _self.currMapName = ''
                    }
                })
            }
        }
    })
    return chart
}
// 地图的初始化
echarts.default.initChinaMap = function (dom, opt, callback) {
    ajax({ url: config.geoJsonBaseUrl + jsonMap[placeMap[InitMapName]] }).then(res => {
        if (res.type == 'FeatureCollection') { // 地图数据加载成功
            echarts.default.registerMap(InitMapName, res)
            const baseOpt = {
                bgColor: 'transparent',
                mapName: InitMapName,
                goDown: true,
                callback (labelName, placeName, option, instance) {
                    callback(labelName, placeName, option, instance)
                }
            }
            opt = Object.assign(opt || {}, baseOpt)
            echarts.default.extendsMap(dom, opt)
        } else {
            console.log('地图数据加载失败！')
        }
    })
}
export default echarts
