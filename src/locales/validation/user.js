import { commonCode } from '../response-code'

export default {
  accountBlocked: {
    code: commonCode.forbidden,
    message: 'user.accountBlocked'
  },
  accountBlockedUntilDate: {
    code: commonCode.forbidden,
    message: 'user.accountBlockedUntilDate'
  },
  existUser: {
    code: commonCode.badRequest,
    message: 'user.existUser'
  },
  notExistUser: {
    code: commonCode.badRequest,
    message: 'user.notExistUser'
  },
  passwordNotMatch: {
    code: commonCode.badRequest,
    message: 'user.passwordNotMatch'
  },
  requiredPassword: {
    code: commonCode.badRequest,
    message: 'user.requiredPassword'
  }
}
