import config from '../configs'


function getOsEnv(key, required = true) {
  if (typeof process.env[key] === 'undefined' && required) {
    throw new Error(`Environment variable ${key} is not set.`)
  }

  return process.env[key]
}

function isProduction() {
  return process.env.NODE_ENV === config.env.production
}

function isDevelopment() {
  return process.env.NODE_ENV === config.env.development
}

function isStaging() {
  return process.env.NODE_ENV === config.env.staging
}

export default {
  getOsEnv,
  isDevelopment,
  isProduction,
  isStaging,
  ...process.env
}
