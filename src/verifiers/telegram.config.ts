export const TELEGRAM_CONFIG = 'TELEGRAM_CONFIG';

export const telegramConfig = () => ({
    botToken: process.env.TELEGRAM_BOT_TOKEN || null,
});
