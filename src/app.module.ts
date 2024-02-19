import { Module } from '@nestjs/common'
import { HerdModule } from './herd/herd.module'
import { StockModule } from './stock/stock.module'

@Module({
    imports: [HerdModule, StockModule],
})
export class AppModule {}
