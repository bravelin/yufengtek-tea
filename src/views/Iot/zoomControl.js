function ZoomControl () {
    // 设置默认停靠位置和偏移量
    /* eslint-disable */
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT // 右下角
    this.defaultOffset = new BMap.Size(10, 10)
}
ZoomControl.prototype = new BMap.Control()
ZoomControl.prototype.initialize = function (map) {
    // 创建一个DOM元素
    const div = document.createElement('div')
    div.innerHTML = '复位'
        div.className = 'map-reset-btn'
    // 绑定事件，点击一次恢复默认值
    div.onclick = function (e) {
        map.reset()
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div)
    // 将DOM元素返回
    return div
}

export default ZoomControl