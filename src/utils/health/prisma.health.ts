import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
    constructor(private readonly prisma: PrismaService) {
        super()
    }

    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        try {
            this.prisma.$queryRaw`SELECT 1`
            return this.getStatus(key, true)
        } catch (error) {
            throw new HealthCheckError('Prisma check failed', error)
        }
    }
}
