import { CallHandler, ExecutionContext, Injectable, NestInterceptor, SetMetadata, StreamableFile } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'
import { ResponseDto } from '../dto/response.dto'

export const SKIP_FORMAT_KEY = 'skip_format'
export const SkipFormat = () => SetMetadata(SKIP_FORMAT_KEY, true)

@Injectable()
export class FormatInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => this.transform(data, context)))
    }

    private transform<T>(
        data: T | T[],
        context: ExecutionContext
    ): ResponseDto<T | T[], undefined> | StreamableFile | (T | T[]) {
        const skipKey = this.reflector.getAllAndOverride<boolean>(SKIP_FORMAT_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (skipKey || data instanceof StreamableFile) {
            return data
        }
        return new ResponseDto(data, undefined)
    }
}
