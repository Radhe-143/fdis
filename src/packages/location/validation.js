import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      Name: Joi.string().required().error(errorMessage()),
      Size: Joi.number().error(errorMessage()),
      ClientId: Joi.string().required().error(errorMessage()),
      Region: Joi.string().allow([null, '']).error(errorMessage()),
      City: Joi.string().allow([null, '']).error(errorMessage()),
      Address: Joi.string().allow([null, '']).error(errorMessage()),
      ContactPerson: Joi.string().allow([null, '']).error(errorMessage()),
      Activate: Joi.boolean().error(errorMessage()),
      Email: Joi.string().allow([null, '']).error(errorMessage()),
    }
  }
}