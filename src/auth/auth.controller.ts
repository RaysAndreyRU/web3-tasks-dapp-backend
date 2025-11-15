import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserDto } from './  dto/user.dto'
import { AuthDataDto } from './  dto/auth-data.dto'
import {AuthVerifyResponseDto} from "./  dto/auth-verify-response.dto";
import {JwtSessionGuard} from "../utils/common/guards/lumia-session.guard";
import {User} from "../utils/common/ decorators/user.decorator";

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('verify-session')
    @ApiOperation({ summary: 'Verify Lumia Passport session token' })
    @ApiResponse({ status: 200, type: UserDto })
    async verifySession(@Body() authData: AuthDataDto): Promise<AuthVerifyResponseDto> {
        console.log('[AuthController] received Lumia authData:', authData)
        return this.auth.verifySession(authData)
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtSessionGuard)
    @ApiOperation({ summary: 'Get current authenticated user' })
    @ApiResponse({ status: 200, type: UserDto })
    async me(@User() user: UserDto): Promise<UserDto> {
        return user
    }


}
