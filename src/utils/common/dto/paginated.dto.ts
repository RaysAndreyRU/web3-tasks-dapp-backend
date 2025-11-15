import { Expose } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'
import { BaseEntity } from '../base-entity'

export class PaginatedDto<T> extends BaseEntity<PaginatedDto<T>> {
    @Expose()
    total: number
    @Expose()
    limit: number
    @Expose()
    page: number
    @Expose()
    results: T[]
}

export class PaginatedParamsDto {
    @IsInt()
    @IsOptional()
    page?: number
    @IsInt()
    @IsOptional()
    limit?: number
}

export type PaginationOptions = {
    page?: number
    limit?: number
}

const defaultPaginationOptions: PaginationOptions = {
    page: 0,
    limit: 20
} as const

export function normalizedPaginationOptions(options: PaginationOptions): Required<PaginationOptions> {
    const { page = defaultPaginationOptions.page, limit = defaultPaginationOptions.limit } = options
    return { page, limit }
}
