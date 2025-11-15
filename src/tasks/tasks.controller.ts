import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TasksService } from './tasks.service'
import { JwtSessionGuard } from '../utils/common/guards/lumia-session.guard'
import { PagedTasksDto } from './dto/paged-tasks.dto'
import { VerifyTaskDto } from './dto/verify-task.dto'
import { VerifyTaskResponseDto } from './dto/verify-task-response.dto'
import { CreateTaskDto } from './dto/create-task.dto'
import { User } from '../utils/common/ decorators/user.decorator'
import { SessionUserDto } from '../auth/  dto/session-user.dto'

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtSessionGuard)
@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @ApiOperation({ summary: 'List available tasks with user verification status' })
    @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
    @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
    @ApiOkResponse({ type: PagedTasksDto })
    async getTasks(
        @User() user: SessionUserDto,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
    ): Promise<PagedTasksDto> {
        return this.tasksService.getTasksForUser(user.id, skip, take)
    }

    @Post(':id/verify')
    @ApiOperation({ summary: 'Verify completion of a task for current user' })
    @ApiResponse({ status: 200, type: VerifyTaskResponseDto })
    async verifyTask(
        @Param('id', ParseIntPipe) id: number,
        @User() user: SessionUserDto,
        @Body() dto: VerifyTaskDto
    ): Promise<VerifyTaskResponseDto> {
        return this.tasksService.verifyTaskForUser(user.id, id, dto)
    }

    @Post()
    @ApiOperation({ summary: 'Create a new task (admin only)' })
    async create(@Body() dto: CreateTaskDto) {
        return this.tasksService.createTask(dto)
    }
}
