import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { TaskType } from '@prisma/client'
import { BaseDto } from '../../utils/common/base-entity'

export class CreateTaskDto extends BaseDto<CreateTaskDto> {
    @ApiProperty({ example: 'Join our Telegram group' })
    @Expose()
    @IsString()
    title: string

    @ApiProperty({ example: 'Join @MyProjectChannel to earn points' })
    @Expose()
    @IsString()
    description: string

    @ApiProperty({ example: 50 })
    @Expose()
    @IsInt()
    @Min(1)
    rewardPoints: number

    @ApiProperty({ enum: TaskType, example: TaskType.TELEGRAM })
    @Expose()
    @IsEnum(TaskType)
    type: TaskType

    @ApiProperty({
        example: '-1001234567890',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    telegramChatId?: string

    @ApiProperty({
        example: 'join_main_telegram',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    slug?: string

    @ApiProperty({
        example: 'https://t.me/+abcdef123',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    joinUrl?: string

    @ApiProperty({
        example: 'https://cdn.project.com/task.png',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    imageUrl?: string
}
