// /* eslint-disable no-underscore-dangle */
// import { Sequelize } from 'sequelize'
// import config from '../configs'

// const tedious = require('tedious')

// const dbConfig = new Sequelize(config.db.db, config.db.user, config.db.password, {
//   port: config.db.port,
//   host: config.db.host,
//   dialect: config.db.type || 'mysql',
//   dialectOptions: { decimalNumbers: true },
//   logging: true,
//   dialectModule: tedious,
//   logQueryParameters: false,
//   pool: {
//     min: 0,
//     max: 5,
//     acquire: 30000,
//     idle: 10000,
//   },
// })
// const initTransaction = async (req, res, next) => {
//   req._transaction = await dbConfig.transaction().catch();

//   return next()
// }
// const connectDb = async () => {
//   return dbConfig.authenticate()
// }

// // Override timezone formatting for MSSQL
// Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
//   return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
// };

// export {
//   dbConfig,
//   initTransaction,
//   connectDb
// }


/* eslint-disable no-underscore-dangle */
import { Sequelize } from 'sequelize';
import config from '../configs';

const tedious = require('tedious');

const dbConfig = new Sequelize(config.db.db, config.db.user, config.db.password, {
  port: config.db.port,
  host: config.db.host,
  dialect: config.db.type || 'mysql',
  dialectOptions: { decimalNumbers: true },
  logging: false, // Disable logging or provide a custom logging function
  dialectModule: tedious,
  logQueryParameters: false,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
});

const initTransaction = async (req, res, next) => {
  req._transaction = await dbConfig.transaction();

  return next();
};

const connectDb = async () => {
  try {
    await dbConfig.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

export { dbConfig, initTransaction, connectDb };
