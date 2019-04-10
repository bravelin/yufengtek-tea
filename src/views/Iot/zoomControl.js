export default class extends BMap.Control {
    constructor (map) {
        super()
        /* eslint-disable */
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT
        this.defaultOffset = new BMap.Size(10, 10)

        // 创建一个DOM元素
        const div = document.createElement('div')
        // 添加文字说明
        div.innerHTML = '复位'
        div.className = 'map-reset-btn'
        // 绑定事件，点击一次放大两级
        div.onclick = function (e) {
            map.reset()
        }
        // 添加DOM元素到地图中
        map.getContainer().appendChild(div)
        // 将DOM元素返回
        return div
    }
}