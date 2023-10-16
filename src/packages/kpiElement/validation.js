import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      FloorName: Joi.string().required().error(errorMessage()),
      FloorNameAbv: Joi.string().allow([null, '']).error(errorMessage()),
      SortOrder: Joi.number().default(1).error(errorMessage())
    }
  }
}
