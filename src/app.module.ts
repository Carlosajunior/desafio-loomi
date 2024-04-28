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
import { AuthGuard } from './modules/authentication/guards/authentication.guard';
import { JwtService } from '@nestjs/jwt';
import { UserAccessLevelMiddleware } from './modules/authentication/middlewares/user-acess.middleware';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { ProductsModule } from './modules/products/products.module';

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
    CustomersModule,
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
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
      .forRoutes(
        { path: '/users/admin', method: RequestMethod.DELETE },
        { path: '/users/admin', method: RequestMethod.POST },
        { path: '/users/admin', method: RequestMethod.PATCH },
        { path: '/users/search', method: RequestMethod.GET },
        { path: '/users/', method: RequestMethod.GET },
        { path: '/customers/admin', method: RequestMethod.DELETE },
        { path: '/customers/admin', method: RequestMethod.PATCH },
        { path: '/products', method: RequestMethod.POST },
        { path: '/products', method: RequestMethod.PATCH },
        { path: '/products', method: RequestMethod.DELETE },
        { path: '/customers', method: RequestMethod.GET },
        { path: '/customers/search', method: RequestMethod.GET },
        { path: '/orders/search', method: RequestMethod.GET },
        { path: '/orders', method: RequestMethod.GET },
        { path: '/orders', method: RequestMethod.PATCH },
        { path: '/orders', method: RequestMethod.DELETE },
        { path: '/orders-items', method: RequestMethod.POST },
        { path: '/orders-items', method: RequestMethod.GET },
        { path: '/orders-items', method: RequestMethod.PATCH },
        { path: '/orders-items', method: RequestMethod.DELETE },
      );
  }
}
