import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

const JWT_EXPIRES_IN =
    process.env.JWT_EXPIRES_IN !== undefined
        ? Number(process.env.JWT_EXPIRES_IN)
        : 60 * 60 * 24

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'dev-secret',
            signOptions: {
                expiresIn: JWT_EXPIRES_IN,
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
