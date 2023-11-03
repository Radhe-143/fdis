import { Sequelize } from 'sequelize';
import { SuperClient,UserSeq} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import method from './method'
import sequelize from 'sequelize';


const findById = async (Id) =>{
const raw = `SELECT *FROM Users
  left join aspnet_Users on Users.UserName=aspnet_Users.UserName
  left join  Users_Client on Users.Id=Users_Client.Id
  left join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
  left join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
  where aspnet_Users.UserId='${Id}'

  `
 return SuperClient.sequelize.query(raw, {
  replacements:[''],
  type: Sequelize.QueryTypes.SELECT
 })
}





async function findOne(query) {
  return SuperClient.findOne({
    where: {
      ...query
    }
  });
}



const create = async (body) => {
  let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
  let ClientId='BD5101D1-A20B-4DD0-908D-99E4C5663139';
  let Branch_Id='4738242A-1935-4554-9DCB-EAA6ED99ABE8';
  let CountryId='1C2E2CFA-7339-4892-BE07-03EAB199CE46';
  body.Password = await method.hashPassword(body.Password)
  // let USERId= `SELECT Id From Users Where UserName='${body.UserName}' `;
  // let result= await UserSeq.sequelize.query(USERId, {
  //   replacements:[''],
  //   type: Sequelize.QueryTypes.INSERT
  //  })
  //  console.log(result.Id)
  let Count=0;
  const raw = `BEGIN TRAN T1;
  INSERT INTO Users (UserName,FirstName,LastName)
  VALUES('${body.UserName}','${body.FirstName}','${body.LastName}') ;
  INSERT INTO aspnet_Users (ApplicationId,UserId,UserName,LoweredUserName,MobileAlias,IsAnonymous,LastActivityDate)
  VALUES('${ApplicationId}',(SELECT Id From Users Where UserName='${body.UserName}'),
  '${body.UserName}','${body.UserName}','${body.Mobile}',
  '${body.IsAnonymous}','${body.CreateDate}');
  INSERT INTO aspnet_UsersInRoles(RoleId,UserId)
  VALUES('${ClientId}',(SELECT Id From Users Where UserName='${body.UserName}'));
  INSERT INTO aspnet_Membership(ApplicationId,UserId,Password,PasswordFormat,PasswordSalt,MobilePIN,Email,IsApproved,IsLockedOut,CreateDate,LastLoginDate,LastPasswordChangedDate,LastLockoutDate
  ,FailedPasswordAttemptCount,FailedPasswordAttemptWindowStart,FailedPasswordAnswerAttemptCount,FailedPasswordAnswerAttemptWindowStart)
  VALUES('${ApplicationId}',(SELECT Id From Users Where UserName='${body.UserName}'),'${body.Password}','${body.PasswordFormat}','${body.PasswordSalt}',
  '${body.Mobile}','${body.Email}', '${body.IsApproved}','${body.IsLockedOut}','${body.CreateDate}', '${body.CreateDate}','${body.CreateDate}','${body.CreateDate}','${Count}','${body.CreateDate}','${Count}','${body.CreateDate}');
  INSERT INTO Users_Client(CompanyName,ContactPerson,Phone,Mobile,Fax,StreetName,ZipCode,City,State,CountryId,Id,Branch_Id,URLClientPortal,ReportType)
  VALUES  ('${body.CompanyName}','${body.FirstName}','${body.Phone}','${body.Mobile}','${body.Fax}','${body.StreetName}','${body.ZipCode}','${body.City}','${body.State}','${CountryId}',(SELECT Id From Users Where UserName='${body.UserName}'),'${Branch_Id}','${body.URLClientPortal}','${body.ReportType}');
  COMMIT TRAN T1;
  `
   return SuperClient.sequelize.query(raw, {
    replacements:[''],
    type: Sequelize.QueryTypes.INSERT
   })

}




const updateOne = async (Id,body) => {

  console.log("ddddddddddddddddddd", body.Password)
  body.Password = await method.hashPassword(body.Password)
  console.log("1111111111111111111", body.Password)

  // let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
  let AdminId='BD5101D1-A20B-4DD0-908D-99E4C5663139';

  const raw =
    `
    UPDATE  Users
    SET FirstName='${body.FirstName}',LastName='${body.LastName}'
    WHERE Id='${Id}';
    UPDATE  aspnet_Users
    SET MobileAlias='${body.Mobile}', IsAnonymous='${body.IsAnonymous}', LastActivityDate='${body.CurrentDate}'
    WHERE aspnet_Users.UserId='${Id}';
    UPDATE  aspnet_UsersInRoles
    SET RoleId='${AdminId}'
    WHERE aspnet_UsersInRoles.UserId='${Id}';
    UPDATE  aspnet_Membership
    SET Password='${body.Password}',MobilePIN='${body.Mobile}',
    Email='${body.Email}',LoweredEmail='${body.Email}',
    IsApproved='${body.IsApproved}',IsLockedOut='${body.IsLockedOut}',LastLoginDate='${body.CurrentDate}',
    LastLockoutDate='${body.CurrentDate}'
    WHERE aspnet_Membership.UserId='${Id}';
    UPDATE Users_Client
    SET CompanyName='${body.CompanyName}',ContactPerson='${body.FirstName}',Phone='${body.Phone}',Mobile='${body.Mobile}',Fax='${body.Fax}',
    StreetName='${body.StreetName}',ZipCode='${body.ZipCode}',City='${body.City}',State='${body.State}',CountryId='${body.CountryId}',
    URLClientPortal='${body.URLClientPortal}',ReportType='${body.ReportType}'
    WHERE Users_Client.Id='${Id}';



    `
     return SuperClient.sequelize.query(raw, {
      replacements:[''],
      type: Sequelize.QueryTypes.SELECT
     })
}




const updatePassword = async (Id,body) => {

  console.log("ddddddddddddddddddd", body.Password)
  body.Password = await method.hashPassword(body.Password)
  console.log("1111111111111111111", body.Password)

  const raw =
    `
    UPDATE  aspnet_Membership
    SET Password='${body.Password}'
    WHERE aspnet_Membership.UserId='${Id}';
    `
     return SuperClient.sequelize.query(raw, {
      replacements:[''],
      type: Sequelize.QueryTypes.SELECT
     })
}
const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return SuperClient.findAndCountAll({
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
  // return SuperClient.sequelize.query('SELECT uc.CompanyName,uc.ContactPerson,br.BranchName ,count(IsDone) as Audits FROM Audits as a inner join  Users_Client as uc on a.NameClient_Id=uc.Id inner join Branches as br on br.Id=uc.Branch_Id GROUP BY uc.CompanyName,uc.ContactPerson,br.BranchName', { type: Sequelize.QueryTypes.SELECT })

  return SuperClient.findAndCountAll({
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
  return SuperClient.count(query)
}

// const destroy = async (Id) => {
//   // return SuperPerformer.destroy({ where: { Id: id } })
//   const raw =
//   `

//     DELETE FROM Users WHERE Id='${Id}';
//     DELETE FROM aspnet_Users WHERE UserId='${Id}';
//     DELETE FROM aspnet_Membership where UserId='${Id}' ;
//     DELETE FROM aspnet_UsersInRoles Where UserId='${Id}';
//     DELETE FROM Users_Client Where Id='${Id}';
//     DELETE FROM Branches Where Id='${Id}';



//   `
//    return SuperClient.sequelize.query(raw, {
//     replacements:[''],
//     type: Sequelize.QueryTypes.SELECT
//    })

// }

const destroy = async (Id) => {
  try {
    const raw = `
      DELETE FROM Users WHERE Id='${Id}';
      DELETE FROM aspnet_Users WHERE UserId='${Id}';
      DELETE FROM aspnet_Membership WHERE UserId='${Id}';
      DELETE FROM aspnet_UsersInRoles WHERE UserId='${Id}';
      DELETE FROM Users_Client WHERE Id='${Id}';
    `;
    
    const result = await SuperClient.sequelize.query(raw, {
      replacements: [''],
      type: Sequelize.QueryTypes.SELECT
    });

    // Check the result and perform any additional operations if needed

    return result;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}



// const rawQueryList = async () => {
//   const raw = `
//     SELECT *
//     FROM Users
//     INNER JOIN aspnet_Users ON Users.UserName = aspnet_Users.UserName
//     INNER JOIN Users_Client ON Users.Id = Users_Client.Id
//     INNER JOIN aspnet_UsersInRoles ON aspnet_Users.UserId = aspnet_UsersInRoles.UserId
//     INNER JOIN aspnet_Membership ON aspnet_Users.UserId = aspnet_Membership.UserId
//     INNER JOIN aspnet_Roles ON aspnet_UsersInRoles.RoleId = aspnet_Roles.RoleId
//     INNER JOIN Branches ON Users_Client.Branch_Id = Branches.Id
//     WHERE aspnet_Roles.RoleName = 'Client'
//   `;

//   return SuperClient.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   });
// }


const rawQueryList = async () => {
  const raw = `
    SELECT *
    FROM Users
    INNER JOIN aspnet_Users ON Users.UserName = aspnet_Users.UserName
    INNER JOIN Users_Client ON Users.Id = Users_Client.Id
    INNER JOIN aspnet_UsersInRoles ON aspnet_Users.UserId = aspnet_UsersInRoles.UserId
    INNER JOIN aspnet_Membership ON aspnet_Users.UserId = aspnet_Membership.UserId
    INNER JOIN aspnet_Roles ON aspnet_UsersInRoles.RoleId = aspnet_Roles.RoleId
    INNER JOIN Branches ON Users_Client.Branch_Id = Branches.Id
  `;

  return SuperClient.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT
  });
}




const IsAnonymous =async (IsAnonymous) =>{
  let  RoleId ='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
  const raw = ` SELECT *FROM Users
  inner join aspnet_Users on Users.UserName=aspnet_Users.UserName
  inner join  Users_Client on Users.Id=Users_Client.Id
  inner join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
  inner join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
  inner join aspnet_Membership on aspnet_Users.UserId =aspnet_Membership.UserId
  where aspnet_Users.IsAnonymous=  '${IsAnonymous}'`

  return SuperClient.sequelize.query(raw, {
    replacements:[IsAnonymous],
    type: Sequelize.QueryTypes.SELECT
   })
  }

export default {

  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  findAllJoin,
  rawQueryList,
  updatePassword,
  IsAnonymous

}
