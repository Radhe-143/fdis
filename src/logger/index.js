import winston from 'winston'

const fs = require('fs')
require('winston-daily-rotate-file');

if (!fs.existsSync('../app-backend-logs')) {
  fs.mkdirSync('../app-backend-logs')
}


const transport = new winston.transports.DailyRotateFile({
  filename: '../app-backend-logs/api-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = winston.createLogger({
  transports: [
    transport
  ]
});

export default logger
