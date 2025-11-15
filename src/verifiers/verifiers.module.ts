import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegramVerifierService } from './telegram-verifier.service'
import { TELEGRAM_CONFIG, telegramConfig } from './telegram.config'

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: TELEGRAM_CONFIG,
            useFactory: telegramConfig
        },
        TelegramVerifierService
    ],
    exports: [TelegramVerifierService]
})
export class VerifiersModule {}
