import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';
export declare class DatabaseConfig implements TypeOrmOptionsFactory {
    private config;
    constructor(config: ConfigType<typeof databaseConfig>);
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
