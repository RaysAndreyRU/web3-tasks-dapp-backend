import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { JwtService } from '@nestjs/jwt'
import { verifyLumiaToken } from '../utils/lumia'
import { UserDto } from './  dto/user.dto'
import { AuthDataDto } from './  dto/auth-data.dto'
import { mapResponse } from '../utils/common/map.response'
import {AuthVerifyResponseDto} from "./  dto/auth-verify-response.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    async verifySession(authData: AuthDataDto): Promise<AuthVerifyResponseDto> {
        if (!authData?.accessToken) {
            throw new UnauthorizedException('Missing Lumia session token')
        }

        try {
            const verification = await verifyLumiaToken(authData)

            if (!verification?.valid || !verification.userId) {
                throw new UnauthorizedException('Invalid or expired Lumia token')
            }

            const walletAddress = authData.walletAddress?.toLowerCase() ?? null

            const user = await this.prisma.user.upsert({
                where: { id: authData.userId },
                update: {
                    walletAddress,
                },
                create: {
                    id: authData.userId,
                    walletAddress,
                },
            })

            const userDto = mapResponse(UserDto, user)

            const token = await this.jwt.signAsync({
                sub: user.id,
                walletAddress: user.walletAddress,
            })

            return { user: userDto, token }
        } catch (e) {
            console.error('[AuthService.verifySession] error', e)
            throw new UnauthorizedException('Token verification failed')
        }
    }
}
