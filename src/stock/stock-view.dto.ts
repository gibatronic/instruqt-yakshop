import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { toFixedTransformer } from '../common/to-fixed-transformer'

export class StockViewDto {
    @ApiProperty({ example: 123.45 })
    @Transform(toFixedTransformer(2))
    milk: number

    @ApiProperty({ example: 3 })
    skins: number
}
