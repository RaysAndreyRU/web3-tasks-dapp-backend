import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsInt } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class UserScoreDto extends BaseDto<UserScoreDto> {
    @Expose()
    @IsInt()
    @ApiProperty({ example: 250, description: 'Current user score' })
    score: number
}
