import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule, Params } from 'nestjs-pino'
import { PrismaModule, PrismaServiceOptions } from 'nestjs-prisma'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { HealthModule } from '../utils/health/health.module'
import { TasksModule } from '../tasks/tasks.module'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'
import { VerifiersModule } from '../verifiers/verifiers.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),

        PrismaModule.forRootAsync({
            isGlobal: true,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<PrismaServiceOptions> => {
                const databaseUrl = configService.get<string>('DATABASE_URL')

                return {
                    prismaOptions: {
                        datasources: {
                            db: { url: databaseUrl }
                        }
                    }
                }
            }
        }),

        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (): Promise<Params> => {
                const isProd = process.env.NODE_ENV === 'production'

                return {
                    pinoHttp: isProd
                        ? {
                              level: 'warn'
                          }
                        : {
                              level: 'debug',
                              transport: {
                                  target: 'pino-pretty',
                                  options: {
                                      colorize: true,
                                      singleLine: true
                                  }
                              }
                          }
                }
            }
        }),

        EventEmitterModule.forRoot(),
        TasksModule,
        VerifiersModule,
        UserModule,
        HealthModule,
        AuthModule
    ],

    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
