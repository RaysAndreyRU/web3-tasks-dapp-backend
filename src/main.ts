import { BadRequestException, ClassSerializerInterceptor, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { json } from 'express'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { FormatInterceptor } from './utils/common/interceptors/format.interceptor'
import { StripNullInterceptor } from './utils/common/interceptors/strip-null.interceptor'
import './utils/common/array'
import { AppModule } from './app/app.module'
import { findErrorConstraints } from './utils/common/errors'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        cors: true,
        rawBody: true
    })

    app.enableShutdownHooks()

    app.useLogger(app.get(Logger))
    app.use(json(getBodyParserOptions(true, { limit: '5mb' })))

    app.useGlobalPipes(
        new ValidationPipe({
            enableDebugMessages: true,
            whitelist: true,
            forbidUnknownValues: true,
            validateCustomDecorators: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            exceptionFactory: (errors: ValidationError[]) => {
                const description = findErrorConstraints(errors).join(', ')
                throw new BadRequestException(description)
            }
        })
    )

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            excludeExtraneousValues: true
        }),
        new StripNullInterceptor(app.get(Reflector)),
        new FormatInterceptor(app.get(Reflector)),
        new LoggerErrorInterceptor()
    )

    const config = new DocumentBuilder()
        .setTitle('Web3 Bounty Board DApp API')
        .setDescription('API documentation for Web3 Bounty Board DApp with Telegram verification')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    const port = process.env.PORT || 4000
    await app.listen(port)
}

bootstrap()
