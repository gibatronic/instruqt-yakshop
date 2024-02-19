import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config/config.entity'
import { InventoryService } from 'src/inventory/inventory.service'

@Injectable()
export class HerdService {
    constructor(
        private readonly config: ConfigService<Config, true>,
        private readonly inventory: InventoryService,
    ) {}

    calculateHerd(elapsedDays: number) {
        const initHerd = this.config.get('herd')
        const { herd } = this.inventory.calculate(initHerd, elapsedDays)

        return herd
    }
}
