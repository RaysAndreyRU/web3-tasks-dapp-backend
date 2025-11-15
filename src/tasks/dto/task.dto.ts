import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, IsEnum } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'
import { TaskType } from '@prisma/client'

export class TaskDto extends BaseDto<TaskDto> {
    @Expose()
    @IsInt()
    @ApiProperty({ example: 1, description: 'Task ID' })
    id: number

    @Expose()
    @IsString()
    @ApiProperty({
        example: 'Join Telegram',
        description: 'Task title'
    })
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
    @ApiProperty({
        example: 100,
        description: 'Reward points for completing the task'
    })
    rewardPoints: number

    @Expose()
    @IsEnum(TaskType)
    @ApiProperty({
        enum: TaskType,
        example: TaskType.TELEGRAM,
        description: 'Type of task'
    })
    type: TaskType

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '-1001234567890',
        description: 'Telegram chat ID (only for TELEGRAM tasks)',
        required: false
    })
    telegramChatId?: string | null

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'join_main_telegram',
        description: 'Unique slug used to identify the task',
        required: false
    })
    slug?: string | null

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'https://t.me/+abcdef123',
        description: 'URL for joining the target action (telegram link, website, etc.)',
        required: false
    })
    joinUrl?: string | null

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'https://cdn.project.com/tasks/main.png',
        description: 'Task icon or image',
        required: false
    })
    imageUrl?: string | null

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
