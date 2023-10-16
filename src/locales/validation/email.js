import { commonCode } from '../response-code'

export default {
  emailInvalid: {
    code: commonCode.badRequest,
    message: 'email.emailInvalid'
  },
  expiredCode: {
    code: commonCode.badRequest,
    message: 'email.expiredCode'
  },
  emailNoneRegister: {
    code: commonCode.badRequest,
    message: 'email.emailNoneRegister'
  },
  incorrectCode: {
    code: commonCode.badRequest,
    message: 'email.incorrectCode'
  },
  sendEmailFail: {
    code: commonCode.badRequest,
    message: 'email.sendEmailFail'
  },
  existedEmail: {
    code: commonCode.duplicate,
    message: 'email.existedEmail'
  },
  emailNotVerified: {
    code: commonCode.badRequest,
    message: 'email.emailNotVerified'
  }
}
