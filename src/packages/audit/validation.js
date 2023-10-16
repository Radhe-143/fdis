import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      Date: Joi.string().error(errorMessage()),
      IsActive: Joi.number().error(errorMessage()),
      IsDone: Joi.number().error(errorMessage()),
      Type: Joi.string().error(errorMessage()),
      NameClient_Id: Joi.string().allow([null, '']).error(errorMessage()),
      LocationClient_Id: Joi.string().allow([null, '']).error(errorMessage()),
      PresentClient: Joi.string().allow([null, '']).error(errorMessage()),
      Attn: Joi.string().allow([null, '']).error(errorMessage()),
      week: Joi.number().allow([null, '']).error(errorMessage()),
      LastControlDate: Joi.string().allow([null, '']).error(errorMessage()),
      Activate: Joi.number().allow([null, '']).error(errorMessage()),
      LocationManagerSignImage: Joi.string().allow([null, '']).error(errorMessage()),
      image: Joi.string().allow('').error(errorMessage()),
      newPerformerIds:Joi.array().allow([null,'']).error(errorMessage())
    }
  }
}
