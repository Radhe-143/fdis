import commonLocale from './common'
import validationLocale from './validation'
import configCommon from '../packages/common/config'

const getContentLanguage = function (req, locales = configCommon.languageList) {
  const language = req.headers['content-language'] || req.headers['Content-Language'] || req.cookies.lang
  return locales.includes(language) ? language : configCommon.baseLanguage
}

export {
  getContentLanguage,
  commonLocale,
  validationLocale,
}
