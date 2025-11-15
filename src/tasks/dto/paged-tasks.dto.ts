import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsInt, ValidateNested, Min } from 'class-validator'
import { TaskDto } from './task.dto'
import { BaseDto } from '../../utils/common/base-entity'

export class PagedTasksDto extends BaseDto<PagedTasksDto> {
    @Expose()
    @ApiProperty({ type: [TaskDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaskDto)
    items: TaskDto[]

    @Expose()
    @ApiProperty({ example: 20 })
    @IsInt()
    total: number

    @Expose()
    @ApiProperty({ example: 0 })
    @IsInt()
    @Min(0)
    skip: number

    @Expose()
    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    take: number
}
