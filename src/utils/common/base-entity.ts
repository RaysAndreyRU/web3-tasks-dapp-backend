import { Type } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'

export abstract class BaseEntity<T> {
    constructor(partial: Partial<T>) {
        Object.assign(this, partial)
    }
}

export abstract class BaseDto<T> {
    constructor(value: T) {
        Object.assign(this, value)
    }
}

export function mapDto<T>(object: BaseEntity<T> | BaseDto<T>, type: Type<T>): T {
    return new type(instanceToPlain(object))
}

export function omitUndefined<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>
}
