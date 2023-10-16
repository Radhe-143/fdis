import Joi from 'joi'
import errorMessage from '../../utils/custom-error-message'

export default {
  create: {
    body: {
      ApplicationId: Joi.string().allow([null,'']).error(errorMessage()),
      UserId: Joi.string().allow([null,'']).error(errorMessage()),
      Password: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordFormat: Joi.number().allow([null, '']).error(errorMessage()),
      PasswordSalt: Joi.string().allow([null, '']).error(errorMessage()),
      MobilePIN: Joi.string().allow([null, '']).error(errorMessage()),
      Email: Joi.string().allow([null, '']).error(errorMessage()),
      LoweredEmail: Joi.string().allow([null, '']).error(errorMessage()),
      
     
     
     
      PasswordQuestion: Joi.string().allow([null, '']).error(errorMessage()),
      PasswordAnswer: Joi.string().allow([null, '']).error(errorMessage()),
      IsApproved: Joi.boolean().allow([null, '']).error(errorMessage()),
      IsLockedOut: Joi.boolean().allow([null, '']).error(errorMessage()),
     
      CreateDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastLoginDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastPasswordChangedDate: Joi.string().allow([null, '']).error(errorMessage()),
      LastLockoutDate: Joi.string().allow([null, '']).error(errorMessage()),
      FailedPasswordAttemptCount: Joi.number().allow([null, '']).error(errorMessage()),
      FailedPasswordAttemptWindowStart:Joi.string().allow(['']).error(errorMessage()),
      FailedPasswordAnswerAttemptCount:Joi.number().allow([null, '']).error(errorMessage()),
      FailedPasswordAnswerAttemptWindowStart: Joi.string().allow([null, '']).error(errorMessage()),
      Comment: Joi.string().allow([null, '']).error(errorMessage()),
    
    }
  }
}
