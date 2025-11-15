import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class SessionUserDto extends BaseDto<SessionUserDto> {
    @ApiProperty({
        example: 'b7d8a3f0-21b1-4d2a-9b6b-9af3c54c9a1f',
        description: 'User ID extracted from the JWT token'
    })
    @Expose()
    @IsString()
    id: string

    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'Wallet address extracted from the JWT token'
    })
    @Expose()
    @IsString()
    walletAddress: string
}
