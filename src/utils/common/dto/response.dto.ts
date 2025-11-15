import { Expose } from 'class-transformer'

export class ResponseDto<T, R> {
    @Expose()
    private readonly data?: T | T[] | undefined

    @Expose()
    private readonly error?: R | undefined

    constructor(_data: T | T[] | undefined, _error: R | undefined = undefined) {
        this.data = _data
        this.error = _error
    }
}
