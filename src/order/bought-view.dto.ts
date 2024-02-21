import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { toFixedTransformer } from '../common/to-fixed-transformer'

export class BoughtViewDto {
    @ApiPropertyOptional({ example: 5 })
    @Transform(toFixedTransformer(2))
    milk?: number

    @ApiPropertyOptional({ example: 1 })
    skins?: number
}
