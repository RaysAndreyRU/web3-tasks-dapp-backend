import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserDto } from './user.dto'
import {BaseDto} from "../../utils/common/base-entity";

export class AuthVerifyResponseDto extends BaseDto<AuthVerifyResponseDto>  {
    @ApiProperty({ type: () => UserDto })
    @Type(() => UserDto)
    user: UserDto

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Backend JWT issued by our API after Lumia session verification',
    })
    token: string
}
