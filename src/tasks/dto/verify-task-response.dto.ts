import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class VerifyTaskResponseDto extends BaseDto<VerifyTaskResponseDto>  {
    @ApiProperty({ example: true })
    @IsBoolean()
    success: boolean

    @ApiProperty({ example: false })
    @IsBoolean()
    alreadyVerified: boolean

    @ApiProperty({ example: 150 })
    @IsInt()
    newScore: number
}
