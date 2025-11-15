import { Inject, Injectable, Logger } from '@nestjs/common'
import { TelegramVerifier as TelegramVerifierSdk } from 'tasks-verifiers'
import { TELEGRAM_CONFIG } from './telegram.config'

@Injectable()
export class TelegramVerifierService {
    private readonly logger = new Logger(TelegramVerifierService.name)
    private readonly verifier: TelegramVerifierSdk | null

    constructor(
        @Inject(TELEGRAM_CONFIG)
        private readonly config: { botToken: string | null },
    ) {
        const botToken = this.config.botToken

        if (!botToken) {
            this.logger.warn('TELEGRAM_BOT_TOKEN not set → verification will always fail')
            this.verifier = null
        } else {
            this.verifier = new TelegramVerifierSdk(botToken, this.logger)
        }
    }

    async verifyMembership(telegramUserId: string, chatId: string): Promise<boolean> {
        if (!this.verifier) return false

        try {
            return await this.verifier.verify(telegramUserId, chatId)
        } catch (e) {
            this.logger.error('Telegram verification failed', e)
            return false
        }
    }
}
