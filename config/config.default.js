/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564535327982_6870';

  // add your middleware config here
  config.middleware = [];

  config.redis = {
    client: {
      port: 6379,
      host: '192.168.2.10',
      password: null,
      db: 0,
    },
  };

  // schex config
  config.schex = {
    client: {
      port: 6379,
      host: '192.168.2.10',
      // password: null,
      db: 0,
      keyPre: 'sdb:schedule',
      checkInterval: 5000,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    customLogger: {
      schexLogger: {
        consoleLevel: 'INFO',
        file: 'egg-schex.log',
      },
    },
  };
};
