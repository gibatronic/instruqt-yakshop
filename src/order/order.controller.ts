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
import { plainToClass } from 'class-transformer'
import { BoughtViewDto } from './bought-view.dto'
import { OrderService } from './order.service'
import { PlaceOrderDto } from './place-order.dto'

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post(':T')
    @ApiOperation({ summary: 'Place an order on T day' })
    @ApiResponse({
        status: 201,
        type: BoughtViewDto,
        description: 'Order in stock, all products delivered',
    })
    @ApiResponse({
        status: 206,
        description: 'Order partially in stock, some products delivered',
        type: PartialType(BoughtViewDto),
    })
    @ApiNotFoundResponse({
        description: 'Order not in stock, no products delivered',
    })
    order(
        @Param('T', new ParseIntPipe()) elapsedDays: number,
        @Body() { order }: PlaceOrderDto,
    ) {
        const bought = this.orderService.placeOrder(order, elapsedDays)
        const status = this.orderService.getOrderStatus(order, bought)
        const view = plainToClass(BoughtViewDto, bought)

        if (status === 'all') {
            return view
        }

        if (status === 'some') {
            throw new HttpException(view, HttpStatus.PARTIAL_CONTENT)
        }

        if (status === 'none') {
            throw new NotFoundException({})
        }

        const exhaustiveCheck: never = status
        throw new Error(`unhandled order status: ${exhaustiveCheck}`)
    }
}
