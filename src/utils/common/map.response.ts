import { BadRequestException } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { findErrorConstraints } from './errors'


export function mapResponse<T extends object, V>(cls: ClassConstructor<T>, plain: V): T {
    const instance = plainToInstance(cls, plain, {
        enableImplicitConversion: true,
        excludeExtraneousValues: false,
        exposeUnsetFields: false,
    })

    const errors = validateSync(instance, { whitelist: true })

    if (errors.length > 0) {
        const description = findErrorConstraints(errors).join(', ')
        throw new BadRequestException(description)
    }

    return instance
}
