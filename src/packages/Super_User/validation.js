import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      UserId: Joi.string().error(errorMessage()),
      UserName: Joi.string().default(false).error(errorMessage()),
      LoweredUserName: Joi.string().required().error(errorMessage()),
      MoblieAlias: Joi.string().default(1).error(errorMessage()),
      IsAnonymous:Joi.string().default().error(errorMessage()),
      LastActivityDate:Joi.string().default().error(errorMessage()) 
     }

    }
  }