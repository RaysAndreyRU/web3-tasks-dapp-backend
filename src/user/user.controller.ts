import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtSessionGuard } from '../utils/common/guards/lumia-session.guard'
import { UserService } from './user.service'
import { LinkTelegramDto } from './dto/link-telegram.dto'
import { User } from 'src/utils/common/ decorators/user.decorator'
import { SessionUserDto } from '../auth/  dto/session-user.dto'

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtSessionGuard)
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('score')
    @ApiOperation({ summary: 'Get current user score' })
    @ApiOkResponse({
        schema: {
            example: { score: 120 }
        }
    })
    async getScore(@User() user: SessionUserDto) {
        return this.userService.getUserScore(user.id)
    }

    @Post('telegram')
    @ApiOperation({ summary: 'Link Telegram account to user profile' })
    @ApiOkResponse({ schema: { example: { success: true } } })
    async linkTelegram(@User() user: SessionUserDto, @Body() dto: LinkTelegramDto) {
        return this.userService.linkTelegram(user.id, dto.telegramUserId)
    }
}
