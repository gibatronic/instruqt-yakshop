import { ApiProperty } from '@nestjs/swagger'

export class Yak {
    @ApiProperty()
    name: string

    @ApiProperty()
    age: number

    @ApiProperty()
    ageLastShaved: number

    @ApiProperty()
    sex: 'f' | 'm'
}
