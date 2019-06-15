import zrender from 'zrender'
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
const sizes = [80, 75, 70, 60, 60, 60, 50, 50, 50]
const pos = [[0.6, 0.5], [0.45, 0.2], [0.83, 0.26], [0.87, 0.6], [0.2, 0.46], [0.38, 0.56], [0.16, 0.75], [0.48, 0.8], [0.77, 0.87]]
const maxCount = 9

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
        const drawDatas = []
        for (let i = 0; drawDatas.length < maxCount && i < datas.length; i++) {
            if (datas[i].name) {
                drawDatas.push(datas[i])
            }
        }
        that.width = zr.getWidth()
        that.height = zr.getHeight()
        let size = 0
        const dataList = this.dataList
        const winWidth = document.documentElement.clientWidth || window.innerWidth
        let ratio = 1
        if (winWidth <= 1200) {
            ratio = 0.6
        } else if (winWidth <= 1400) {
            ratio = 0.75
        }
        drawDatas.forEach((item, index) => {
            size = sizes[index] / 2 * ratio
            dataList.push({ name: item.name, size, value: item.value })
        })
        let dataItem = null
        const len = dataList.length
        for (let i = len - 1; i >= 0; i--) {
            dataItem = dataList[i]
            that.addCircle(dataItem, i, len)
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
        let cx = pos[index][0] * w
        let cy = pos[index][1] * h

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
}