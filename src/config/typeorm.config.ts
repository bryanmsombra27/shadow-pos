import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

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
    // entities: [Category],
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')], //busca todos los archivos de js/ts que tengan terminacion entity para añadirlos automaticamente
    synchronize: true, //solo en desarrollo porque sincroniza todo perdiendo info
  };
};
