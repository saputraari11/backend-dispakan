"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const express = require("express");
const bodyParser = require("body-parser");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Dispakan API')
        .setDescription('Dispakan API Documentation')
        .setVersion('1.0')
        .addTag('dispakan-api')
        .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
        .addBearerAuth()
        .build();
    let logger;
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.static(path_1.join(process.cwd(), '../temp/qrcode/')));
    app.enableCors();
    await app.listen(process.env.PORT || '4000', process.env.HOST);
}
bootstrap();
//# sourceMappingURL=main.js.map