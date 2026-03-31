import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

// Forzamos la carga del .env antes de hacer cualquier otra cosa
dotenvConfig({ path: '.env' });

// Agregamos un log para asegurarnos de que no esté leyendo undefined
console.log('🚀 Conectando a Supabase URL:', process.env.DATABASE_URL ? 'URL Cargada OK' : '¡ERROR! URL UNDEFINED');

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