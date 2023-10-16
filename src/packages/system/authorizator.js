import { commonLocale } from '../../locales/index'
import ResponseBuilder from '../../utils/response-builder'
import cipher from '../../utils/cipher'

const BAD_REQUEST_CODE = 400
const UN_AUTHORIZED_CODE = 401
const FORBIDDEN_CODE = 403
const DUPLICATE_CODE = 409
const SERVER_ERROR_CODE = 500
const SUCCESS_CODE = 200
const INVALID_CODE = 422
const NOT_FOUND = 404
const NOT_ACCEPTABLE = 406
const LIMIT_EXCEEDED = 429

const ACCEPT_ERROR_STATUS = [
  BAD_REQUEST_CODE,
  BAD_REQUEST_CODE,
  UN_AUTHORIZED_CODE,
  FORBIDDEN_CODE,
  DUPLICATE_CODE,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  INVALID_CODE,
  NOT_FOUND,
  NOT_ACCEPTABLE,
  LIMIT_EXCEEDED
]

function isAuthenticated(user) {
  return (user && user._id)
}

const requireLogin = async (req, res, next) => {
  const isAuthorized = await isAuthenticated(req.user)
  if (!isAuthorized) {
    return res.status(UN_AUTHORIZED_CODE).jsonp(ResponseBuilder.build(false, null))
  }
  next()
}

async function checkPasswordFormat(req, res, next) {
  const { password } = req.body
  if (!password || !cipher.isMd5Hash(password)) {
    return res.status(BAD_REQUEST_CODE).jsonp(ResponseBuilder.build(false, null, {
      message: commonLocale.passwordInvalidFormat
    }))
  }
  next()
}

export default {
  checkPasswordFormat,
  requireLogin
}

export {
  BAD_REQUEST_CODE,
  UN_AUTHORIZED_CODE,
  DUPLICATE_CODE,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  INVALID_CODE,
  NOT_FOUND,
  FORBIDDEN_CODE,
  NOT_ACCEPTABLE,
  LIMIT_EXCEEDED,
  ACCEPT_ERROR_STATUS
}
