import { DataSource } from 'typeorm';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: 'otpokemon',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
  entities:
    process.env.NODE_ENV === 'prod'
      ? ['dist/modules/**/infra/typeorm/*.js']
      : ['src/modules/**/infra/typeorm/*.ts'],
  migrations:
    process.env.NODE_ENV === 'prod'
      ? ['dist/shared/infra/database/migrations/*.js']
      : ['src/shared/infra/database/migrations/*.ts'],
});
