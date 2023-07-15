"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
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
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.static(path_1.join(process.cwd(), '../temp/qrcode/')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            const errorMessage = [];
            errors.map(error => {
                const newMessages = [];
                const property = error.property;
                const messages = Object.values(error.constraints);
                messages.map(message => {
                    newMessages.push(message.replace(property + ' ', ''));
                });
                const fullMessage = {};
                fullMessage[property] = newMessages;
                errorMessage.push(fullMessage);
            });
            return new common_1.BadRequestException(errorMessage);
        },
    }));
    app.enableCors();
    await app.listen(process.env.PORT || '4000');
}
bootstrap();
//# sourceMappingURL=main.js.map