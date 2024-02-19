import { Module } from '@nestjs/common'
import { StockModule } from '../stock/stock.module'
import { OrderController } from './order.controller'

@Module({
    imports: [StockModule],
    controllers: [OrderController],
})
export class OrderModule {}
