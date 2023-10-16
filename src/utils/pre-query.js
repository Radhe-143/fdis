import responseBuilder from './response-builder'
import validation from './validation'
import { notFoundLocale } from '../locales'
import { User } from '../models'
import stringUtil from './stringUtil'

function query(req, res, next, _id, Model, message) {
  if (!validation.isObjectId(_id)) {
    return res.status(404).jsonp(responseBuilder.build(false, null, { message }))
  }

  Model.findOne({ _id }, (error, doc) => {
    if (error || !doc) {
      res.status(404).jsonp(responseBuilder.build(false, null, { message }))
    } else {
      req[`${stringUtil.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

const user = (req, res, next, _id) => {
  query(req, res, next, _id, User, notFoundLocale.user)
}

export default {
  user
}
