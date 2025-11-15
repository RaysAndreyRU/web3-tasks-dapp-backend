import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthVerifyResponseDto } from './  dto/auth-verify-response.dto'
import { AuthDataDto } from './  dto/auth-data.dto'
import { JwtSessionGuard } from '../utils/common/guards/lumia-session.guard'
import { User } from '../utils/common/ decorators/user.decorator'
import { SessionUserDto } from './  dto/session-user.dto'

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('verify-session')
    @ApiOperation({ summary: 'Verify Lumia Passport session token' })
    @ApiResponse({ status: 200, type: AuthVerifyResponseDto })
    async verifySession(@Body() authData: AuthDataDto): Promise<AuthVerifyResponseDto> {
        return this.auth.verifySession(authData)
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtSessionGuard)
    @ApiOperation({ summary: 'Get current authenticated user' })
    @ApiResponse({ status: 200, type: SessionUserDto })
    async me(@User() user: SessionUserDto): Promise<SessionUserDto> {
        return user
    }
}
