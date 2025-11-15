import { Prisma } from '@prisma/client'

type ExtendedOrderBy<T extends object, V extends string> = keyof T | V

export function mapOrderBy<
    T extends Record<string, any>,
    V extends string = string
>(
    orderBy: ExtendedOrderBy<T, V> | undefined,
    direction: Prisma.SortOrder = 'asc',
    virtualMap: Record<V, (dir: Prisma.SortOrder) => T>
): T {
    if (!orderBy) return { id: direction } as unknown as T

    if (orderBy in virtualMap) {
        return virtualMap[orderBy as V](direction)
    }

    return { [orderBy as keyof T]: direction } as unknown as T
}
