import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'
import { SKIP_FORMAT_KEY } from './format.interceptor'

@Injectable()
export class StripNullInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => this.transform(data, context)))
    }

    private transform<T>(data: T | T[], context: ExecutionContext): T | T[] {
        const skipKey = this.reflector.getAllAndOverride<boolean>(SKIP_FORMAT_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (skipKey || data instanceof StreamableFile) {
            return data
        }
        return this.removeNulls(data)
    }

    private removeNulls(data) {
        if (data instanceof Array) {
            return data.map((item) => this.removeNulls(item))
        } else if (data instanceof Object) {
            for (const key in data) {
                if (data[key] === null) {
                    delete data[key]
                } else {
                    data[key] = this.removeNulls(data[key])
                }
            }
        }
        return data
    }

    // private cleanData(o) {
    //     if (Object.prototype.toString.call(o) == '[object Array]') {
    //         for (let key = 0; key < o.length; key++) {
    //             this.cleanData(o[key])
    //             if (Object.prototype.toString.call(o[key]) == '[object Object]') {
    //                 if (Object.keys(o[key]).length === 0) {
    //                     o.splice(key, 1)
    //                     key--
    //                 }
    //             }
    //         }
    //     } else if (Object.prototype.toString.call(o) == '[object Object]') {
    //         for (const key in o) {
    //             const value = this.cleanData(o[key])
    //             if (value === null) {
    //                 delete o[key]
    //             }
    //             if (Object.prototype.toString.call(o[key]) == '[object Object]') {
    //                 if (Object.keys(o[key]).length === 0) {
    //                     delete o[key]
    //                 }
    //             }
    //             if (Object.prototype.toString.call(o[key]) == '[object Array]') {
    //                 if (o[key].length === 0) {
    //                     delete o[key]
    //                 }
    //             }
    //         }
    //     }
    //     return o
    // }
}
