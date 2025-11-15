import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { TaskType } from '@prisma/client'
import { TasksRepository } from './tasks.repository'
import { TaskDto } from './dto/task.dto'
import { mapResponse } from '../utils/common/map.response'
import { TelegramVerifierService } from '../verifiers/telegram-verifier.service'
import { VerifyTaskDto } from './dto/verify-task.dto'
import { VerifyTaskResponseDto } from './dto/verify-task-response.dto'
import { PagedTasksDto } from './dto/paged-tasks.dto'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)

    constructor(
        private readonly repo: TasksRepository,
        private readonly telegram: TelegramVerifierService
    ) {}

    async getTasksForUser(userId: string, skip = 0, take = 10): Promise<PagedTasksDto> {
        const { data, total } = await this.repo.findAllWithUserStatus(userId, skip, take)

        console.log(data)

        return {
            items: data.map((task) =>
                mapResponse(TaskDto, {
                    ...task,
                    verified: task.verified,
                    verifiedAt: task.verifiedAt
                })
            ),
            total,
            skip,
            take
        }
    }

    async createTask(dto: CreateTaskDto) {
        return this.repo.create({
            title: dto.title,
            description: dto.description,
            rewardPoints: dto.rewardPoints,
            type: dto.type,
            telegramChatId: dto.telegramChatId ?? null,
            slug: dto.slug ?? null,
            joinUrl: dto.joinUrl ?? null,
            imageUrl: dto.imageUrl ?? null
        })
    }

    async verifyTaskForUser(userId: string, taskId: number, dto: VerifyTaskDto): Promise<VerifyTaskResponseDto> {
        const task = await this.repo.findTaskById(taskId)
        if (!task) {
            throw new NotFoundException('Task not found')
        }

        const existing = await this.repo.findUserTask(userId, taskId)
        if (existing?.verified) {
            const score = await this.repo.getUserScore(userId)
            return {
                success: true,
                alreadyVerified: true,
                newScore: score
            }
        }

        if (task.type !== TaskType.TELEGRAM) {
            throw new BadRequestException('Unsupported task type')
        }

        if (!task.telegramChatId) {
            throw new BadRequestException('Task has no Telegram chat configured')
        }

        if (!dto.telegramUserId) {
            throw new BadRequestException('telegramUserId is required')
        }

        const isMember = await this.telegram.verifyMembership(dto.telegramUserId, task.telegramChatId)

        if (!isMember) {
            const score = await this.repo.getUserScore(userId)
            return {
                success: false,
                alreadyVerified: false,
                newScore: score
            }
        }

        await this.repo.createOrVerifyUserTask(userId, taskId)

        const newScore = await this.repo.incrementUserScore(userId, task.rewardPoints)

        return {
            success: true,
            alreadyVerified: false,
            newScore
        }
    }

    async getUserScore(userId: string): Promise<number> {
        return this.repo.getUserScore(userId)
    }
}
