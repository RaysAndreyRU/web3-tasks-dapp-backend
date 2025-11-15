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
        if (!this.verifier) {
            this.logger.warn('Verifier is null — skipping check')
            return false
        }

        this.logger.debug(`🔍 Starting Telegram membership check`)
        this.logger.debug(`➡️ User ID: ${telegramUserId}`)
        this.logger.debug(`➡️ Chat ID: ${chatId}`)

        try {
            const result = await this.verifier.verify(telegramUserId, chatId)

            this.logger.debug(`✅ Telegram verifier returned: ${result}`)
            return result
        } catch (e: any) {
            this.logger.error('❌ Telegram verification failed')

            // Раскрываем все возможные детали ошибки
            this.logger.error('Error message:', e?.message)
            this.logger.error('Raw error:', e)
            this.logger.error('Axios response data:', e?.response?.data)
            this.logger.error('Axios response status:', e?.response?.status)
            this.logger.error('Axios response headers:', e?.response?.headers)

            return false
        }
    }
}
