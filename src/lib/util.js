// 获取url上的参数
export function getQueryString (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
}
// cookie操作
export function cookie (name, value, expireDay) {
    if (!name) {
        return
    }
    let arr = null
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (value == null) { // 获取cookie
        arr = document.cookie.match(reg)
        if (arr) {
            return decodeURIComponent(arr[2])
        }
        return null
    } else { // 设置cookie
        if (!expireDay) {
            expireDay = 10
        }
        const exp = new Date()
        exp.setTime(exp.getTime() + expireDay * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString()
    }
}

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

// 公用地址
 let globeURL = 'https://tea.yufengtek.com/tea-IIS-Web'
 // let globeURL = 'http://192.168.0.140:8066'
 let globeUrlTwo = 'tea.yufengtek.com/tea-IIS-Web'
 export default { globeURL, globeUrlTwo }
