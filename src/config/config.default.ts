import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
});

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629703093134_3672';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };

  config.cors = { // 解决跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    origin: () => '*',
  };

  config.orm = {
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    type: 'mysql',
    name: 'default',
    timezone: 'Z',
    // database: 'local_fp_database_all',
    database: process.env.TYPEORM_DATABASE,
    synchronize: true, // process.env.TYPEORM_SYNC,
    // logging: ['query', 'error'],
    logging: process.env.TYPEORM_LOGGING ? ['query', 'error'] : [],
    entities: [
      process.env.NODE_ENV === 'development' ? 'src/models/*.ts' : 'dist/models/*.js',
    ],
    // dropSchema: true,
  };

  return config;
};
