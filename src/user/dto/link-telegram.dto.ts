import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'
import { Expose } from 'class-transformer'

export class LinkTelegramDto extends BaseDto<LinkTelegramDto> {
    @Expose()
    @IsString()
    @ApiProperty({
        example: '1888095988',
        description: "User's Telegram ID"
    })
    telegramUserId: string
}
