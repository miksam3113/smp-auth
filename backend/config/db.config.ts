import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
import { UsersEntity } from '../entities/user.entity';

const data = dotenv.parse(fs.readFileSync(`.env`));
export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: data.DATABASE_HOST,
  port: +data.DATABASE_PORT,
  username: data.DATABASE_USERNAME,
  password: data.DATABASE_PASSWORD,
  database: data.DATABASE_NAME,
  entities: [UsersEntity],
  migrations: [],
  synchronize: false,
};

const dataSource = new DataSource(dbConfig);

dataSource.initialize();

export default dataSource;
