import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as express from 'express'
// import * as helmet from 'helmet';
import * as bodyParser from 'body-parser'
import { join } from 'path'
import { Logger } from 'winston'
import * as csurf from 'csurf'

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

  let logger: Logger
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(express.static(join(process.cwd(), '../temp/qrcode/')))
  app.useGlobalPipes(new ValidationPipe())
  // app.use(helmet())
  app.enableCors()
  // app.use(csurf())

  await app.listen(process.env.PORT || '4000', process.env.HOST)
}
bootstrap()
