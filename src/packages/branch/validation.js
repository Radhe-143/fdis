import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      BranchName: Joi.string().required().uppercase().error(errorMessage())
    }
  }
}
