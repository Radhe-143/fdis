/* eslint no-multi-str: [0] */
const APP_NAME = 'FDIS_API'
const PATH = '/home/ec2-user/fdis/api/FDIS'
const USER = 'ec2-user'
const REPO = 'git@github.com:av-brilliance/FDIS.git'

// Production
const IP1 = ''
const PORT = '22'
const BRANCH_PROD = 'origin/master'

// Staging
const STAGE_IP1 = ''
const STAGE_IP2 = ''
const STAGE_PORT = '2323'
const BRANCH_STAGE = 'origin/staging'

// Dev
const DEV_IP = '54.93.34.204'
const DEV_PORT = '22'
const DEV_BRANCH = 'origin/dev'

const POST_DEPLOY = {
  PROD: 'ln -nfs ../shared/.env .env && \
          npm install --production && \
          pm2 reload ecosystem.config.js',

  STAGE: 'ln -nfs ../shared/.env .env && \
          npm install --production && \
          pm2 reload ecosystem.config.js',
  DEV: 'ln -nfs ../shared/.env .env && \
          npm install && \
          pm2 reload ecosystem.config.js'
}

module.exports = {
  apps: [{
    name: APP_NAME,
    script: './app.js',
    instances: 'max',
    wait_ready: true,
    exec_mode: 'cluster'
  }],

  deploy: {
    dev: {
      user: USER,
      host: [{
        host: DEV_IP,
        port: DEV_PORT
      }],
      ref: DEV_BRANCH,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.DEV
    },
    stage: {
      user: USER,
      host: [{
        host: STAGE_IP1,
        port: STAGE_PORT
      }, {
        host: STAGE_IP2,
        port: STAGE_PORT
      }],
      ref: BRANCH_STAGE,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.STAGE
    },
    prod: {
      user: USER,
      host: [{
        host: IP1,
        port: PORT
      }],
      ref: BRANCH_PROD,
      repo: REPO,
      path: PATH,
      'post-deploy': POST_DEPLOY.PROD
    }
  }
}
