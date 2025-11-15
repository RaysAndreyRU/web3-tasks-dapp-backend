import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class TaskDto extends BaseDto<TaskDto> {
    @Expose()
    @IsInt()
    @ApiProperty({ example: 1, description: 'Task ID' })
    id: number

    @Expose()
    @IsString()
    @ApiProperty({ example: 'Join Telegram', description: 'Task title' })
    title: string

    @Expose()
    @IsString()
    @ApiProperty({
        example: 'Join @LumiaOfficial Telegram channel',
        description: 'Task description'
    })
    description: string

    @Expose()
    @IsInt()
    @ApiProperty({ example: 100, description: 'Reward points for completing the task' })
    rewardPoints: number

    @Expose()
    @IsBoolean()
    @ApiProperty({
        example: false,
        description: 'Whether current user has already verified this task'
    })
    verified: boolean

    @Expose()
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        example: '2025-11-10T00:00:00.000Z',
        description: 'Creation date of the task'
    })
    createdAt: Date
}
