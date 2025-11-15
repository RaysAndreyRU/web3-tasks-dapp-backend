import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtSessionGuard } from '../utils/common/guards/lumia-session.guard'
import { TasksService } from '../tasks/tasks.service'
import { User } from '../utils/common/ decorators/user.decorator'
import { UserDto } from '../auth/  dto/user.dto'

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtSessionGuard)
@Controller('api/user')
export class UserController {
    constructor(private readonly tasksService: TasksService) {}

    @Get('score')
    @ApiOperation({ summary: 'Get current user score' })
    @ApiOkResponse({
        schema: {
            example: { score: 120 }
        }
    })
    async getScore(@User() user: UserDto) {
        const score = await this.tasksService.getUserScore(user.id)
        return { score }
    }
}
