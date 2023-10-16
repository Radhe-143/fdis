// validation.js
import Joi from 'joi';
import errorMessage from '../../utils/custom-error-message';

export default {
  // ...
  create: {
      body: {

        Text: Joi.string().optional().error(errorMessage()),
        subject: Joi.string().required().error(errorMessage()),
        html: Joi.string().required().error(errorMessage())
      },
  },
};
