import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { InventoryModule } from '../inventory/inventory.module'
import { StockController } from './stock.controller'
import { StockService } from './stock.service'

@Module({
    imports: [ConfigModule, InventoryModule],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService],
})
export class StockModule {}
