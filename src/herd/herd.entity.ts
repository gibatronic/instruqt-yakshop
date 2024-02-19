import { ApiProperty } from '@nestjs/swagger'
import { Yak } from './yak.entity'

export class Herd {
    @ApiProperty({ type: [Yak] })
    herd: Yak[]
}
