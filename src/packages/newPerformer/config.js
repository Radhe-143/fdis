const ALLOWED_UPDATE_ATTRIBUTE=[
    'UserId',
    'UserName',
    'FirstName',
      'LastName',
      'Email',
      'LoweredEmail',
      'Mobile',
      'Phone',
      'IsAnonymous',
      'IsApproved',
      'IsLockedOut',
      'Count',
      'Ordinal',
      'ReportType',
      'Password',
      'PasswordSalt',
      'CreateDate',
      'CompanyName',
      'ClientId',
      'ApplicationId',
      'AdminId',
      'ProfileImage',
      'PerformerTypes_Id',
      'UserClientIds',
]

export default {
    limit: {
      index: 30
    },
    ALLOWED_UPDATE_ATTRIBUTE
  }

     // For Multiple Selective  // 

  import service from './service'

export { service }