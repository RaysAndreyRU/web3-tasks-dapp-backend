import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class VerifyTaskDto extends BaseDto<VerifyTaskDto> {
    @Expose()
    @ApiProperty({
        example: '123456789',
        description: 'Telegram user ID of the user performing the verification'
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    telegramUserId: string
}
