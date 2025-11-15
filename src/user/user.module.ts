import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from '../auth/auth.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { TasksModule } from '../tasks/tasks.module'

@Module({
    imports: [PrismaModule, AuthModule, TasksModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule {}
