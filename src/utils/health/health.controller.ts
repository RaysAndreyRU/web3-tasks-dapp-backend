import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus'
import { PrismaHealthIndicator } from './prisma.health'

@Controller('health')
@ApiTags('Health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly prismaIndicator: PrismaHealthIndicator,
        private readonly memory: MemoryHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({
        summary: 'Health check',
        description: 'Checks if the API and PostgreSQL database are healthy.',
    })
    @ApiOkResponse({
        description: 'Returns OK status when all systems are healthy.',
        schema: {
            example: {
                status: 'ok',
                info: {
                    database: { status: 'up' },
                    memory_heap: { status: 'up' },
                },
                details: {
                    database: { status: 'up' },
                    memory_heap: { status: 'up' },
                },
            },
        },
    })
    check() {
        return this.health.check([
            async () => this.prismaIndicator.isHealthy('database'),
            async () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),
        ])
    }
}
