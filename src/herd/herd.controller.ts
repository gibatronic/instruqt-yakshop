import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Herd } from './herd.entity'
import { HerdService } from './herd.service'

@Controller('herd')
export class HerdController {
    constructor(private readonly herdService: HerdService) {}

    @Get(':T')
    @ApiOperation({ summary: 'herd after T days' })
    @ApiResponse({
        status: 200,
        type: Herd,
    })
    view(
        @Param('T', new ParseIntPipe())
        elapsedDays: number,
    ): Herd {
        const herd = this.herdService.calculateHerd(elapsedDays)
        return { herd }
    }
}
