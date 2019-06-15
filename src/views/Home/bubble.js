import zrender from 'zrender'
let BUBBLE_MAX_SIZE = 32
let BUBBLE_MIN_SIZE = 20
let BUBBLE_AVG_SIZE = (BUBBLE_MAX_SIZE + BUBBLE_MIN_SIZE) / 2
const CircleColorConfig = {
    fillColors: ['#dc5568', '#d7ae27', '#45c6b2'],
    strokeColors: ['#c0405b', '#c29b1e', '#2c8291'],
    shadowColors: ['rgba(220, 85, 104, 0.7)', 'rgba(215,174,39,0.7)', 'rgba(69, 198, 178, 0.7)'],
    default: {
        fillColor: '#01195a',
        strokeColor: '#38539d',
        shadowColor: 'rgba(56,83,157,0.7)'
    }
}
const PersonColorConfig = {
    circleStrokeColors: ['#c0405b', '#c29b1e', '#2c8291'],
    smallCircleFillColors: ['#dc5568', '#d7ae27', '#45c6b2'],
    default: {
        circleStrokeColor: '#5768b9',
        smallCircleFillColor: '#38539d'
    }
}
const position = [[0.25, 0.5], [0.26, 0.74], [0.15, 0.44], [0.22, 0.2], [0.14, 0.25], [0.17, 0.62], [0.1, 0.67], [0.175, 0.82], [0.32, 0.86], [0.3, 0.14]]
// 扩展，半圆路径
const HalfCircle = zrender.Path.extend({
    type: 'halfCircle',
    shape: {
        cx: 0, cy: 0, r: 10
    },
    buildPath (path, shape) {
        const cx = shape.cx
        const cy = shape.cy
        const r = shape.r
        path.arc(cx, cy, r, Math.PI, 0)
        path.moveTo(cx - r, cy)
        path.lineTo(cx + r, cy)
        path.closePath()
    }
})

// 扩展，三次贝塞尔曲线
const CustomBezierCurve = zrender.Path.extend({
    type: 'customBezierCurve',
    shape: {
        x1: 0, y1: 0, x2: 100, y2: 100, cx1: 0, cx2: 0, cy1: 0, cy2: 0
    },
    buildPath (path, shape) {
        path.moveTo(shape.x1, shape.y1)
        path.bezierCurveTo(shape.cx1, shape.cy1, shape.cx2, shape.cy2, shape.x2, shape.y2)
        // path.closePath()
    }
})

export default class Bubble {
    constructor (container) {
        this.container = container // 放置的容器
        this.zr = zrender.init(container)
        this.width = 0
        this.height = 0
        this.dataList = []
    }
    refresh (datas) {
        this.zr.clear()
        this.dataList = []
        this.zr.resize()
        this.draw(datas)
    }
    draw (datas) {
        const that = this
        const zr = that.zr
        that.width = zr.getWidth()
        that.height = zr.getHeight()
        if (that.width > 900) {
            BUBBLE_MAX_SIZE = 52
            BUBBLE_MIN_SIZE = 30
            BUBBLE_AVG_SIZE = (BUBBLE_MAX_SIZE + BUBBLE_MIN_SIZE) / 2
        } else if (that.width > 450) {
            BUBBLE_MAX_SIZE = 32
            BUBBLE_MIN_SIZE = 20
            BUBBLE_AVG_SIZE = (BUBBLE_MAX_SIZE + BUBBLE_MIN_SIZE) / 2
        } else {
            BUBBLE_MAX_SIZE = 26
            BUBBLE_MIN_SIZE = 18
            BUBBLE_AVG_SIZE = (BUBBLE_MAX_SIZE + BUBBLE_MIN_SIZE) / 2
        }
        const totalData = datas.reduce((total, item) => total + item.value, 0)
        let avgValue = 0
        avgValue = totalData / datas.length
        let size = 0
        const dataList = this.dataList
        datas.forEach(item => {
            if (item.name) {
                size = parseInt(item.value / avgValue * BUBBLE_AVG_SIZE)
                if (size < BUBBLE_MIN_SIZE) {
                    size = BUBBLE_MIN_SIZE
                } else if (size > BUBBLE_MAX_SIZE) {
                    size = BUBBLE_MAX_SIZE
                }
                dataList.push({ name: item.name, size, value: item.value, cSize: size * 0.7 })
            }
        })
        let dataItem = null
        const len = dataList.length
        for (let i = len - 1; i >= 0; i--) {
            dataItem = dataList[i]
            that.addCircle(dataItem, i, len)
            if (i < 10) {
                that.addPerson(dataItem, i, len)
                if (i < 5) {
                    that.addLinkLine(dataItem, i, len)
                }
            }
        }
    }
    addCircle (dataItem, index, len) {
        const that = this
        const zr = that.zr
        const w = that.width
        const h = that.height
        const g = new zrender.Group()
        g.position[0] = 0
        g.position[1] = 0
        let cx = w * 0.6 + (w * 0.3333 - 15) * Math.random()
        let cy = 30 + (h - 30) * Math.random()
        if (cy + dataItem.size + 10 > h) {
            cy = h - dataItem.size - 10
        } else if (cy < dataItem.size + 10) {
            cy = dataItem.size + 10
        }
        if (cx + dataItem.size + 10 > w) {
            cx = w - dataItem.size - 10
        }
        dataItem.x2 = cx
        dataItem.y2 = cy
        const fillColor = CircleColorConfig.fillColors[index] || CircleColorConfig.default.fillColor
        const strokeColor = CircleColorConfig.strokeColors[index] || CircleColorConfig.default.strokeColor
        const shadowColor = CircleColorConfig.shadowColors[index] || CircleColorConfig.default.shadowColor
        const opacity = 0.2 + 0.6 * ((len - index) / len)
        const circle = new zrender.Circle({
            shape: { cx, cy, r: dataItem.size },
            style: {
                fill: fillColor,
                shadowBlur: 25,
                shadowColor,
                text: dataItem.name,
                fontSize: dataItem.size / 2,
                textFill: '#ffffff',
                stroke: strokeColor,
                lineWidth: 2,
                opacity
            }
        })
        g.add(circle)
        g.on('mouseover', function (e) {
            const event = new Event('showTip', { bubbles: true, cancelable: false })
            event.payload = { x: e.offsetX, y: e.offsetY, text: dataItem.name + '：' + dataItem.value }
            document.dispatchEvent(event)
            circle.animateTo({ shape: { r: dataItem.size * 1.2, opacity: opacity + 0.2 } })
        })
        g.on('mouseout', function (e) {
            const event = new Event('hideTip', { bubbles: true, cancelable: false })
            event.payload = { x: e.offsetX, y: e.offsetY, text: dataItem.name + '：' + dataItem.value }
            document.dispatchEvent(event)
            circle.animateTo({ shape: { r: dataItem.size, opacity: opacity } })
        })
        zr.add(g)
    }
    addPerson (dataItem, index, len) {
        const that = this
        const zr = that.zr
        const w = that.width
        const h = that.height
        const g = new zrender.Group()
        g.position[0] = 0
        g.position[1] = 0
        // let cx = 10 + (w * 0.33 - 20) * Math.random()
        // let cy = 30 + (h - 30) * Math.random()
        let cx = position[index][0] * w
        let cy = position[index][1] * h
        if (cy + dataItem.cSize + 15 > h) {
            cy = h - dataItem.cSize - 15
        } else if (cy < dataItem.cSize + 15) {
            cy = dataItem.cSize + 15
        }
        if (cx - dataItem.cSize - 25 < 0) {
            cx = dataItem.cSize + 25
        }
        dataItem.x1 = cx
        dataItem.y1 = cy
        const fillColor = PersonColorConfig.circleStrokeColors[index] || PersonColorConfig.default.circleStrokeColor
        const strokeColor = PersonColorConfig.smallCircleFillColors[index] || PersonColorConfig.default.smallCircleFillColor
        const shadowColor = CircleColorConfig.shadowColors[index] || CircleColorConfig.default.shadowColor
        const opacity = 0.2 + 0.6 * ((len - index) / len)
        const circle = new zrender.Circle({
            shape: { cx, cy, r: dataItem.cSize },
            style: {
                fill: 'rgba(0,0,0,0)',
                shadowBlur: 15,
                shadowColor,
                stroke: strokeColor,
                lineWidth: 2,
                opacity
            }
        })
        g.add(circle)
        const headerSize = dataItem.cSize / 2.7
        const headerPosY = cy - dataItem.cSize + 4 + headerSize
        g.add(new zrender.Circle({
            shape: { cx, cy: headerPosY, r: headerSize },
            style: {
                fill: fillColor,
                shadowBlur: 0,
                opacity
            }
        }))
        const bodySize = dataItem.cSize - headerSize
        const bodyPosY = headerPosY + headerSize + bodySize
        g.add(new HalfCircle({
            shape: { cx, cy: bodyPosY, r: bodySize },
            style: {
                opacity,
                stroke: 'rgba(0,0,0,0)',
                fill: fillColor
            }
        }))
        if (index < 5) {
            g.on('mouseover', function (e) {
                const event = new Event('showTip', { bubbles: true, cancelable: false })
                event.payload = { x: e.offsetX, y: e.offsetY, text: dataItem.name + '：' + dataItem.value }
                document.dispatchEvent(event)
                circle.animateTo({ shape: { r: dataItem.cSize * 1.2, opacity: opacity + 0.2 } })
            })
            g.on('mouseout', function (e) {
                const event = new Event('hideTip', { bubbles: true, cancelable: false })
                event.payload = { x: e.offsetX, y: e.offsetY, text: dataItem.name + '：' + dataItem.value }
                document.dispatchEvent(event)
                circle.animateTo({ shape: { r: dataItem.cSize, opacity: opacity } })
            })
        }
        zr.add(g)
    }
    addLinkLine (dataItem, index, len) {
        const that = this
        const zr = that.zr
        const g = new zrender.Group()
        g.position[0] = 0
        g.position[1] = 0
        const fillColor = PersonColorConfig.circleStrokeColors[index] || PersonColorConfig.default.circleStrokeColor
        const opacity = 0.2 + 0.6 * ((len - index) / len)
        // 左侧点
        const x1 = dataItem.x1 + dataItem.cSize + 10
        const y1 = dataItem.y1 - 8 + 8 * Math.random()
        // 右侧点
        const x2 = dataItem.x2 - dataItem.size - 10
        const y2 = dataItem.y2 - 8 + 8 * Math.random()
        // 曲线
        const x = x2 - x1
        const cx1 = x1 + x * 0.333
        const cx2 = x1 + x * 0.666
        let cy1 = y2
        let cy2 = y1
        if (Math.abs(y1, y2) < 60) {
            cy1 = y2 - 40
            cy2 = y1 + 40
        }
        g.add(new CustomBezierCurve({
            shape: {
                x1, y1, x2, y2, cx1, cx2, cy1, cy2
            },
            style: { opacity, stroke: fillColor, lineWidth: 2, fill: 'rgba(0,0,0,0)' }
        }))
        g.add(new zrender.Circle({
            shape: { cx: x1, cy: y1, r: 4 },
            style: { fill: fillColor, shadowBlur: 0, opacity }
        }))
        g.add(new zrender.Circle({
            shape: { cx: x2, cy: y2, r: 4 },
            style: { fill: fillColor, shadowBlur: 0, opacity }
        }))
        zr.add(g)
    }
}