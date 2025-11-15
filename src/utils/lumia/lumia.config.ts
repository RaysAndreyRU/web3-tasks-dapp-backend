import {
    configureJwtModule,
    createJwtTokenManager,
    MemoryStorage,
} from '@lumiapassport/core'

configureJwtModule({
    projectId: process.env.LUMIA_PROJECT_ID,
})

const jwtStorage = new MemoryStorage()
export const jwtManager = createJwtTokenManager(jwtStorage)
