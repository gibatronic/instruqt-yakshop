import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'
import { HerdViewDto } from './herd-view.dto'
import { HerdService } from './herd.service'

@Controller('herd')
export class HerdController {
    constructor(private readonly herdService: HerdService) {}

    @Get(':T')
    @ApiOperation({ summary: 'View herd after T days' })
    @ApiResponse({
        status: 200,
        type: HerdViewDto,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    view(
        @Param('T', new ParseIntPipe())
        elapsedDays: number,
    ): HerdViewDto {
        const herd = this.herdService.calculateHerd(elapsedDays)
        const view = plainToClass(HerdViewDto, { herd })

        return view
    }
}
