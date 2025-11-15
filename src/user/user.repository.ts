import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { BaseRepository } from '../utils/common/base.repository'

@Injectable()
export class UserRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma as any, 'user')
    }

    async getScore(userId: string): Promise<number> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { score: true }
        })

        return user?.score ?? 0
    }

    async incrementScore(userId: string, amount: number): Promise<number> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                score: {
                    increment: amount
                }
            },
            select: { score: true }
        })

        return user.score
    }
    async linkTelegram(userId: string, telegramUserId: string) {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { telegramUserId }
        })

        return updatedUser
    }
}
