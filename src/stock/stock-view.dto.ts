import { ApiProperty } from '@nestjs/swagger'
import { Transform, TransformFnParams } from 'class-transformer'

const toFixed = (number: number, digits: number) =>
    parseFloat(number.toFixed(digits))

const toFixedTransformer =
    (digits: number) =>
    ({ value }: TransformFnParams) =>
        toFixed(value, digits)

export class StockViewDto {
    @ApiProperty({ example: 123.45 })
    @Transform(toFixedTransformer(2))
    milk: number

    @ApiProperty({ example: 3 })
    skins: number
}
