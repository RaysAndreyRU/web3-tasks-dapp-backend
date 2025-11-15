import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, IsOptional, IsNumber } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class UserDto extends BaseDto<UserDto> {
    @Expose()
    @IsString()
    @ApiProperty({
        example: 'b7d8a3f0-21b1-4d2a-9b6b-9af3c54c9a1f',
        description: 'Unique user ID in Lumia Passport'
    })
    id: string

    @Expose()
    @IsString()
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'User wallet address'
    })
    walletAddress: string

    @Expose()
    @IsNumber()
    @ApiProperty({
        example: 120,
        description: 'Accumulated score of the user'
    })
    score: number

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: '123456789',
        description: 'Telegram user ID linked to the account (nullable)',
        nullable: true
    })
    telegramUserId?: string | null

    @Expose()
    @ApiProperty({
        example: '2024-01-01T12:00:00.000Z',
        description: 'Date when the user record was created'
    })
    createdAt: Date
}
