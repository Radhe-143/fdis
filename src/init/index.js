import { connectDb } from './db'

export default async () => {
  global.valueAll = 'all'
  await connectDb()
  require('../logger')
  require('../models')
  if (global.isCronJobServer) {
    require('../schedules')
  }
}
