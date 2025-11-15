import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtSessionGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()

        const authHeader =
            req.headers['authorization'] || req.headers['Authorization']

        if (!authHeader || typeof authHeader !== 'string') {
            throw new UnauthorizedException('Missing Authorization header')
        }

        const [type, token] = authHeader.split(' ')
        if (!type || type.toLowerCase() !== 'bearer' || !token) {
            throw new UnauthorizedException('Invalid Authorization header format')
        }

        try {
            const payload = await this.jwt.verifyAsync<{ sub: string }>(token)

            if (!payload?.sub) {
                throw new UnauthorizedException('Invalid token payload')
            }

            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            })

            if (!user) {
                throw new UnauthorizedException('User not found')
            }

            req.user = {
                id: user.id,
                walletAddress: user.walletAddress,
            }

            return true
        } catch (e) {
            console.error('[JwtSessionGuard] error', e)
            throw new UnauthorizedException('Invalid or expired token')
        }
    }
}
