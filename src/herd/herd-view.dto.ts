import { ApiProperty } from '@nestjs/swagger'
import {
    Exclude,
    Expose,
    Transform,
    TransformFnParams,
    Type,
} from 'class-transformer'

const toFixed = (number: number, digits: number) =>
    parseFloat(number.toFixed(digits))

const toFixedTransformer =
    (digits: number) =>
    ({ value }: TransformFnParams) =>
        toFixed(value, digits)

export class YakViewDto {
    @ApiProperty({ example: 'Betty' })
    name: string

    @ApiProperty({ example: 9.87 })
    @Transform(toFixedTransformer(2))
    age: number

    @ApiProperty({ type: Number, example: 5.43 })
    @Expose()
    @Transform(toFixedTransformer(1))
    get 'age-last-shaved'() {
        return this.ageLastShaved
    }

    @Exclude({ toPlainOnly: true })
    ageLastShaved: number

    @Exclude({ toPlainOnly: true })
    sex: string
}

export class HerdViewDto {
    @ApiProperty({ type: [YakViewDto] })
    @Type(() => YakViewDto)
    herd: YakViewDto
}
