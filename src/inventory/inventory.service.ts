import { Injectable } from '@nestjs/common'
import { Yak } from '../herd/yak.entity'
import { Stock } from '../stock/stock.entity'
import { Inventory } from './inventory.entity'

@Injectable()
export class InventoryService {
    calculate(herd: Yak[], elapsedDays: number): Inventory {
        const stock: Stock = {
            milk: 0,
            skins: 0,
        }

        const toFixed = (number: number, digits: number = 2) =>
            parseFloat(number.toFixed(digits))

        herd = structuredClone(herd)

        for (let day = 0; day < elapsedDays; day += 1) {
            for (const yak of herd) {
                const isDead = toFixed(yak.age) >= 10

                if (isDead) {
                    continue
                }

                stock.milk += 50 - yak.age * 100 * 0.03
                yak.age += 0.01
                const isTooYoungToShave = toFixed(yak.age) < 1

                if (isTooYoungToShave) {
                    continue
                }

                const isFirstDay = day === 0
                const daysUnshaved = (yak.age - yak.ageLastShaved) * 100
                const nextShaveIn = 8 + yak.age * 100 * 0.01
                const isReadyToShave =
                    isFirstDay || toFixed(daysUnshaved) >= toFixed(nextShaveIn)

                if (!isReadyToShave) {
                    continue
                }

                stock.skins += 1
                yak.ageLastShaved = yak.age
            }
        }

        return { herd, stock }
    }
}
