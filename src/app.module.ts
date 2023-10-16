import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { AuthMiddleware } from './auth/auth.middleware'
import { NewsModule } from './news/news.module'
import { StoreModule } from './store/store.module'
import { ProductModule } from './product/product.module'
import { AppLoggerMiddleware } from './commons/middlewares/app-logger-middleware'
import { CommentModule } from './comment/comment.module'
import { LandingPageModule } from './landing-page/landing-page.module'

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
    CommentModule,
    LandingPageModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
      { path: '/auth/signup/bumdes', method: RequestMethod.POST },
      { path: '/landing-page/news', method: RequestMethod.ALL },
      { path: '/landing-page/product', method: RequestMethod.ALL },
      { path: '/landing-page/action', method: RequestMethod.ALL },
    )
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
