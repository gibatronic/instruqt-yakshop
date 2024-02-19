import { ApiProperty } from '@nestjs/swagger'
import { Stock } from '../stock/stock.entity'

export class CreateOrderDto {
    @ApiProperty()
    customer: string

    @ApiProperty()
    order: Stock
}
