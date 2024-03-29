import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { InventoryModule } from '../inventory/inventory.module'
import { HerdController } from './herd.controller'
import { HerdService } from './herd.service'

@Module({
    imports: [ConfigModule, InventoryModule],
    controllers: [HerdController],
    providers: [HerdService],
})
export class HerdModule {}
