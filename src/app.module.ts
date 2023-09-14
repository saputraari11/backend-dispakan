import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { UsersMiddleware } from './users/users.middleware'
import { UsersModule } from './users/users.module'
import { AuthMiddleware } from './auth/auth.middleware'
import { NewsModule } from './news/news.module'
import { StoreModule } from './store/store.module'
import { ProductModule } from './product/product.module'
import { AppLoggerMiddleware } from './commons/middlewares/app-logger-middleware'

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    NewsModule,
    StoreModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/auth/signup/bumdes', method: RequestMethod.POST })
    consumer.apply(AppLoggerMiddleware).forRoutes("*")
  }
}
