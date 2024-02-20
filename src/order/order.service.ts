import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from '../config/config.entity'
import { InventoryService } from '../inventory/inventory.service'

@Injectable()
export class OrderService {
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
