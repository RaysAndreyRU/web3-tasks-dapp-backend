import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import {UserDto} from "../../../auth/  dto/user.dto";


export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return plainToInstance(UserDto, request.user, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
    })
})
