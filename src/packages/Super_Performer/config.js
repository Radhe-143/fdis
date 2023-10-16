const ALLOWED_UPDATE_ATTRIBUTE = 
[
'ApplicationId',
'UserId',
'Password',
'PasswordFormat',
'PasswordSalt',
'MobilePIN',
'Email',
'LoweredEmail',
'PasswordQuestion',
'PasswordAnswer',
'IsApproved',
'IsLockedOut',
'CreateDate',
'LastLoginDate',
'LastPasswordChangedDate',
'LastLockoutDate',
'FailedPasswordAttemptCount',
'FailedPasswordAttemptWindowStart',
'FailedPasswordAnswerAttemptCount',
'FailedPasswordAnswerAttemptWindowStart',
'Comment'
  ]
export default {
  limit: {
    index: 20
  },
  
  ALLOWED_UPDATE_ATTRIBUTE
}
