// 时间格式化
export function formatTime (date, format = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

export function computedChartDataInterval (dataList, gapNum, ratio = 0) {
    const min = 0
    let max = Math.max(...dataList)
    let interval = 0
    if (max == min) {
        interval = 2
        max = interval * gapNum
    } else {
        interval = Math.ceil((max - min) / gapNum)
        let gap = Math.pow(10, (interval + '').length - 1)
        interval = Math.ceil(interval / gap + ratio) * gap
        max = gapNum * interval
    }
    return { min, max, interval }
}

export const reg = {
    ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/ // 判定IOS浏览器的正则
}
