const types = [
    'SWITCH_LOADING', // 更改全局loading状态
    'SWITCH_SCREEN_FULL', // 更改全屏状态
    'GET_WINDOW_SIZE', // 获取窗口宽高
    'SET_CURR_ROUTER', // 设置当前路由
    // ***************************************************************物联监控
    'GET_MONITORS', // 获取monitor设备信息
    'GET_FMS', // 获取fms设备信息
    'CHANGE_ACTIVE_MARKER', // 更改当前active状态的marker
    'SWITCH_FM', // 更改fm的类型
    'GET_FMS_DATA', // 获取fm数据
    'GET_FMS_CHART_DATA', // 获取fm图表数据
    'SWITCH_FM_DATA_TYPE', // 更改fm的数据类型，时刻数据/七天数据
    'IOT_CURVE_FULL_STATE_CHANGE', // 曲线图表全屏状态
]

const typesObj = {}
types.forEach(type => { typesObj[type] = type })
export default typesObj