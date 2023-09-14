import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import * as express from 'express'

import * as bodyParser from 'body-parser'
import { join } from 'path'
import { Logger } from 'winston';
import { TimeoutInterceptor } from './commons/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Dispakan API')
    .setDescription('Dispakan API Documentation')
    .setVersion('1.0')
    .addTag('dispakan-api')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .addBearerAuth()
    .build()


  let logger: Logger;
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(express.static(join(process.cwd(), '../temp/qrcode/')))
  app.useGlobalInterceptors(new TimeoutInterceptor(logger));
  
  app.enableCors()

  await app.listen(process.env.PORT || '4000')
}
bootstrap()
