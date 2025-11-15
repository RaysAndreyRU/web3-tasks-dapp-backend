// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createWriteStream } = require('fs')

const keys = ['DATABASE_URL', 'NODE_ENV']
const envs = Object.entries(process.env).filter(([key]) => keys.includes(key))
const logger = createWriteStream('./.env', { flags: 'a' })

for (const [key, value] of envs) {
    logger.write(`${key}=${value}\n`)
}
