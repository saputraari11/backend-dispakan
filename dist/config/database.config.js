"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs('database', () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
}));
//# sourceMappingURL=database.config.js.map