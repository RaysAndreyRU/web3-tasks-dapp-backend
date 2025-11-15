import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TasksRepository } from './tasks.repository'
import { AuthModule } from '../auth/auth.module'
import { JwtSessionGuard } from '../utils/common/guards/lumia-session.guard'
import { VerifiersModule } from '../verifiers/verifiers.module'

@Module({
    imports: [PrismaModule, AuthModule, VerifiersModule],
    controllers: [TasksController],
    providers: [TasksService, TasksRepository, JwtSessionGuard],
    exports: [TasksService]
})
export class TasksModule {}
