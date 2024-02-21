import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose, Transform, Type } from 'class-transformer'
import { toFixedTransformer } from '../common/to-fixed-transformer'

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
