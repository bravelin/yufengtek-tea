import ns from '@/store/constants/ns'
import homeModule from './homeModule'
import iotModule from './iotModule'
import plantModule from './plantModule'
import farmingModule from './farmingModule'
import teaMakingModule from './teaMakingModule'
import warehouseModule from './warehouseModule'
import outputValueModule from './outputValueModule'
import originModule from './originModule'

export default {
    [ns.HOME]: homeModule,
    [ns.IOT]: iotModule,
    [ns.PLANT]: plantModule,
    [ns.FARMING]: farmingModule,
    [ns.TEAMAKING]: teaMakingModule,
    [ns.WAREHOUSE]: warehouseModule,
    [ns.OUTPUTVALUE]: outputValueModule,
    [ns.ORIGIN]: originModule
}
