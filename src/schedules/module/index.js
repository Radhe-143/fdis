import { CronJob } from 'cron'

const every5Second = '*/5 * * * * *'
const job = new CronJob({
  cronTime: every5Second,
  onTick: () => {
    doJob()
    console.log('Runing Job');
  },
  timeZone: 'Asia/Ho_Chi_Minh'
})

function doJob() {
  // TODO
}

job.start()
