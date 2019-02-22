const types = [
    'SWITCH_LOADING', // 更改全局loading状态
    'SWITCH_SCREEN_FULL', // 更改全屏状态
    'GET_WINDOW_SIZE', // 获取窗口宽高
    'SET_CURR_ROUTER', // 设置当前路由
    'GET_WEATHER_INFO', // 获取天气信息
]

const typesObj = {}
types.forEach(type => { typesObj[type] = type })
export default typesObj