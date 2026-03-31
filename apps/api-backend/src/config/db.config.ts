import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';


const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
  },
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
