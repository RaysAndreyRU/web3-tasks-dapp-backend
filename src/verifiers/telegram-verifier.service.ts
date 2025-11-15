import { Inject, Injectable } from '@nestjs/common'
import { TelegramVerifier as TelegramVerifierSdk } from 'tasks-verifiers'
import { TELEGRAM_CONFIG } from './telegram.config'

@Injectable()
export class TelegramVerifierService {
    private readonly verifier: TelegramVerifierSdk | null

    constructor(
        @Inject(TELEGRAM_CONFIG)
        private readonly config: { botToken: string | null },
    ) {
        const botToken = this.config.botToken

        if (!botToken) {
            this.verifier = null
        } else {
            this.verifier = new TelegramVerifierSdk(botToken)
        }
    }

    async verifyMembership(telegramUserId: string, chatId: string): Promise<boolean> {
        if (!this.verifier) {
            return false
        }

        try {
            return await this.verifier.verify(telegramUserId, chatId)
        } catch {
            return false
        }
    }
}
