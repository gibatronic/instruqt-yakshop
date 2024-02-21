import { ApiPropertyOptional } from '@nestjs/swagger'

export class BoughtViewDto {
    @ApiPropertyOptional({ example: 5 })
    milk?: number

    @ApiPropertyOptional({ example: 1 })
    skins?: number
}
