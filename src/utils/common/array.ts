import { Type } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'

export {}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Array<T> {
        mapDto<R>(newType: Type<R>): Array<R>
    }
}

Array.prototype.mapDto = function <R>(newType: Type<R>): R[] {
    return this.map((e: any) => new newType(instanceToPlain(e)))
}
