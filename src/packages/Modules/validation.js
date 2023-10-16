import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      Name: Joi.string().required().error(errorMessage()),
      AreaName: Joi.string().required().error(errorMessage()),
      // Feedback: Joi.string().required().error(errorMessage()),
    }
  }
}
