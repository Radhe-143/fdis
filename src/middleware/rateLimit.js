/* eslint-disable no-unused-vars */
import ipTool from 'ip'
import redisUtil from '../utils/redisUtil'
import to from '../utils/to'
import { commonLocale } from '../locales';
import { handleResponse } from '../utils/handle-response';

const PREFIX = 'rate_limit_'
const BLOCK_EXPIRES = 1 // minutes
const BLOCK_ATTEMPTS = 10

const moment = require('moment')

const buildRateKey = function (key, userIp) {
  return `${PREFIX + key}_${userIp}`
}

/**
 * Example:  3 time in 5 min
 * @param {*} key example sms
 * @param {*} expired 5 min
 * @param {*} attempts 3 time
 * @returns
 */
const rateLimitByIp = (key, expired = BLOCK_EXPIRES, attempts = BLOCK_ATTEMPTS) => async (req, res, next) => {
  const ip = ipTool.address().replace(/[.]/g, '_')
  const [error, data] = await to(redisUtil.getKey(buildRateKey(key, ip)))
  if (!data) {
    saveRateLimit(key, ip)
    return next()
  }
  const currentTime = moment().unix()
  const difference = (currentTime - data.startTime) / 60
  if (difference >= expired) {
    saveRateLimit(key, ip)
    next()
  } else {
    if (data.count > attempts) {
      return handleResponse(commonLocale.limitExceeded, null, req, res)
    }
    data.count += 1
    redisUtil.writeKey(buildRateKey(key, ip), data)
    next()
  }
}

const saveRateLimit = async (key, ip) => {
  const body = {
    count: 1,
    startTime: moment().unix()
  }
  redisUtil.writeKey(buildRateKey(key, ip), body)
}

export {
  rateLimitByIp
}
