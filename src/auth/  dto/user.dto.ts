import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsString, IsDate } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class UserDto extends BaseDto<UserDto> {
    @Expose()
    @IsString()
    @ApiProperty({ example: 'b7d8a3f0-21b1-4d2a-9b6b-9af3c54c9a1f', description: 'Unique user ID in Lumia Passport' })
    id: string

    @Expose()
    @IsString()
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'User wallet address',
    })
    walletAddress: string
}
