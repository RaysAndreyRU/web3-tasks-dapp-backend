import { jwtManager } from './lumia.config'
import { verifyToken } from '@lumiapassport/core'

export async function verifyLumiaToken(session: any) {
    if (!session?.accessToken) throw new Error('Missing Lumia session token')

    await jwtManager.setTokens({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        userId: session.userId,
        expiresIn: session.expiresIn,
        hasKeyshare: session.hasKeyshare,
        displayName: session.displayName ?? null,
        avatar: session.avatar ?? null,
        providers: session.providers ?? [],
    })

    return await verifyToken(jwtManager)
}