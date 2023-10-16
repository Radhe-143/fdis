require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true,
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different file name. Default: sequelize-data.json
    // seederStoragePath: 'sequelizeData.json',
    // Use a different table name. Default: SequelizeData
    // seederStorageTableName: 'sequelize_data'
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true,
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different file name. Default: sequelize-data.json
    // seederStoragePath: 'sequelizeData.json',
    // Use a different table name. Default: SequelizeData
    // seederStorageTableName: 'sequelize_data'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    // Use a different storage. Default: none
    seederStorage: 'sequelize',
    // Use a different file name. Default: sequelize-data.json
    // seederStoragePath: 'sequelizeData.json',
    // Use a different table name. Default: SequelizeData
    // seederStorageTableName: 'sequelize_data',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
