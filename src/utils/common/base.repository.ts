import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class BaseRepository<
    TModel,
    CreateDto = any,
    UpdateDto = any
> {
    protected readonly repo: any

    constructor(
        protected readonly prisma: PrismaService,
        protected readonly model: keyof PrismaService
    ) {
        this.repo = this.prisma[this.model] as any
    }


    public async findById(id: number): Promise<TModel | null> {
        return this.repo.findUnique({ where: { id } })
    }

    public async findFirst(where: any): Promise<TModel | null> {
        return this.repo.findFirst({ where })
    }

    public async findMany(params?: {
        where?: any
        orderBy?: any
        skip?: number
        take?: number
        include?: any
    }): Promise<TModel[]> {
        return this.repo.findMany(params)
    }

    public async count(where?: any): Promise<number> {
        return this.repo.count({ where })
    }

    public async exists(where: any): Promise<boolean> {
        const count = await this.repo.count({ where })
        return count > 0
    }

    public async create(data: CreateDto): Promise<TModel> {
        return this.repo.create({ data })
    }

    public async update(id: number, data: UpdateDto): Promise<TModel> {
        return this.repo.update({ where: { id }, data })
    }

    public async upsert(where: any, create: CreateDto, update: UpdateDto): Promise<TModel> {
        return this.repo.upsert({ where, create, update })
    }

    public async delete(id: number): Promise<TModel> {
        return this.repo.delete({ where: { id } })
    }

    public async deleteMany(where: any): Promise<number> {
        const result = await this.repo.deleteMany({ where })
        return result.count
    }

    public async findPaged(
        skip: number,
        take: number,
        where?: any,
        orderBy?: any
    ): Promise<{ data: TModel[]; total: number }> {
        const [data, total] = await this.prisma.$transaction([
            this.repo.findMany({ skip, take, where, orderBy }),
            this.repo.count({ where }),
        ])
        return { data, total }
    }

    protected getModel<K extends keyof PrismaService>(model: K): PrismaService[K] {
        return this.prisma[model] as any
    }
}
