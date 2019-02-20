const types = [
    'SWITCH_LOADING', // 更改全局loading状态
    'GET_WINDOW_SIZE', // 获取窗口宽高
    'SET_CURR_ROUTER' // 设置当前路由
]

const typesObj = {}
types.forEach(type => { typesObj[type] = type })
export default typesObj