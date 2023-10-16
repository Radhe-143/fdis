import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      CategoryNameAbv: Joi.string().error(errorMessage()),
      IsFixed: Joi.boolean().default(false).error(errorMessage()),
      CategoryName: Joi.string().required().error(errorMessage()),
      SortOrder: Joi.number().default(1).error(errorMessage())
    }
  }
}
