import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      UserId: Joi.string().allow([null, '']).error(errorMessage()),
      Password: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordFormat: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordSalt: Joi.string().allow([null, '']).error(errorMessage()),
      MobilePIN: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordQuestion: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordAnswer: Joi.string().allow([null, '']).error(errorMessage()),
      IsApproved: Joi.string().allow([null, '']).error(errorMessage()),
      IsLockedOut: Joi.string().allow([null, '']).error(errorMessage()),
      CreateDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastLoginDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastPasswordChangedDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastLockoutDate: Joi.number().allow([null, '']).error(errorMessage()),
      FailedPasswordAttemptCount: Joi.string().allow([null, '']).error(errorMessage()),
      // CreateDate: Joi.string().allow([null, '']).error(errorMessage()),
      // LastLoginDate: Joi.string().allow([null, '']).error(errorMessage()),
      FailedPasswordAnswerAttemptWindowStart: Joi.string().allow([null, '']).error(errorMessage()),
      // Comment: Joi.string().allow([null, '']).error(errorMessage()),
    }
  }
}
