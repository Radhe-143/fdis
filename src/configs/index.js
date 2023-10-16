require('dotenv').config()

import defaults from './env'

const env = process.env.NODE_ENV || 'development'

let config

switch (env) {
  case 'production':
    config = require('./env/production').default
    break
  case 'staging':
    config = require('./env/staging').default
    break
  default:
    config = require('./env/development').default
    break
}

export default {...defaults, ...config}
