import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'
import { Expose } from 'class-transformer'

export class VerifyTaskResponseDto extends BaseDto<VerifyTaskResponseDto> {
    @Expose()
    @ApiProperty({ example: true })
    @IsBoolean()
    success: boolean

    @Expose()
    @ApiProperty({ example: false })
    @IsBoolean()
    alreadyVerified: boolean

    @Expose()
    @ApiProperty({ example: 150 })
    @IsInt()
    newScore: number
}
