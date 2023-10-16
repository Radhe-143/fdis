import { Sequelize } from 'sequelize';
import { UserSeq, SuperPerformer } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
// import method from './method'
import sequelize from 'sequelize';
//import uploadImages from '../../utils/multer'

async function findById(id) {

  return SuperPerformer.findByPk(id)

}

async function findOne(query) {
  return UserSeq.findOne({
    where: {
      ...query
    }
  });
}

// const create01 = async (qwery,body) => {
//   let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   body.Password = await method.hashPassword(body.Password)
//   let date=Date();

//   const raw =  `BEGIN TRAN T1;
//   INSERT INTO Users (UserName,FirstName,LastName)
//   VALUES('${body.UserName}','${body.FirstName}','${body.LastName}') ;

//   INSERT INTO aspnet_Users (ApplicationId,UserId,UserName,LoweredUserName,MobileAlias,IsAnonymous,LastActivityDate)
//   VALUES('${ApplicationId}',(SELECT Id From Users Where UserName='${body.UserName}'),
//   '${body.UserName}','${body.UserName}','${body.Mobile}',
//   '${body.IsAnonymous}','${body.CreateDate}');

//   INSERT INTO aspnet_UsersInRoles(RoleId,UserId)
//   VALUES('${AdminId}',(SELECT Id From Users Where UserName='${body.UserName}'));

//   INSERT INTO aspnet_Membership(ApplicationId,UserId,Password,PasswordFormat,PasswordSalt,MobilePIN,Email,IsApproved,IsLockedOut,CreateDate,LastLoginDate,LastPasswordChangedDate,LastLockoutDate
//   ,FailedPasswordAttemptCount,FailedPasswordAttemptWindowStart,FailedPasswordAnswerAttemptCount,FailedPasswordAnswerAttemptWindowStart)
//   VALUES('${ApplicationId}',
//   (SELECT Id From Users Where UserName='${body.UserName}'),
//   '${body.Password}',
//   '${body.PasswordFormat}',
//   '${body.PasswordSalt}',
//   '${body.Mobile}','${body.Email}', '${body.IsApproved}','${body.IsLockedOut}','${body.CreateDate}', '${body.CreateDate}','${body.CreateDate}','${body.CreateDate}','${body.Count}','${body.CreateDate}','${body.Count}','${body.CreateDate}');

//   INSERT INTO Users_Client(CompanyName,Id,ReportType)
//   VALUES  ('${body.CompanyName}',(SELECT Id From Users Where UserName='${body.UserName}'),'${body.ReportType}');

//   INSERT INTO Users_Auditor(Id,Mobile,Phone)
//   VALUES ((SELECT Id From Users Where UserName='${body.UserName}'),'${body.Mobile}','${body.Phone}');

//   INSERT INTO ClientAuditor(AuditorId,ClientId)
//   VALUES (((SELECT Id From Users Where UserName='${body.UserName}')),'${body.ClientId}')

//   INSERT INTO TypeOfPerformers(Performers_Id,PerformerTypes_Id)
//   VALUES ((SELECT Id From Users Where UserName='${body.UserName}'),'${body.PerformerTypes_Id}');
//   COMMIT TRAN T1;
//   `
//    return SuperPerformer.sequelize.query(raw, {
//     replacements:[''],
//     type: Sequelize.QueryTypes.INSERT
//    })

//   // return (await SuperPerformer.create(body)).get({ plain: true })
// }


// const create01 = async (qwery, body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   body.Password = await method.hashPassword(body.Password);
//   let date = new Date();

//   const raw = `
//     BEGIN TRAN T1;

//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES ('${body.UserName}', '${body.FirstName}', '${body.LastName}');

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES ('${ApplicationId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'),
//       '${body.UserName}', '${body.UserName}', '${body.Mobile}',
//       '${body.IsAnonymous}', '${date.toISOString()}');

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES ('${AdminId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES ('${ApplicationId}',
//       (SELECT Id FROM Users WHERE UserName = '${body.UserName}'),
//       '${body.Password}',
//       '${body.PasswordFormat}',
//       '${body.PasswordSalt}',
//       '${body.Mobile}', '${body.Email}', '${body.IsApproved}', '${body.IsLockedOut}', '${date.toISOString()}', '${date.toISOString()}', '${date.toISOString()}', '${date.toISOString()}',
//       '${body.Count}', '${date.toISOString()}', '${body.Count}', '${date.toISOString()}');

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES ('${body.CompanyName}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.ReportType}');

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.Mobile}', '${body.Phone}');

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.ClientId}');

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.PerformerTypes_Id}');

//     COMMIT TRAN T1;
//   `;

//   return SuperPerformer.sequelize.query(raw, {
//     replacements: [''],
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   // return (await SuperPerformer.create(body)).get({ plain: true })
// };

// old wala h

// const create01 = async (qwery, body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   body.Password = await method.hashPassword(body.Password);
//   let date = new Date();

//   const raw = `
//     BEGIN TRAN T1;

//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES ('${body.UserName}', '${body.FirstName}', '${body.LastName}');

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES ('${ApplicationId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'),
//       '${body.UserName}', '${body.UserName}', '${body.Mobile}',
//       '${body.IsAnonymous}', '${date.toISOString()}');

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES ('${AdminId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES ('${ApplicationId}',
//       (SELECT Id FROM Users WHERE UserName = '${body.UserName}'),
//       '${body.Password}',
//       '${body.PasswordFormat}',
//       '${body.PasswordSalt}',
//       '${body.Mobile}', '${body.Email}', '${body.IsApproved}', '${body.IsLockedOut}', '${date.toISOString()}', '${date.toISOString()}', '${date.toISOString()}', '${date.toISOString()}',
//       '${body.Count}', '${date.toISOString()}', '${body.Count}', '${date.toISOString()}');

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES ('${body.CompanyName}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.ReportType}');

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.Mobile}', '${body.Phone}');

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.ClientId}');

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES ((SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.PerformerTypes_Id}');

//     COMMIT TRAN T1;
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: [''],
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };

// new wala h

// const create01 = async (qwery, body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   body.Password = await method.hashPassword(body.Password);
//   let date = new Date();

//   const raw = `
//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES (:userName, :firstName, :lastName);

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES (:applicationId, (SELECT Id FROM Users WHERE UserName = :userName),
//       :userName, :userName, :mobile,
//       :isAnonymous, :lastActivityDate);

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES (:adminId, (SELECT Id FROM Users WHERE UserName = :userName));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES (:applicationId,
//       (SELECT Id FROM Users WHERE UserName = :userName),
//       :password,
//       :passwordFormat,
//       :passwordSalt,
//       :mobile, :email, :isApproved, :isLockedOut, :createDate, :lastLoginDate, :lastPasswordChangedDate, :lastLockoutDate,
//       :count, :failedPasswordAttemptWindowStart, :count, :failedPasswordAnswerAttemptWindowStart);

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES (:companyName, (SELECT Id FROM Users WHERE UserName = :userName), :reportType);

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :mobile, :phone);

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :clientId);

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :performerTypesId);
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: {
//       userName: body.UserName,
//       firstName: body.FirstName,
//       lastName: body.LastName,
//       applicationId: ApplicationId,
//       adminId: AdminId,
//       mobile: body.Mobile,
//       isAnonymous: body.IsAnonymous,
//       lastActivityDate: date.toISOString(),
//       password: body.Password,
//       passwordFormat: body.PasswordFormat,
//       passwordSalt: body.PasswordSalt,
//       email: body.Email,
//       isApproved: body.IsApproved,
//       isLockedOut: body.IsLockedOut,
//       createDate: date.toISOString(),
//       lastLoginDate: date.toISOString(),
//       lastPasswordChangedDate: date.toISOString(),
//       lastLockoutDate: date.toISOString(),
//       count: body.Count,
//       failedPasswordAttemptWindowStart: date.toISOString(),
//       failedPasswordAnswerAttemptWindowStart: date.toISOString(),
//       companyName: body.CompanyName,
//       reportType: body.ReportType,
//       phone: body.Phone,
//       clientId: body.ClientId,
//       performerTypesId: body.PerformerTypes_Id
//     },
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };

// without hash

// const create01 = async ( body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   let date = new Date();

//   const raw = `
//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES (:userName, :firstName, :lastName);

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES (:applicationId, (SELECT Id FROM Users WHERE UserName = :userName),
//       :userName, :userName, :mobile,
//       :isAnonymous, :lastActivityDate);

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES (:adminId, (SELECT Id FROM Users WHERE UserName = :userName));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES (:applicationId,
//       (SELECT Id FROM Users WHERE UserName = :userName),
//       :password,
//       :passwordFormat,
//       :passwordSalt,
//       :mobile, :email, :isApproved, :isLockedOut, :createDate, :lastLoginDate, :lastPasswordChangedDate, :lastLockoutDate,
//       :count, :failedPasswordAttemptWindowStart, :count, :failedPasswordAnswerAttemptWindowStart);

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES (:companyName, (SELECT Id FROM Users WHERE UserName = :userName), :reportType);

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :mobile, :phone);

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :clientId);

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :performerTypesId);
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: {
//       userName: body.UserName,
//       firstName: body.FirstName,
//       lastName: body.LastName,
//       applicationId: ApplicationId,
//       adminId: AdminId,
//       mobile: body.Mobile,
//       isAnonymous: body.IsAnonymous,
//       lastActivityDate: date.toISOString(),
//       password: body.Password,
//       passwordFormat: body.PasswordFormat,
//       passwordSalt: body.PasswordSalt, // Make sure this value is provided
//       email: body.Email,
//       isApproved: body.IsApproved,
//       isLockedOut: body.IsLockedOut,
//       createDate: date.toISOString(),
//       lastLoginDate: date.toISOString(),
//       lastPasswordChangedDate: date.toISOString(),
//       lastLockoutDate: date.toISOString(),
//       count: body.Count,
//       failedPasswordAttemptWindowStart: date.toISOString(),
//       failedPasswordAnswerAttemptWindowStart: date.toISOString(),
//       companyName: body.CompanyName,
//       reportType: body.ReportType,
//       phone: body.Phone,
//       clientId: body.ClientId,
//       performerTypesId: body.PerformerTypes_Id
//     },
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };


// const create01 = async (query, body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   let date = new Date();

//   const raw = `
//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES (:userName, :firstName, :lastName);

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES (:applicationId, (SELECT Id FROM Users WHERE UserName = :userName),
//       :userName, :userName, :mobile,
//       :isAnonymous, :lastActivityDate);

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES (:adminId, (SELECT Id FROM Users WHERE UserName = :userName));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES (:applicationId,
//       (SELECT Id FROM Users WHERE UserName = :userName),
//       :password,
//       :passwordFormat,
//       :passwordSalt,
//       :mobile, :email, :isApproved, :isLockedOut, :createDate, :lastLoginDate, :lastPasswordChangedDate, :lastLockoutDate,
//       :count, :failedPasswordAttemptWindowStart, :count, :failedPasswordAnswerAttemptWindowStart);

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES (:companyName, (SELECT Id FROM Users WHERE UserName = :userName), :reportType);

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :mobile, :phone);

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :clientId);

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :performerTypesId);
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: {
//       userName: body.UserName,
//       firstName: body.FirstName,
//       lastName: body.LastName,
//       applicationId: ApplicationId,
//       adminId: AdminId,
//       mobile: body.Mobile,
//       isAnonymous: body.IsAnonymous,
//       lastActivityDate: date.toISOString(),
//       password: body.Password,
//       passwordFormat: body.PasswordFormat,
//       passwordSalt: body.PasswordSalt,
//       email: body.Email,
//       isApproved: body.IsApproved,
//       isLockedOut: body.IsLockedOut,
//       createDate: date.toISOString(),
//       lastLoginDate: date.toISOString(),
//       lastPasswordChangedDate: date.toISOString(),
//       lastLockoutDate: date.toISOString(),
//       count: body.Count,
//       failedPasswordAttemptWindowStart: date.toISOString(),
//       failedPasswordAnswerAttemptWindowStart: date.toISOString(),
//       companyName: body.CompanyName,
//       reportType: body.ReportType,
//       phone: body.Phone,
//       clientId: body.ClientId,
//       performerTypesId: body.PerformerTypes_Id,
//     },
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };


// working api and creating data
// const create01 = async (query, body) => {
//   let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   let date = new Date();

//   const raw = `
//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES (:userName, :firstName, :lastName);

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES (:applicationId, (SELECT Id FROM Users WHERE UserName = :userName),
//       :userName, :userName, :mobile,
//       :isAnonymous, :lastActivityDate);

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES (:adminId, (SELECT Id FROM Users WHERE UserName = :userName));

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES (:applicationId,
//       (SELECT Id FROM Users WHERE UserName = :userName),
//       :password,
//       :passwordFormat,
//       :passwordSalt,
//       :mobile, :email, :isApproved, :isLockedOut, :createDate, :lastLoginDate, :lastPasswordChangedDate, :lastLockoutDate,
//       :count, :failedPasswordAttemptWindowStart, :count, :failedPasswordAnswerAttemptWindowStart);

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES (:companyName, (SELECT Id FROM Users WHERE UserName = :userName), :reportType);

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :mobile, :phone);

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :clientId);
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: {
//       userName: body.UserName,
//       firstName: body.FirstName,
//       lastName: body.LastName,
//       applicationId: ApplicationId,
//       adminId: AdminId,
//       mobile: body.Mobile,
//       isAnonymous: body.IsAnonymous,
//       lastActivityDate: date.toISOString(),
//       password: body.Password,
//       passwordFormat: body.PasswordFormat,
//       passwordSalt: body.PasswordSalt,
//       email: body.Email,
//       isApproved: body.IsApproved,
//       isLockedOut: body.IsLockedOut,
//       createDate: date.toISOString(),
//       lastLoginDate: date.toISOString(),
//       lastPasswordChangedDate: date.toISOString(),
//       lastLockoutDate: date.toISOString(),
//       count: body.Count,
//       failedPasswordAttemptWindowStart: date.toISOString(),
//       failedPasswordAnswerAttemptWindowStart: date.toISOString(),
//       companyName: body.CompanyName,
//       reportType: body.ReportType,
//       phone: body.Phone,
//       clientId: body.ClientId,
//     },
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };



const create01 = async (query, body) => {

  let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
  let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
  let date = new Date();

  const raw = `
    INSERT INTO Users (UserName, FirstName, LastName)
    VALUES (:userName, :firstName, :lastName);

    INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
    VALUES (:applicationId, (SELECT Id FROM Users WHERE UserName = :userName),
      :userName, :userName, :mobile,
      :isAnonymous, :lastActivityDate);

    INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
    VALUES (:adminId, (SELECT Id FROM Users WHERE UserName = :userName));

    INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
      FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
    VALUES (:applicationId,
      (SELECT Id FROM Users WHERE UserName = :userName),
      :password,
      :passwordFormat,
      :passwordSalt,
      :mobile, :email, :isApproved, :isLockedOut, :createDate, :lastLoginDate, :lastPasswordChangedDate, :lastLockoutDate,
      :count, :failedPasswordAttemptWindowStart, :count, :failedPasswordAnswerAttemptWindowStart);

    INSERT INTO Users_Client (CompanyName, Id, ReportType)
    VALUES (:companyName, (SELECT Id FROM Users WHERE UserName = :userName), :reportType);

    INSERT INTO Users_Auditor (Id, Mobile, Phone)
    VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :mobile, :phone);

    INSERT INTO ClientAuditor (AuditorId, ClientId)
    VALUES ((SELECT Id FROM Users WHERE UserName = :userName), :clientId);
  `;

  if (body.Password === body.PasswordSalt) {
    await SuperPerformer.sequelize.query(raw, {
      replacements: {
        userName: body.UserName,
        firstName: body.FirstName,
        lastName: body.LastName,
        applicationId: ApplicationId,
        adminId: AdminId,
        mobile: body.Mobile,
        isAnonymous: body.IsAnonymous,
        lastActivityDate: date.toISOString(),
        password: body.Password,
        passwordFormat: body.PasswordFormat,
        passwordSalt: body.PasswordSalt,
        email: body.Email,
        isApproved: body.IsApproved,
        isLockedOut: body.IsLockedOut,
        createDate: date.toISOString(),
        lastLoginDate: date.toISOString(),
        lastPasswordChangedDate: date.toISOString(),
        lastLockoutDate: date.toISOString(),
        count: body.Count,
        failedPasswordAttemptWindowStart: date.toISOString(),
        failedPasswordAnswerAttemptWindowStart: date.toISOString(),
        companyName: body.CompanyName,
        reportType: body.ReportType,
        phone: body.Phone,
        clientId: body.ClientId,
      },
      type: Sequelize.QueryTypes.INSERT,
    });
  } else {
    console.log("Password and PasswordSalt do not match.");
  }

  return body;
};





// const create01 = async (query, body) => {
//   const ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   const AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//   body.Password = await method.hashPassword(body.Password);
//   const date = new Date();

//   const raw = `
//     BEGIN TRANSACTION;

//     DECLARE @userId INT;

//     INSERT INTO Users (UserName, FirstName, LastName)
//     VALUES (@UserName, @FirstName, @LastName);

//     SELECT @userId = SCOPE_IDENTITY();

//     INSERT INTO aspnet_Users (ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
//     VALUES (@ApplicationId, @userId, @UserName, @UserName, @Mobile, @IsAnonymous, @date);

//     INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
//     VALUES (@AdminId, @userId);

//     INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate,
//       FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart)
//     VALUES (@ApplicationId, @userId, @Password, @PasswordFormat, @PasswordSalt, @Mobile, @Email, @IsApproved, @IsLockedOut, @date, @date, @date, @date, @Count, @date, @Count, @date);

//     INSERT INTO Users_Client (CompanyName, Id, ReportType)
//     VALUES (@CompanyName, @userId, @ReportType);

//     INSERT INTO Users_Auditor (Id, Mobile, Phone)
//     VALUES (@userId, @Mobile, @Phone);

//     INSERT INTO ClientAuditor (AuditorId, ClientId)
//     VALUES (@userId, @ClientId);

//     INSERT INTO TypeOfPerformers (Performers_Id, PerformerTypes_Id)
//     VALUES (@userId, @PerformerTypes_Id);

//     COMMIT TRANSACTION;
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: {
//       ApplicationId,
//       AdminId,
//       UserName: body.UserName,
//       FirstName: body.FirstName,
//       LastName: body.LastName,
//       Mobile: body.Mobile,
//       IsAnonymous: body.IsAnonymous,
//       date: date.toISOString(),
//       Password: body.Password,
//       PasswordFormat: body.PasswordFormat,
//       PasswordSalt: body.PasswordSalt,
//       Email: body.Email,
//       IsApproved: body.IsApproved,
//       IsLockedOut: body.IsLockedOut,
//       Count: body.Count,
//       CompanyName: body.CompanyName,
//       ReportType: body.ReportType,
//       Phone: body.Phone,
//       ClientId: body.ClientId,
//       PerformerTypes_Id: body.PerformerTypes_Id,
//     },
//     type: Sequelize.QueryTypes.INSERT,
//   });

//   return body;
// };


// const updateOne = async (Id,body) => {

//   console.log("ddddddddddddddddddd", body.Password)
//   body.Password = await method.hashPassword(body.Password)
//       console.log("1111111111111111111", body.Password)

//   // let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
//   let AdminId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';

//   const raw =
//     `
//     UPDATE  Users
//     SET FirstName='${body.FirstName}',LastName='${body.LastName}'
//     WHERE Users.Id='${Id}';

//     UPDATE  aspnet_Users
//     SET LoweredUserName='${body.UserName}', MobileAlias='${body.Mobile}', IsAnonymous='${body.IsAnonymous}', LastActivityDate='${body.CreateDate}'
//     WHERE aspnet_Users.UserId='${Id}';
//     UPDATE  aspnet_UsersInRoles
//     SET RoleId='${AdminId}'
//     WHERE aspnet_UsersInRoles.UserId='${Id}';
//     UPDATE  aspnet_Membership
//     SET Password='${body.Password}',MobilePIN='${body.Mobile}',
//     Email='${body.Email}',LoweredEmail='${body.Email}',
//     IsApproved='${body.IsApproved}',IsLockedOut='${body.IsLockedOut}',LastLoginDate='${body.CreateDate}',
//     LastLockoutDate='${body.CreateDate}'
//     WHERE aspnet_Membership.UserId='${Id}';

//     UPDATE Users_Client
//     SET CompanyName='${body.CompanyName}',ReportType='${body.ReportType}'
//     WHERE Users_Client.Id='${Id}';

//     UPDATE Users_Auditor
//     SET Mobile='${body.Mobile}',Phone='${body.Phone}'
//     WHERE Users_Auditor.Id='${Id}';

//     UPDATE ClientAuditor
//     SET  ClientId='${body.ClientId}'
//     WHERE ClientAuditor.AuditorId='${Id}';

//     UPDATE TypeOfPerformers
//     SET  PerformerTypes_Id= ${body.PerformerTypes_Id}
//     WHERE TypeOfPerformers.Performers_Id='${Id}';


//     `
//      return SuperPerformer.sequelize.query(raw, {
//       replacements:[''],
//       type: Sequelize.QueryTypes.SELECT
//      })
//     }


// const updateOne = async (Id, body) => {
//   console.log("ddddddddddddddddddd", body.Password);
//   body.Password = await method.hashPassword(body.Password);
//   console.log("1111111111111111111", body.Password);

//   let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';

//   const raw = `
//     UPDATE Users
//     SET FirstName='${body.FirstName}', LastName='${body.LastName}'

//     UPDATE aspnet_Users
//     SET LoweredUserName='${body.UserName}', MobileAlias='${body.Mobile}', IsAnonymous='${body.IsAnonymous}', LastActivityDate='${body.CreateDate}'
//     WHERE aspnet_Users.UserId='${Id}';

//     UPDATE aspnet_UsersInRoles
//     SET RoleId='${AdminId}'
//     WHERE aspnet_UsersInRoles.UserId='${Id}';

//     UPDATE aspnet_Membership
//     SET Password='${body.Password}', MobilePIN='${body.Mobile}',
//     Email='${body.Email}', LoweredEmail='${body.Email}',
//     IsApproved='${body.IsApproved}', IsLockedOut='${body.IsLockedOut}', LastLoginDate='${body.CreateDate}',
//     LastLockoutDate='${body.CreateDate}'
//     WHERE aspnet_Membership.UserId='${Id}';

//     UPDATE Users_Client
//     SET CompanyName='${body.CompanyName}', ReportType='${body.ReportType}'
//     WHERE Users_Client.Id='${Id}';

//     UPDATE Users_Auditor
//     SET Mobile='${body.Mobile}', Phone='${body.Phone}'
//     WHERE Users_Auditor.Id='${Id}';

//     UPDATE ClientAuditor
//     SET ClientId='${body.ClientId}'
//     WHERE ClientAuditor.AuditorId='${Id}';

//     UPDATE TypeOfPerformers
//     SET PerformerTypes_Id='${body.PerformerTypes_Id}'
//     WHERE TypeOfPerformers.Performers_Id='${Id}';
//   `;

//   await SuperPerformer.sequelize.query(raw, {
//     replacements: [''],
//     type: Sequelize.QueryTypes.UPDATE,
//   });

//   return body;
// };

const updateOne = async (Id, body) => {
  let AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
  const raw = `
    UPDATE Users
    SET UserName='${body.UserName}', FirstName='${body.FirstName}', LastName='${body.LastName}'
    WHERE Users.Id='${Id}';

    UPDATE aspnet_Users
    SET LoweredUserName='${body.UserName}', MobileAlias='${body.Mobile}', IsAnonymous='${body.IsAnonymous}', LastActivityDate='${body.CreateDate}'
    WHERE aspnet_Users.UserId='${Id}';

    UPDATE aspnet_UsersInRoles
    SET RoleId='${AdminId}'
    WHERE aspnet_UsersInRoles.UserId='${Id}';

    UPDATE aspnet_Membership
    SET Password='${body.Password}', MobilePIN='${body.Mobile}',
    Email='${body.Email}', LoweredEmail='${body.Email}',
    IsApproved='${body.IsApproved}', IsLockedOut='${body.IsLockedOut}', LastLoginDate='${body.CreateDate}',
    LastLockoutDate='${body.CreateDate}'
    WHERE aspnet_Membership.UserId='${Id}';

    UPDATE Users_Client
    SET CompanyName='${body.CompanyName}', ReportType='${body.ReportType}'
    WHERE Users_Client.Id='${Id}';

    UPDATE Users_Auditor
    SET Mobile='${body.Mobile}', Phone='${body.Phone}'
    WHERE Users_Auditor.Id='${Id}';

    UPDATE ClientAuditor
    SET ClientId='${body.ClientId}'
    WHERE ClientAuditor.AuditorId='${Id}';

    UPDATE TypeOfPerformers
    SET PerformerTypes_Id='${body.PerformerTypes_Id}'
    WHERE TypeOfPerformers.Performers_Id='${Id}';
  `;

  await SuperPerformer.sequelize.query(raw, {
    replacements: [''],
    type: Sequelize.QueryTypes.UPDATE,
  });

  return body;
};




const bcrypt = require('bcrypt');

const Changepassword = async (Id, body) => {
  const raw = `
    UPDATE aspnet_Membership
    SET 
      Password=:Password,
      PasswordSalt=:PasswordSalt
    WHERE aspnet_Membership.UserId=:id;
  `;

  const replacements = {
    
    Password: await bcrypt.hash(body.Password, 10), // Hash the password
    PasswordSalt: await bcrypt.hash(body.PasswordSalt, 10), // Hash the password salt
    id: Id
  };

  if (body.Password === body.PasswordSalt) {
    console.log("Passwords are equal. Performing the update.");
    await SuperPerformer.sequelize.query(raw, {
      replacements,
      type: Sequelize.QueryTypes.UPDATE,
    });
    console.log("New password", body.Password)
    console.log("New passwordSalt", body.PasswordSalt)

    console.log("Password updated successfully");

  } else {
    // throw new Error
    console.log("Passwords are not equal. No update performed.");
  }

  return body;
};







// const Changepassword = async (Id, body) => {
//   // Input validation
//   if (
//     typeof body.NewPassword === 'string' &&
//     typeof body.NewPasswordSalt === 'string' &&
//     typeof body.CurrentPassword === 'string' &&
//     typeof Id === 'string'
//   ) {
//     const passwordMatchQuery = `
//       SELECT PasswordSalt
//       FROM aspnet_Membership
//       WHERE UserId='${Id}' AND Password='${body.CurrentPassword}';
//     `;

//     const [matchingRecords] = await SuperPerformer.sequelize.query(passwordMatchQuery, {
//       type: Sequelize.QueryTypes.SELECT,
//     });

//     if (matchingRecords.length === 1) {
//       const raw = `
//         UPDATE aspnet_Membership
//         SET 
//           Password='${body.NewPassword}',
//           PasswordSalt='${body.NewPasswordSalt}'
//         WHERE aspnet_Membership.UserId='${Id}';
//       `;

//       await SuperPerformer.sequelize.query(raw, {
//         replacements: [''],
//         type: Sequelize.QueryTypes.UPDATE,
//       });

//       return body;
//     } else {
//       throw new Error("Current password and password salt don't match.");
//     }
//   } else {
//     throw new Error("Invalid input parameters.");
//   }
// };





const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)

  option.raw = undefined
  return SuperPerformer.findAndCountAll({
    where: condition,
    ...option,
    include: ['Country', 'Branch', 'User'],
    order: [['UserClient.CompanyName', 'ASC']]
  })
}



const findAllJoin = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return SuperPerformer.findAndCountAll({
    where: condition,
    ...option,
    attributes: [
      'Id', 'CompanyName', 'ContactPerson', 'Phone', 'Mobile', 'ReportType', 'URLClientPortal',
      [
        Sequelize.literal('(SELECT COUNT(*) FROM Audits WHERE Audits.NameClient_Id = Users_Client.Id)'),
        'AuditCount'
      ],
    ],
    include: ['Country', 'Branch'],
    order: [['CompanyName', 'ASC']]
  })
}

async function countDocuments(query) {
  return SuperPerformer.count(query)
}

const destroy = async (Id) => {
  const raw =
    `DELETE  aspnet_Membership
  WHERE UserId='${Id}';
  `
  return SuperPerformer.sequelize.query(raw, {
    replacements: [Id],
    type: Sequelize.QueryTypes.DELETE
  })
}

const rawQueryListFilter = async (qwery, body) => {
  console.log(body)
  const raw =
    `  SELECT *  FROM  aspnet_Roles
   inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
   inner join aspnet_Membership on aspnet_Users.UserId=aspnet_Membership.UserId   inner join Users on aspnet_Users.UserName=Users.UserName
   inner join Emails on Users.Id=Emails.UserId
   inner join Users_Auditor on Users.Id=Users_Auditor.Id
   inner join TypeOfPerformers on Users_Auditor.Id= TypeOfPerformers.Performers_Id
   inner join PerformerType on TypeOfPerformers.PerformerTypes_Id=PerformerType.Id
   inner join ClientAuditor on Users_Auditor.Id=ClientAuditor.AuditorId
   inner join Users_Client on ClientAuditor.ClientId=Users_Client.Id
   where aspnet_Roles.RoleId='DAF570A4-5AD9-4D52-B4FB-171C4A759A06'
    AND Users_Client.CompanyName='${body.CompanyName}'
    AND PerformerType.Name='${body.Name}'
    AND TypeOfPerformers.PerformerTypes_Id='${body.PerformerTypes_Id}'
   `
  return SuperPerformer.sequelize.query(raw, {
    replacements: [body],
    type: Sequelize.QueryTypes.SELECT
  })





}

// Working

const rawQueryList = async () => {
  const raw = `
      SELECT
       *
      FROM
        [fdis].[dbo].[aspnet_Roles] AS R
        LEFT JOIN [fdis].[dbo].[aspnet_UsersInRoles] AS URole ON R.RoleId = URole.RoleId
        LEFT JOIN [fdis].[dbo].[aspnet_Membership] AS UM ON UM.UserId = URole.[UserId]
        LEFT JOIN [fdis].[dbo].[aspnet_Users] AS U ON U.UserId = UM.UserId
        LEFT JOIN [dbo].[Users] AS US ON US.Id = UM.UserId
        LEFT JOIN Users_Auditor AS UA ON UA.Id = US.Id
        LEFT JOIN TypeOfPerformers AS TP ON TP.Performers_Id = UA.Id
      WHERE
        R.RoleId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7'
        AND US.Id IS NOT NULL
        ORDER BY US.UserName ASC;  -- Add this
    `;

  return SuperPerformer.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT,
  });
};



// const rawQueryList = async () => {
//   const raw = `
//   SELECT *
//   FROM [fdis].[dbo].[Users]
//   LEFT JOIN [fdis].[dbo].[aspnet_Users] ON [fdis].[dbo].[Users].UserName = [fdis].[dbo].[aspnet_Users].UserName
//   LEFT JOIN [fdis].[dbo].[aspnet_UsersInRoles] ON [fdis].[dbo].[aspnet_Users].UserId = [fdis].[dbo].[aspnet_UsersInRoles].UserId
//   LEFT JOIN [fdis].[dbo].[aspnet_Membership] ON [fdis].[dbo].[aspnet_Users].UserId = [fdis].[dbo].[aspnet_Membership].UserId
//   LEFT JOIN [fdis].[dbo].[Users_Auditor] ON [fdis].[dbo].[Users].Id = [fdis].[dbo].[Users_Auditor].Id
//   LEFT JOIN [fdis].[dbo].[TypeOfPerformers] ON [fdis].[dbo].[Users_Auditor].Id = [fdis].[dbo].[TypeOfPerformers].Performers_Id
//   LEFT JOIN [fdis].[dbo].[ClientAuditor] ON [fdis].[dbo].[Users_Auditor].Id = [fdis].[dbo].[ClientAuditor].AuditorId
//   LEFT JOIN [fdis].[dbo].[Users_Client] ON [fdis].[dbo].[ClientAuditor].ClientId = [fdis].[dbo].[Users_Client].Id
//   ORDER BY [fdis].[dbo].[Users].UserName ASC;
// `;

//   return SuperPerformer.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT,
//   });
// };



const rawID = async (Id) => {
  const rawQuery = `
    SELECT *
    FROM [fdis].[dbo].[Users]
    LEFT JOIN [fdis].[dbo].[aspnet_Users] ON Users.UserName = aspnet_Users.UserName
    LEFT JOIN [fdis].[dbo].[aspnet_UsersInRoles] ON aspnet_Users.UserId = aspnet_UsersInRoles.UserId
    LEFT JOIN [fdis].[dbo].[aspnet_Membership] ON aspnet_Users.UserId = aspnet_Membership.UserId
    LEFT JOIN [fdis].[dbo].[Users_Auditor] ON Users.Id = Users_Auditor.Id
    LEFT JOIN [fdis].[dbo].[TypeOfPerformers] ON Users_Auditor.Id = TypeOfPerformers.Performers_Id
    LEFT JOIN [fdis].[dbo].[ClientAuditor] ON Users_Auditor.Id = ClientAuditor.AuditorId
    LEFT JOIN [fdis].[dbo].[Users_Client] ON ClientAuditor.ClientId = Users_Client.Id
    WHERE [fdis].[dbo].[Users].Id = :Id
  `;

  const replacements = { Id };

  try {
    const results = await SuperPerformer.sequelize.query(rawQuery, {
      replacements,
      type: Sequelize.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Old code to get data by id//
// const rawID = async (Id) =>
// {
//  let  RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//  const raw =
//   `
//   SELECT *

//   FROM  [fdis].[dbo].[Users]

//   inner join [fdis].[dbo].[aspnet_Users] on Users.UserName=aspnet_Users.UserName

//   inner join [fdis].[dbo].[aspnet_UsersInRoles] on aspnet_Users.UserId=aspnet_UsersInRoles.UserId

//   inner join [fdis].[dbo].[aspnet_Membership] on aspnet_Users.UserId=aspnet_Membership.UserId

//   inner join  [fdis].[dbo].[Users_Auditor] on Users.Id=Users_Auditor.Id

//   inner join [fdis].[dbo].[TypeOfPerformers] on Users_Auditor.Id= TypeOfPerformers.Performers_Id

//   inner join [fdis].[dbo].[ClientAuditor] on Users_Auditor.Id=ClientAuditor.AuditorId

//   inner join [fdis].[dbo].[Users_Client] on ClientAuditor.ClientId=Users_Client.Id

//   where  [fdis].[dbo].[Users].Id='${Id}'

//   `
//  return SuperPerformer.sequelize.query(raw, {
//   replacements:[Id],
//   type: Sequelize.QueryTypes.SELECT
//  })
// }


// const rawID = async (Id) =>
// {
//  let  RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
//  const raw =
//   `
//   SELECT *

//   FROM  [fdis].[dbo].[Users]

//   inner join [fdis].[dbo].[aspnet_Users] on Users.UserName=aspnet_Users.UserName

//   inner join [fdis].[dbo].[aspnet_UsersInRoles] on aspnet_Users.UserId=aspnet_UsersInRoles.UserId

//   inner join [fdis].[dbo].[aspnet_Membership] on aspnet_Users.UserId=aspnet_Membership.UserId

//   inner join  [fdis].[dbo].[Users_Auditor] on Users.Id=Users_Auditor.Id

//   inner join [fdis].[dbo].[TypeOfPerformers] on Users_Auditor.Id= TypeOfPerformers.Performers_Id

//   inner join [fdis].[dbo].[ClientAuditor] on Users_Auditor.Id=ClientAuditor.AuditorId

//   inner join [fdis].[dbo].[Users_Client] on ClientAuditor.ClientId=Users_Client.Id

//   where  [fdis].[dbo].[Users].Id='${Id}'

//   `
//  return SuperPerformer.sequelize.query(raw, {
//   replacements:[Id],
//   type: Sequelize.QueryTypes.SELECT
//  })
// }

// inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId

// inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId

// inner join aspnet_Membership on aspnet_Users.UserId=aspnet_Membership.UserId
const IsAnonymous = async (IsAnonymous) => {
  let RoleId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
  const raw =
    `select * from [fdis].[dbo].[aspnet_Roles]  as R
  inner join [fdis].[dbo].[aspnet_UsersInRoles] as URole on R.RoleId=URole.RoleId
  inner join [fdis].[dbo].[aspnet_Membership] as UM  on UM.UserId=URole.[UserId]
   inner join [fdis].[dbo].[aspnet_Users] as U on U.UserId =  UM.UserId
   inner join [dbo].[Users] as US on US.Id = UM.UserId
   inner join Users_Auditor as UA on UA.Id =US.Id
   inner join TypeOfPerformers as TP on TP.Performers_Id = UA.Id
    where
	( R.RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7') AND
	U.IsAnonymous= '${IsAnonymous}' `

  return SuperPerformer.sequelize.query(raw, {
    replacements: [IsAnonymous],
    type: Sequelize.QueryTypes.SELECT
  })
}

const PerformerTypes = async (PerformerTypes_Id) => {
  let RoleId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
  const raw =
    `select * from [fdis].[dbo].[aspnet_Roles]  as R
  inner join [fdis].[dbo].[aspnet_UsersInRoles] as URole on R.RoleId=URole.RoleId
  inner join [fdis].[dbo].[aspnet_Membership] as UM  on UM.UserId=URole.[UserId]
   inner join [fdis].[dbo].[aspnet_Users] as U on U.UserId =  UM.UserId
   inner join [dbo].[Users] as US on US.Id = UM.UserId
   inner join Users_Auditor as UA on UA.Id =US.Id
   inner join TypeOfPerformers as TP on TP.Performers_Id = UA.Id
    where
	( R.RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7') and
	(TP.PerformerTypes_Id= '${PerformerTypes_Id}') `

  return SuperPerformer.sequelize.query(raw, {
    replacements: [PerformerTypes_Id],
    type: Sequelize.QueryTypes.SELECT
  })
}

const bothFilter = async (IsApproved, IsAnonymous, PerformerTypes_Id) => {

  const raw =
    `select US.UserName,US.FirstName,US.LastName,UM.Email,UM.IsApproved,U.IsAnonymous,TP.PerformerTypes_Id
 from aspnet_Roles  as R
 inner join aspnet_UsersInRoles as URole on R.RoleId=URole.RoleId
 inner join aspnet_Membership as UM  on UM.UserId=URole.[UserId]
 inner join aspnet_Users as U on U.UserId =  UM.UserId
 inner join Users as US on US.Id = UM.UserId
 inner join Users_Auditor as UA on UA.Id =US.Id
 inner join TypeOfPerformers as TP on TP.Performers_Id = UA.Id
 where ( R.RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7') AND
 UM.IsApproved LIKE '${IsApproved}' AND U.IsAnonymous LIKE '${IsAnonymous}'
 AND TP.PerformerTypes_Id LIKE '${PerformerTypes_Id}'`


  return SuperPerformer.sequelize.query(raw, {
    replacements: [IsAnonymous, PerformerTypes_Id],
    type: Sequelize.QueryTypes.SELECT
  })
}




const getLastSixAuditAverage = async (AuditCode) => {
  const raw =
    `SELECT AVG(Rating) as EndScore
 FROM ResultAuditCategory inner join Audits on ResultAuditCategory.IdAudit=Audits.Id
 WHERE AuditCode='${AuditCode}' `
  return SuperPerformer.sequelize.query(raw, {
    replacements: [AuditCode],
    type: Sequelize.QueryTypes.SELECT
  })
}

const result = async (id) => {
  const IdAudit = id;
  const raw = ` select AVG(Rating) as endscore from ResultAuditCategory inner join Audits on ResultAuditCategory .IdAudit =Audits.Id
  where IdAudit = '${IdAudit}' `
  return SuperPerformer.sequelize.query(raw, {
    replacements: [IdAudit],
    type: sequelize.QueryTypes.SELECT
  })
}




export default {

  findById,
  findAll,
  create01,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  findAllJoin,
  rawQueryList,
  rawQueryListFilter,
  rawID,
  IsAnonymous,
  PerformerTypes,
  bothFilter,
  getLastSixAuditAverage,
  result,
  Changepassword

}
