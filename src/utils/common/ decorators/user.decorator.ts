import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { SessionUserDto } from '../../../auth/  dto/session-user.dto'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return plainToInstance(SessionUserDto, request.user, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
    })
})
