import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@Controller()
@ApiTags('Common')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: 'Root endpoint',
        description: 'Returns basic information about the Web3 Bounty Board DApp backend.',
    })
    @ApiOkResponse({
        description: 'Basic backend info.',
        schema: {
            type: 'object',
            example: {
                name: 'Web3 Bounty Board DApp Backend',
                version: '1.0.0',
                status: 'running',
            },
        },
    })
    getRoot() {
        return this.appService.getRootInfo()
    }
}
