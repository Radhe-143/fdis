import express from 'express'
import ev from 'express-validation'
import morgan from 'morgan'
import cors from 'cors'
import methodOverride from 'method-override'
import compress from 'compression'
import helmet from 'helmet'
import path from 'path'
import cookieParser from 'cookie-parser'
import i18n from 'i18n'
import { EventEmitter } from 'events'
import multiCores from './multi-cores'
import { commonLocale, getContentLanguage } from './locales'
import init from './init'
import route from './routes'
import responseBuilder from './utils/response-builder'
import logger from './logger'
import errorUtil from './utils/error'
import env from './utils/env'
import configCommon from './packages/common/config'

const mediator = new EventEmitter()
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(compress())
app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cookieParser());
multiCores(app, mediator)

i18n.configure({
  locales: configCommon.languageList,
  directory: `${__dirname}/locales/locales`,
  defaultLocale: configCommon.baseLanguage,
  cookie: 'lang',
  autoReload: false,
  updateFiles: false,
  objectNotation: true,
  api: {
    __: 't'
  }
});
app.use(i18n.init)

app.use('*', (req, res, next) => {
  const locales = i18n.getLocales();
  const language = getContentLanguage(req, locales)
  i18n.setLocale(language)

  next()
})

// Serving static files in Express
app.use(express.static('public'))
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs')

if (env.isDevelopment()) {
  app.use(express.static(`${process.cwd()}/apidoc`))
  app.get('/apidoc', (req, res) => {
    res.sendFile(path.join(`${process.cwd()}/apidoc/index.html`))
  })
}

mediator.once('boot.ready', () => {
  console.log('SERVER BOOT READY')
  init(app)

  app.use(route())
  app.use(handleNotFoundError)
  app.use(handleValidationError)
})

function handleNotFoundError(req, res) {
  console.log('404', req.url)
  logger.info({
    data: {
      url: `404 - ${req.method.toUpperCase()} ${req.url}`,
      clientData: ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
    }
  })
  return res.status(404).jsonp(responseBuilder.build(false, null, errorUtil.parseError(commonLocale.apiNotFound)))
}

// eslint-disable-next-line no-unused-vars
function handleValidationError(error, req, res, _) {
  if (error instanceof ev.ValidationError) {
    return res.status(error.status).jsonp(responseBuilder.build(false, null, {
      code: error.status,
      message: error.errors[0].messages[0].split('"').join('').split('undefined').join('')
    }))
  } else {
    console.log('500', error)
    logger.info({
      data: {
        url: `500 - ${req.method.toUpperCase()} ${req.url}`,
        clientData: ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
      }
    })
    return res.status(500).jsonp(responseBuilder.build(false, null, errorUtil.parseError(commonLocale.serverError)))
  }
}
export default app
