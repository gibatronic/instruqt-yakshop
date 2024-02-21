import { ApiProperty } from '@nestjs/swagger'

export class PlaceOrderItemsDto {
    @ApiProperty({ example: 3 })
    milk: number

    @ApiProperty({ example: 1 })
    skins: number
}

export class PlaceOrderDto {
    @ApiProperty({ example: 'Jane Doe' })
    customer: string

    @ApiProperty()
    order: PlaceOrderItemsDto
}
