import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      FirstName: Joi.string().allow([null , '']).error(errorMessage()),
      LastName: Joi.string().allow([null , '']).error(errorMessage()),
      UserName: Joi.string().required().error(errorMessage()),
      ProfileImage: Joi.string().allow([null, '']).error(errorMessage())
     }
  }
}
