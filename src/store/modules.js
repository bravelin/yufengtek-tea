import ns from '@/store/constants/ns'
import home from './home/index'
import iot from './iot/index'
import plant from './plant/index'
import farming from './farming/index'
import warehouse from './warehouse/index'
import origin from './origin/index'

export default {
    [ns.HOME]: home,
    [ns.IOT]: iot,
    [ns.PLANT]: plant,
    [ns.FARMING]: farming,
    [ns.WAREHOUSE]: warehouse,
    [ns.ORIGIN]: origin
}
