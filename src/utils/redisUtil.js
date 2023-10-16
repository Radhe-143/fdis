/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
// import redis from 'redis'
import IORedis from 'ioredis'
import redis from 'redis'
import config from '../configs'
import env from './env'

let client = null
// CLUSTER INIT BY NODE_ENV AND CLUSTER MODE CONFIG
client = env.isProduction() && config.redisDB.isClusterMode == '1' ? new IORedis.Cluster([
  {
    host: config.redisDB.host,
    port: config.redisDB.port
  }
]) : redis.createClient(config.redisDB.port, config.redisDB.host);

client.on('error', (error) => {
  console.log(`could not establish a connection with redis. ${error}`);
});

client.on('connect', () => {
  console.log('connected to redis successfully');
});


const RedisKeyContss = 'app_name:';
const DISTANCE_TYPE = 'km'


/**
 * get specifiy cache and return data
 * @param {*} keyId
 */
function getKey(keyId) {
  return new Promise((resolve, reject) => {
    client.get(RedisKeyContss + keyId, (err, reply) => {
      if (!err && reply) {
        resolve(JSON.parse(reply))
      } else {
        resolve()
      }
    })
  })
}

/**
 * write cache data with expiry
 * @param {*} keyId
 * @param {*} data data to cache
 * @param {*} expiry the lifetime of cache. value is timespan in seconds / A value of 0 represents never expiring
 */
function writeKey(keyId, data, expiry) {
  return new Promise((resolve, reject) => {
    if (expiry) {
      client.set(RedisKeyContss + keyId, JSON.stringify(data), 'EX', expiry, (err, reply) => {
        if (!err && reply) {
          resolve(reply)
        } else {
          reject(err)
        }
      })
    } else {
      client.set(RedisKeyContss + keyId, JSON.stringify(data), (err, reply) => {
        if (!err && reply) {
          resolve(reply)
        } else {
          reject(err)
        }
      })
    }
  })
}
/**
 * Clear Cache
 * @param {*} keyId
 */
function purgeKey(keyId) {
  return new Promise((resolve, reject) => {
    client.del(RedisKeyContss + keyId, (err, reply) => {
      if (!err && reply) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}


/**
 * Push data to queue
 * @param {*} keyId
 * @param {*} data data
 * @param {*} expiry the lifetime of cache. value is timespan in seconds / A value of 0 represents never expiring
 */
function pushToStored(keyId, data, expiry) {
  return new Promise((resolve, reject) => {
    if (expiry) {
      client.rpush(RedisKeyContss + keyId, JSON.stringify(data), 'EX', expiry, (err, reply) => {
        if (!err && reply) {
          resolve(reply)
        } else {
          reject(err)
        }
      })
    } else {
      client.rpush(RedisKeyContss + keyId, JSON.stringify(data), (err, reply) => {
        if (!err && reply) {
          resolve(reply)
        } else {
          reject(err)
        }
      })
    }
  })
}

/**
 * Get first n items and remove it from list stored/queue
 * @param {*} key
 * @param {*} num N
 */
function getFirstNItemFromQueue(key, num) {
  return new Promise(async (resolve, reject) => {
    client.lrange(RedisKeyContss + key, 0, num - 1, (err, reply) => {
      if (!err && reply) {
        client.ltrim(RedisKeyContss + key, num, -1, (err2, reply2) => {
          if (!err2 && reply2) {
            return resolve(JSON.parse(`[${reply}]`))
          } else {
            reject(err2)
          }
        });
      } else {
        return reject(err)
      }
    });
  })
}


/**
 * Get first n items and remove it from list stored/queue
 * @param {*} key
 * @param {*} num N
 */
function getAllFromQueue(key, num) {
  return new Promise(async (resolve, reject) => {
    client.lrange(RedisKeyContss + key, 0, -1, (err, reply) => {
      if (!err && reply) {
        return resolve(JSON.parse(`[${reply}]`))
      } else {
        return reject(err)
      }
    });
  })
}

/**
 * Remove Item From Queue
 * @param {*} key
 * @param {*} value
 */
function removeValueFromQueue(key, value) {
  return new Promise(async (resolve, reject) => {
    client.lrem(RedisKeyContss + key, 0, value, (err, reply) => {
      if (!err && reply) {
        return resolve(reply)
      } else {
        return reject(err)
      }
    });
  })
}

/**
 * get specifiy cache by coordinates and return data
 * @param {*} key prefix key
 * @param {*} lng longitude
 * @param {*} lat latitude
 * @param {*} distance distance
 */
function getByGeo(key, lng, lat, distance) {
  return new Promise((resolve, reject) => {
    client.georadius(key, lng, lat, distance, DISTANCE_TYPE, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.stringify([`${result}`]))
      }
    })
  })
}


/**
 * Get first key inside namespace(folder)
 * @param {*} namespace
 */
function getFirstKeyFromNamespace(namespace) {
  return new Promise((resolve, reject) => {
    client.keys(`${RedisKeyContss + namespace}*`, (err, reply) => {
      if (!err && reply) {
        resolve(reply[0])
      } else {
        reject(err)
      }
    })
  })
}

export default {
  getKey,
  writeKey,
  purgeKey,
  pushToStored,
  getFirstNItemFromQueue,
  getFirstKeyFromNamespace,
  getAllFromQueue,
  removeValueFromQueue,
  client
};
