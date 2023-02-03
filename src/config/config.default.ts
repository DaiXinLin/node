import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
import { ConnectionOptions } from "typeorm";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_{{keys}}";

  // add your config here
  config.middleware = [];

  config.orm = {
    type: "mysql",
    name: "default",
    database: "biyesheji",
    // synchronize: true,
    // dropSchema: true,
    // logger: "advanced-console",
    entities: ["../entities/*"],
    username: 'root',
    password: 'root'
  } as ConnectionOptions;

  config.jwt = {
    secret: 'biyeshiji12345',
    expiresIn: '1d'
  }

  config.onerror = {
    all (err, ctx) {
      let status = err.code || ctx.response.status
      ctx.body = JSON.stringify({
        code: status,
        message: 
          err?.message ||
          err?.detail?.[0]?.message ||
          err?.sqlMessage ||
          'error'
      })
      ctx.status = 200
    }
  }

  config.security = {
    csrf: false,
  };

  return config;
};
