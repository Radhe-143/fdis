import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      ErrorTypeValue: Joi.string().required().error(errorMessage()),
      SortOrder: Joi.number().default(0).error(errorMessage())
    }
  }
}
