import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config/config.entity'
import { InventoryService } from 'src/inventory/inventory.service'

@Injectable()
export class StockService {
    constructor(
        private readonly config: ConfigService<Config, true>,
        private readonly inventory: InventoryService,
    ) {}

    calculateStock(elapsedDays: number) {
        const initHerd = this.config.get('herd')
        const { stock } = this.inventory.calculate(initHerd, elapsedDays)

        return stock
    }
}
