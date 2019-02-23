import ns from '@/store/constants/ns'
import homeModule from './homeModule'
import iotModule from './iotModule'
import farmingModule from './farmingModule'
import teaMakingModule from './teaMakingModule'
import warehouseModule from './warehouseModule'
import outputValueModule from './outputValueModule'
import originModule from './originModule'
import plantModule from './plantModule'

export default {
    [ns.HOME]: homeModule,
    [ns.IOT]: iotModule,
    [ns.FARMING]: farmingModule,
    [ns.TEAMAKING]: teaMakingModule,
    [ns.WAREHOUSE]: warehouseModule,
    [ns.OUTPUTVALUE]: outputValueModule,
    [ns.ORIGIN]: originModule,
    [ns.PLANT]: plantModule
}
