import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    port: +configService.get('DB_PORT'),
    host: configService.get('DB_HOST'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
  };
};
