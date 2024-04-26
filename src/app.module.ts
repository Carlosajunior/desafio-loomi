import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './modules/email-service/email-service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
//import { JwtAuthGuard } from './modules/authentication/guards/jwt-auth.guard';
import { AuthGuard } from './modules/authentication/guards/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { UserAccessLevelMiddleware } from './modules/authentication/middlewares/user-acess.middleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        name: process.env.MAIL_FROM,
        host: process.env.MAIL_HOST,
        secure: true,
        port: parseInt(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        ignoreTLS: true,
      },
    }),
    UsersModule,
    PrismaModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    MailService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAccessLevelMiddleware)
      .exclude({ path: '/authentication/login', method: RequestMethod.POST })
      .forRoutes({ path: '/[a-zA-Z0-9-/_]+', method: RequestMethod.ALL });
  }
}
