import { Injectable } from '@nestjs/common'
import { Yak } from '../herd/yak.entity'
import { Stock } from '../stock/stock.entity'
import { Inventory } from './inventory.entity'

@Injectable()
export class InventoryService {
    calculate(herd: Yak[], elapsedDays: number): Inventory {
        herd = structuredClone(herd)

        const stock: Stock = {
            milk: 0,
            skins: 0,
        }

        for (let day = 0; day < elapsedDays; day += 1) {
            for (const yak of herd) {
                const isDead = yak.age >= 1000

                if (isDead) {
                    continue
                }

                stock.milk += 50 - yak.age * 0.03
                yak.age += 1

                const isTooYoungToShave = yak.age < 100

                if (isTooYoungToShave) {
                    continue
                }

                const isFirstDay = day === 0
                const daysUnshaved = yak.age - yak.ageLastShaved
                const nextShaveIn = 8 + yak.age * 0.01
                const isReadyToShave = isFirstDay || daysUnshaved >= nextShaveIn

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
