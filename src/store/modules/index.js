import ns from '@/store/constants/ns'
import homeModule from './homeModule'
import iotModule from './iotModule'
import plantModule from './plantModule'
import farmingModule from './farmingModule'
import warehouseModule from './warehouseModule'
import originModule from './originModule'

export default {
    [ns.HOME]: homeModule,
    [ns.IOT]: iotModule,
    [ns.PLANT]: plantModule,
    [ns.FARMING]: farmingModule,
    [ns.WAREHOUSE]: warehouseModule,
    [ns.ORIGIN]: originModule
}
