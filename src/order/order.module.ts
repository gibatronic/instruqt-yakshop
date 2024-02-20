import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { InventoryModule } from '../inventory/inventory.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
    imports: [ConfigModule, InventoryModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
