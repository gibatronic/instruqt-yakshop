import type { Yak } from '../herd/yak.interface'
import type { Stock } from '../stock/stock.interface'

export interface Inventory {
    herd: Yak[]
    stock: Stock
}
