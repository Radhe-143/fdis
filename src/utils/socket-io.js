/* eslint-disable import/no-mutable-exports */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import env from '../utils/env'
import config from '../configs'
import redisUtil from './redisUtil'

const sio = require('socket.io')
const redisAdapter = require('socket.io-redis')

let io = null
/**
 * Emit to all user activity screen on 'u_{id}' room
 * First, on connection need join all user socketid to room 'u_{id}: id of user model'
 * @param room 'u_{id}' room name
 * @param topic name of event 'ninja_assiged'
 * @param message data type any
 */
const touser = function (room, topic, message) {
  if (!room || !topic || !io) {
    return
  }
  io.to(room).emit(topic, message)
}
/**
 * @param room ex:'notifications' room name
 * @param topic name of event 'notify'
 * @param message data type any
 */
const toroom = function (room, topic, message) {
  if (!room || !topic || !io) {
    return
  }
  io.to(room).emit(topic, message)
}
/**
 * Send message to all client socket
 * @param topic name of event 'notify'
 * @param message data type any
 */
const toall = function (topic, message) {
  if (!topic || !io) {
    return
  }
  io.emit(topic, message)
}

const initialize = function (server) {
  io = sio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })
  if (env.isProduction() && config.redisDB.isClusterMode == '1') {
    // CLUSTER INIT
    io.adapter(redisAdapter({
      pubClient: redisUtil.client,
      subClient: redisUtil.client,
    }))
  } else {
    io.adapter(redisAdapter({
      host: config.redisDB.host,
      port: config.redisDB.port,
    }))
  }

  return io
}

export default {
  toall,
  toroom,
  touser,
  io,
  initialize,
}
