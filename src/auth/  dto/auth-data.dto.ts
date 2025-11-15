import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
    IsString,
    IsBoolean,
    IsNumber,
    IsArray,
    IsOptional,
    ArrayNotEmpty,
} from 'class-validator'
import { BaseDto } from '../../utils/common/base-entity'

export class AuthDataDto extends BaseDto<AuthDataDto> {
    @ApiProperty({
        example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikc5U...',
        description: 'Access token issued by Lumia Passport',
    })
    @Expose()
    @IsString()
    accessToken: string

    @ApiProperty({
        example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikc5U...',
        description: 'Refresh token issued by Lumia Passport',
    })
    @Expose()
    @IsString()
    refreshToken: string

    @ApiProperty({
        example: 'ZLXnO4KmcAVdco46tR0lC',
        description: 'Unique Lumia user ID (internal)',
    })
    @Expose()
    @IsString()
    userId: string

    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'User wallet address linked to Lumia account',
        required: false,
    })
    @Expose()
    @IsOptional()
    @IsString()
    walletAddress?: string | null

    @ApiProperty({
        example: 3600,
        description: 'Access token lifetime in seconds',
    })
    @Expose()
    @IsNumber()
    expiresIn: number

    @ApiProperty({
        example: 1762906975082,
        description: 'Token expiration timestamp in ms',
    })
    @Expose()
    @IsNumber()
    expiresAt: number

    @ApiProperty({
        example: true,
        description: 'Whether the user has keyshare on Lumia Passport',
    })
    @Expose()
    @IsBoolean()
    hasKeyshare: boolean

    @ApiProperty({
        example: ['email'],
        description: 'List of connected providers (e.g. email, telegram, etc.)',
        type: [String],
    })
    @Expose()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    providers: string[]

    @ApiProperty({
        example: 'https://cdn.lumia.app/avatar/abc123.png',
        description: 'User avatar URL or base64 image',
        required: false,
    })
    @Expose()
    @IsOptional()
    @IsString()
    avatar?: string | null

    @ApiProperty({
        example: 'Alice',
        description: 'Display name of the user (if provided)',
        required: false,
    })
    @Expose()
    @IsOptional()
    @IsString()
    displayName?: string | null
}
