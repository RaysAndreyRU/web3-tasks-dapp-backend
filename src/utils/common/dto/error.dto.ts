import { Expose } from 'class-transformer'
import { BaseEntity } from '../base-entity'

export class ErrorDto extends BaseEntity<ErrorDto> {
    @Expose()
    statusCode: number
    @Expose()
    message: string
    @Expose()
    error?: string
}
