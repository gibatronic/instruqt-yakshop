import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from '../config/config.entity'
import { InventoryService } from '../inventory/inventory.service'
import { OrderProducts } from './order-products.interface'

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

    getOrderStatus(
        order: Partial<OrderProducts>,
        bought: Partial<OrderProducts>,
    ) {
        const orderedProducts = Object.keys(order)
        const boughtProducts = Object.keys(bought)

        if (orderedProducts.length === boughtProducts.length) {
            return 'all'
        }

        if (boughtProducts.length === 0) {
            return 'none'
        }

        return 'some'
    }

    placeOrder(order: OrderProducts, elapsedDays: number) {
        const bought: Partial<OrderProducts> = {}
        const orderedProductNames = Object.keys(
            order,
        ) as (keyof OrderProducts)[]
        const stock = this.calculateStock(elapsedDays)

        for (const orderedProductName of orderedProductNames) {
            const orderedProductAmount = order[orderedProductName]

            if (
                !orderedProductAmount ||
                orderedProductAmount > stock[orderedProductName]
            ) {
                continue
            }

            bought[orderedProductName] = order[orderedProductName]
        }

        return bought
    }
}
