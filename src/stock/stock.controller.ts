import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'
import { StockViewDto } from './stock-view.dto'
import { StockService } from './stock.service'

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get(':T')
    @ApiOperation({ summary: 'View stock after T days' })
    @ApiResponse({
        status: 200,
        type: StockViewDto,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    view(
        @Param('T', new ParseIntPipe())
        elapsedDays: number,
    ): StockViewDto {
        const stock = this.stockService.calculateStock(elapsedDays)
        const view = plainToClass(StockViewDto, stock)

        return view
    }
}
