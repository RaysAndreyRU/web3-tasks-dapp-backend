import { Injectable } from '@nestjs/common'
import { Prisma, Task } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { BaseRepository } from '../utils/common/base.repository'

@Injectable()
export class TasksRepository extends BaseRepository<Task, Prisma.TaskCreateInput, Prisma.TaskUpdateInput> {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma as any, 'task')
    }

    async findAllWithUserStatus(userId: string, skip = 0, take = 10) {
        const [tasks, total] = await Promise.all([
            this.repo.findMany({
                skip,
                take,
                orderBy: { id: 'asc' },
                include: {
                    userTasks: {
                        where: { userId },
                        select: { verified: true, verifiedAt: true },
                        take: 1
                    }
                }
            }),
            this.repo.count()
        ])

        const mapped = tasks.map((task) => ({
            ...task,
            verified: task.userTasks[0]?.verified ?? false,
            verifiedAt: task.userTasks[0]?.verifiedAt ?? null
        }))

        return { data: mapped, total }
    }

    async findTaskById(id: number): Promise<Task | null> {
        return (this.repo as any).findUnique({
            where: { id }
        })
    }

    async findUserTask(userId: string, taskId: number) {
        return this.prisma.userTask.findUnique({
            where: {
                userId_taskId: {
                    userId,
                    taskId
                }
            }
        })
    }

    async createOrVerifyUserTask(userId: string, taskId: number) {
        return this.prisma.userTask.upsert({
            where: {
                userId_taskId: {
                    userId,
                    taskId
                }
            },
            update: {
                verified: true,
                verifiedAt: new Date()
            },
            create: {
                userId,
                taskId,
                verified: true,
                verifiedAt: new Date()
            }
        })
    }

    async incrementUserScore(userId: string, rewardPoints: number): Promise<number> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                score: {
                    increment: rewardPoints
                }
            },
            select: { score: true }
        })

        return user.score
    }

    async getUserScore(userId: string): Promise<number> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { score: true }
        })

        return user?.score ?? 0
    }
}
