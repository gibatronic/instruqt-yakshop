import { ApiProperty } from '@nestjs/swagger'

export class Stock {
    @ApiProperty()
    milk: number

    @ApiProperty()
    skins: number
}
