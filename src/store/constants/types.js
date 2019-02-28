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
    'IOT_CHANGE_FULL_STATE', // 曲线图表全屏状态
    // ***************************************************************农事活动
    'FARMING_CHANGE_CURR_REGION', // 切换当前选中的地图区域
    'FARMING_GET_PLANT_ACT_DATA',
    'FARMING_GET_FERTILIZER_ACT_DATA',
    'FARMING_GET_PROTECTION_ACT_DATA',
    'FARMING_CHANGE_FULL_STATE',
    // ***************************************************************出库入库
    'WAREHOUSE_CHANGE_CURR_REGION', // 切换当前选中的地图区域
    'WAREHOUSE_GET_TODAY_DATA',
    'WAREHOUSE_GET_THIS_YEAR_IN_DATA',
    'WAREHOUSE_GET_THIS_YEAR_OUT_DATA',
    'WAREHOUSE_GET_HISTORY_IN_DATA',
    'WAREHOUSE_GET_HISTORY_OUT_DATA',
    'WAREHOUSE_CHANGE_FULL_STATE',
    // ***************************************************************种植分布
    'PLANT_CHANGE_CURR_REGION', // 切换当前选中的地图区域
    'PLANT_GET_STAT_DATA', // 获取统计数据
    'PLANT_GET_TREE_AGE_DATA', // 获取树龄分布数据
    'PLANT_GET_TEA_FARM_DATA', // 获取山场品质数据
    'PLANT_GET_TEA_VARIETIES_DATA', // 获取茶树品种数据
    'PLANT_GET_AMOUNT_RANK',
    'PLANT_CHANGE_FULL_STATE',
    // ***************************************************************首页
    'HOME_CHANGE_CURR_REGION', // 切换当前选中的地图区域
    'HOME_GET_AMOUNT_RANK_DATA', // 获取茶树排行数据
    'HOME_GET_FARMING_ACT_DATA', // 获取施肥比例数据
    'HOME_GET_PICK_DATA', // 获取采摘数据
    'HOME_GET_WAREHOUSE_DATA', // 获取入库出库数据
    'HOME_GET_CITY_DATA', // 获取城市溯源排行
    'HOME_GET_MONITOR_AMOUNT', // 获取监控设备数据
    'HOME_GET_TEA_LEVEL_DATA', // 获取制茶等级数据
    'HOME_CHANGE_FULL_STATE', // 更改Plane图表的全屏状态
    // ****************************************************************溯源
    'ORIGIN_CHANGE_FULL_STATE', // 更改全屏状态
]

const typesObj = {}
types.forEach(type => { typesObj[type] = type })
export default typesObj