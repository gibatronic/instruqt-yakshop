import { Module } from '@nestjs/common'
import { HerdModule } from './herd/herd.module'
import { OrderModule } from './order/order.module'
import { StockModule } from './stock/stock.module'

@Module({
    imports: [HerdModule, StockModule, OrderModule],
})
export class AppModule {}
