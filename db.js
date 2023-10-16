const Sequelize = require('sequelize')
const tedious = require('tedious')

const dbConfig = new Sequelize('fdis', 'fdisadmin', 'fd1sadm1n', {
  port: 1433,
  host: 'fdisdemomanojnew.c8056k6bptav.eu-central-1.rds.amazonaws.com',
  dialect: 'mssql',
  dialectModule: tedious,
  dialectOptions: { decimalNumbers: true },
  logging: false,
  logQueryParameters: false,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
})
try {
    dbConfig.authenticate();
   console.log('Connection Has Been Established Successfully.');
 } catch (error) {
   console.error('Unable To Connect To The Database:', error);
 }


 // Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

 module.exports = dbConfig;
