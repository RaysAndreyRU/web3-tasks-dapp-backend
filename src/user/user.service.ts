import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UserScoreDto } from './user-score.dto'

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    async getUserScore(userId: string): Promise<UserScoreDto> {
        const score = await this.userRepo.getScore(userId)
        return new UserScoreDto({ score })
    }
}
