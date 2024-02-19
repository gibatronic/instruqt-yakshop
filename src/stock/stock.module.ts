import { Module } from '@nestjs/common'
import { ConfigModule } from 'src/config/config.module'
import { InventoryModule } from 'src/inventory/inventory.module'
import { StockController } from './stock.controller'
import { StockService } from './stock.service'

@Module({
    imports: [ConfigModule, InventoryModule],
    controllers: [StockController],
    providers: [StockService],
})
export class StockModule {}
