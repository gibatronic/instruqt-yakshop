import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common'
import {
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    PartialType,
} from '@nestjs/swagger'
import { Stock } from '../stock/stock.entity'
import { CreateOrderDto } from './create-order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post(':T')
    @ApiOperation({ summary: 'Place an order on T day' })
    @ApiResponse({
        status: 201,
        type: Stock,
        description: 'Order in stock, all goods delivered',
    })
    @ApiResponse({
        status: 206,
        description: 'Order partially in stock, some goods delivered',
        type: PartialType(Stock),
    })
    @ApiNotFoundResponse({
        description: 'Order not in stock, no goods delivered',
    })
    order(
        @Param('T', new ParseIntPipe()) elapsedDays: number,
        @Body() { order }: CreateOrderDto,
    ) {
        const stock = this.orderService.calculateStock(elapsedDays)
        const hasEnoughMilk = stock.milk >= order.milk
        const hasEnoughSkins = stock.skins >= order.skins

        if (hasEnoughMilk && hasEnoughSkins) {
            return order
        }

        if (hasEnoughMilk) {
            throw new HttpException(
                { milk: order.milk },
                HttpStatus.PARTIAL_CONTENT,
            )
        }

        if (hasEnoughSkins) {
            throw new HttpException(
                { skins: order.skins },
                HttpStatus.PARTIAL_CONTENT,
            )
        }

        throw new NotFoundException({})
    }
}
