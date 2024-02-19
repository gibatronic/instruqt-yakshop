import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Stock } from './stock.entity'
import { StockService } from './stock.service'

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get(':T')
    @ApiOperation({ summary: 'stock after T days' })
    @ApiResponse({
        status: 200,
        type: Stock,
    })
    view(
        @Param('T', new ParseIntPipe())
        elapsedDays: number,
    ): Stock {
        return this.stockService.calculateStock(elapsedDays)
    }
}
