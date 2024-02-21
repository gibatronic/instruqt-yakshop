import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'
import { loader } from '../src/config/config.loader'
import { Yak } from '../src/herd/yak.interface'
import { InventoryService } from '../src/inventory/inventory.service'
import { Stock } from '../src/stock/stock.interface'

function buildReport(herd: Yak[], stock: Stock) {
    return [
        'In Stock:',
        `  ${stock.milk.toFixed(3)} liters of milk`,
        `  ${stock.skins} skins of wool`,
        'Herd:',
        herd
            .map((yak) => `  ${yak.name} ${yak.age.toFixed(2)} years old`)
            .join('\n'),
        '',
    ].join('\n')
}

async function query() {
    const { initHerdFile, elapsedDays } = parseOptions(process.argv.slice(2))
    const app = await NestFactory.create(AppModule, { logger: ['error'] })

    const loadHerdFile = loader(initHerdFile)
    const initHerd = await loadHerdFile()

    const inventory = app.get(InventoryService)
    const { herd, stock } = inventory.calculate(initHerd.herd, elapsedDays)

    const report = buildReport(herd, stock)
    return report
}

function parseOptions(list: (string | undefined)[]) {
    const [initHerdFile, elapsedDays] = list

    if (initHerdFile === undefined) {
        throw new Error('missing herd file')
    }

    if (elapsedDays === undefined) {
        throw new Error('missing elapsed days')
    }

    return {
        initHerdFile,
        elapsedDays: parseFloat(elapsedDays),
    }
}

query()
    .then((result) => {
        console.log(result)
    })
    .catch((reason) => {
        process.exitCode = 1
        console.error(reason)
    })
