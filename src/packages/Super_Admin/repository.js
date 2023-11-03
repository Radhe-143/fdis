import { Sequelize } from 'sequelize';
import {  SuperAdminSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import  bcrypt from 'bcrypt';

import method from './method'

const findById = async (Id) => {
  const raw = `
select * from [fdis].[dbo].[aspnet_Roles]  as R inner join [fdis].[dbo].[aspnet_UsersInRoles] as URole on R.RoleId=URole.RoleId
inner join [fdis].[dbo].[aspnet_Membership] as UM  on UM.UserId=URole.[UserId] inner join [fdis].[dbo].[aspnet_Users] as U on U.UserId =  UM.UserId
inner join [dbo].[Users] as US on US.Id =UM.UserId where R.RoleId='6BF066DD-C1CF-4F0B-B982-7555DE280212' and UM.UserId='${Id}'
 `
  return SuperAdminSeq.sequelize.query(raw, {
    replacements: [Id],
    type: Sequelize.QueryTypes.SELECT
  })
}

async function findOne(query) {
  return SuperAdminSeq.findOne({
    where: {
      ...query
    }
  });
}

// const create = async (body) => {
//   console.log("Pass", body.Password)
//   body.Password = await method.hashPassword(body.Password)


// let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
// let AdminId='6BF066DD-C1CF-4F0B-B982-7555DE280212';
//   const raw =
//   `BEGIN TRAN T1;
//   INSERT INTO Users (UserName,FirstName,LastName)
//   VALUES('${body.UserName}','${body.FirstName}','${body.LastName}') ;
//   INSERT INTO aspnet_Users (ApplicationId,UserId,UserName,LoweredUserName,MobileAlias,IsAnonymous,LastActivityDate)
//   VALUES('${ApplicationId}',(SELECT Id From Users Where UserName='${body.UserName}'),
//   '${body.UserName}','${body.UserName}','${body.Mobile}',
//   '${body.IsAnonymous}','${body.LastActivityDate}');
//   INSERT INTO aspnet_UsersInRoles(RoleId,UserId)
//   VALUES('${AdminId}',(SELECT Id From Users Where UserName='${body.UserName}'));
//   INSERT INTO aspnet_Membership (ApplicationId,UserId,Password,PasswordFormat,PasswordSalt,MobilePIN,Email,LoweredEmail,PasswordQuestion,PasswordAnswer,IsApproved,IsLockedOut,CreateDate,LastLoginDate,LastPasswordChangedDate,LastLockoutDate,FailedPasswordAttemptCount,FailedPasswordAttemptWindowStart,FailedPasswordAnswerAttemptCount,FailedPasswordAnswerAttemptWindowStart,Comment)
//   VALUES('${ApplicationId}',(SELECT Id From Users Where UserName='${body.UserName}'),'${body.Password}','${body.PasswordFormat}','${body.PasswordSalt}',
//   '${body.MobilePIN}','${body.Email}','${body.LoweredEmail}','${body.PasswordQuestion}','${body.PasswordAnswer}', '${body.IsApproved}','${body.IsLockedOut}','${body.CreateDate}', '${body.LastLoginDate}','${body.LastPasswordChangedDate}','${body.LastLockoutDate}','${body.FailedPasswordAttemptCount}','${body.FailedPasswordAttemptWindowStart}','${body.FailedPasswordAnswerAttemptCount}','${body.FailedPasswordAnswerAttemptWindowStart}','${body.Comment}');
//    COMMIT TRAN T1;
//   `
//    return SuperAdminSeq.sequelize.query(raw, {
//     replacements:[''],
//     type: Sequelize.QueryTypes.INSERT
//    })

//   // return (await SuperPerformer.create(body)).get({ plain: true })
// }


const create = async (body) => {
  console.log("Pass", body.Password);
  body.Password = await method.hashPassword(body.Password);

  let ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
  let AdminId = '6BF066DD-C1CF-4F0B-B982-7555DE280212';

  const raw = `
    BEGIN TRAN T1;
    INSERT INTO Users (UserName, FirstName, LastName)
    VALUES('${body.UserName}', '${body.FirstName}', '${body.LastName}');

    INSERT INTO aspnet_Users(ApplicationId, UserId, UserName, LoweredUserName, MobileAlias, IsAnonymous, LastActivityDate)
    VALUES('${ApplicationId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'),
    '${body.UserName}', '${body.UserName}', '${body.Mobile}',
    '${body.IsAnonymous}', '${body.LastActivityDate}');


    INSERT INTO aspnet_UsersInRoles (RoleId, UserId)
    VALUES('${AdminId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'));

    INSERT INTO aspnet_Membership (ApplicationId, UserId, Password, PasswordFormat, PasswordSalt, MobilePIN, Email, LoweredEmail, PasswordQuestion, PasswordAnswer, IsApproved, IsLockedOut, CreateDate, LastLoginDate, LastPasswordChangedDate, LastLockoutDate, FailedPasswordAttemptCount, FailedPasswordAttemptWindowStart, FailedPasswordAnswerAttemptCount, FailedPasswordAnswerAttemptWindowStart, Comment)
    VALUES('${ApplicationId}', (SELECT Id FROM Users WHERE UserName = '${body.UserName}'), '${body.Password}', '${body.PasswordFormat}', '${body.PasswordSalt}',
    '${body.MobilePIN}', '${body.Email}', '${body.LoweredEmail}', '${body.PasswordQuestion}', '${body.PasswordAnswer}', '${body.IsApproved}', '${body.IsLockedOut}', '${body.CreateDate}', '${body.LastLoginDate}', '${body.LastPasswordChangedDate}', '${body.LastLockoutDate}', '${body.FailedPasswordAttemptCount}', '${body.FailedPasswordAttemptWindowStart}', '${body.FailedPasswordAnswerAttemptCount}', '${body.FailedPasswordAnswerAttemptWindowStart}', '${body.Comment}');
    COMMIT TRAN T1;
  `;

  await SuperAdminSeq.sequelize.query(raw, {
    replacements: [''],
    type: Sequelize.QueryTypes.INSERT,
  });

  return body;
};


const updateOne = async (Id, body) => {

  // let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';

  console.log("Pass", body.Password)
  body.Password = await method.hashPassword(body.Password)
  console.log("Hashed", body.Password)

  let AdminId = '6BF066DD-C1CF-4F0B-B982-7555DE280212';



  const raw =
    `
      BEGIN TRAN T1;
      UPDATE  Users
      SET FirstName='${body.FirstName}',LastName='${body.LastName}'
      WHERE Users.Id='${Id}';
      UPDATE  aspnet_Users
      SET  MobileAlias='${body.MobileAlias}', IsAnonymous='${body.IsAnonymous}', LastActivityDate='${body.LastActivityDate}'
      WHERE aspnet_Users.UserId='${Id}';
      UPDATE  aspnet_Membership
      SET Password='${body.Password}',MobilePIN='${body.Mobile}',
      Email='${body.Email}',LoweredEmail='${body.Email}',
      IsApproved='${body.IsApproved}',IsLockedOut='${body.IsLockedOut}',LastLoginDate='${body.LastActivityDate}',
      LastPasswordChangedDate='${body.LastActivityDate}'
      WHERE aspnet_Membership.UserId='${Id}';
      COMMIT TRAN T1;
      `
  return SuperAdminSeq.sequelize.query(raw, {
    replacements: [''],
    type: Sequelize.QueryTypes.SELECT
  })
}

// const updatedata = async (Id, body) => {

//   // let ApplicationId='04B61B6C-DB3B-49DB-B854-42F3654AD0D2';

//   console.log("Pass", body.Password)
//   body.Password = await method.hashPassword(body.Password)
//   console.log("Hashed", body.Password)
//   const raw =
//     `
//       BEGIN TRAN T1;
//       UPDATE  Users
//       SET FirstName='${body.FirstName}',LastName='${body.LastName}', Email='${body.Email}',
//       LoweredEmail='${body.LoweredEmail}', Password = '${body.Password}', PasswordSalt = '${body.PasswordSalt}',
//       Verified='${body.Verified}' , Description = '${body.Description}',
//       IsApproved='${body.IsApproved}',IsLockedOut='${body.IsLockedOut}',IsAnonymous='${body.IsAnonymous}',
//       CreateDate='${body.CreateDate}'
//       WHERE Users.Id='${Id}';
//       `
//   return SuperAdminSeq.sequelize.query(raw, {
//     replacements: [''],
//     type: Sequelize.QueryTypes.SELECT
//   })
// }



const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)

  option.raw = undefined
  return SuperPerformer.findAndCountAll({
    where: condition,
    ...option,
    include: ['User'],
    order: [['UserClient.CompanyName', 'ASC']]
  })
}




const findAllJoin = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined

  return SuperAdminSeq.findAndCountAll({

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
  return SuperAdminSeq.count(query)
}

// const destroy = async (Id) => {
//   const raw =
//   `
//    DELETE FROM Users WHERE Id='${Id}';
//     DELETE FROM aspnet_Users WHERE UserId='${Id}';
//     DELETE FROM aspnet_Membership where UserId='${Id}' ;
//     DELETE FROM aspnet_UsersInRoles Where UserId='${Id}';
//   `
//    return SuperAdminSeq.sequelize.query(raw, {
//     replacements:[Id],
//     type: Sequelize.QueryTypes.DELETE
//    })
//   }



const destroy = async (Id) => {
  // return SuperPerformer.destroy({ where: { Id: id } })
  const raw =
    `

    DELETE FROM Users WHERE Id='${Id}';
    DELETE FROM aspnet_Users WHERE UserId='${Id}';
    DELETE FROM aspnet_Membership where UserId='${Id}' ;
    DELETE FROM aspnet_UsersInRoles Where UserId='${Id}';
    DELETE FROM Users_Client Where Id='${Id}';


  `
  return SuperAdminSeq.sequelize.query(raw, {
    replacements: [''],
    type: Sequelize.QueryTypes.SELECT
  })

}


// const destroy = async (Id) => {
//   const raw = `
//     DELETE FROM Users WHERE Id = :Id;
//     DELETE FROM aspnet_Users WHERE UserId = :Id;
//     DELETE FROM aspnet_Membership WHERE UserId = :Id;
//     DELETE FROM aspnet_UsersInRoles WHERE UserId = :Id;
//     DELETE FROM Users_Client WHERE Id = :Id;
//   `;

//   const result = await SuperAdminSeq.sequelize.query(raw, {
//     replacements: { Id },
//     type: Sequelize.QueryTypes.SELECT
//   });

//   return result;
// };





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
      WHERE
        R.RoleId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7'
        AND US.Id IS NOT NULL
        ORDER BY US.UserName ASC;  -- Add this
    `;

  return SuperAdminSeq.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT,
  });
};




// Original Function //
// const rawQueryList = async (req) => {
//   let user;
//   let pass;
//  const raw = `select * from [fdis].[dbo].[aspnet_Roles]  as R inner join [fdis].[dbo].[aspnet_UsersInRoles] as URole on R.RoleId=URole.RoleId
//  inner join [fdis].[dbo].[aspnet_Membership] as UM  on UM.UserId=URole.[UserId] inner join [fdis].[dbo].[aspnet_Users] as U on U.UserId =  UM.UserId
//  inner join [dbo].[Users] as UN on UN.Id=UM.UserId where R.RoleId='6BF066DD-C1CF-4F0B-B982-7555DE280212'
//  `
//   return SuperAdminSeq.sequelize.query(raw, {
//     replacements:['admins','HBg9f2fPb6MzqKnZXQoCrM8IWKE='],
//     type: Sequelize.QueryTypes.SELECT
//   })
// }


// // findAll the data //
// const findAlll = async (request, response) => {
//   try {
//     const result = await SuperAdminSeq.findAndCountAll({
//       // Your query or options here
//     });
//     response.status(200).json(result);
//   } catch (error) {
//     response.status(500).json({ error: 'An error occurred' });
//   }
// };




const findAlll = async () => {
  const raw = `
      SELECT
       *
      FROM
      [fdis].[dbo].[Administrator]
    `;

  return SuperAdminSeq.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT,
  });
};


const finddata = async (Id) => {
  const raw = `
select * from [fdis].[dbo].[Administrator] WHERE UserId='${Id}'
 `
  return SuperAdminSeq.sequelize.query(raw, {
    replacements: [Id],
    type: Sequelize.QueryTypes.SELECT
  })
}



const deleteRecorddata = async (UserId) => {
  // return SuperPerformer.destroy({ where: { Id: id } })
  const raw =
    `

    DELETE FROM [fdis].[dbo].[Administrator] WHERE UserId='${UserId}';
  `
  return SuperAdminSeq.sequelize.query(raw, {
    replacements: [''],
    type: Sequelize.QueryTypes.SELECT
  })

}


async function updatedata(query, body) {
  try {
    const [count, updatedRows] = await SuperAdminSeq.update(body, {
      where: {
        ...query,
      },
      returning: true, // This will return the updated rows
    });

    if (count > 0) {
      // Rows were updated
      return {
        success: true,
        message: `${count} row(s) updated successfully.`,
        updatedData: updatedRows,
      };
    } else {
      return {
        success: false,
        message: 'No rows were updated.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating the data.',
      error: error.message,
    };
  }
}


async function UpdatePass(query, body) {
  try {
    // Hash the new password and salt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.Password, saltRounds);
    const hashedPasswordSalt = await bcrypt.hash(body.PasswordSalt, saltRounds);

    // Find the user by Id
    const user = await SuperAdminSeq.findOne({ where: { ...query } });

    if (!user) {
      throw new Error(`User not found.`);
    }

    // Log the old and new passwords
    console.log('Old Password:', user.Password);
    console.log('New Hashed Password:', hashedPassword);

    console.log('Old PasswordSalt:', user.PasswordSalt);
    console.log('New Hashed PasswordSalt:', hashedPasswordSalt);

    // Update the password in the database
    const [updatedRows] = await SuperAdminSeq.update(
      { Password: hashedPassword, PasswordSalt: hashedPasswordSalt },
      { where: { ...query } }
    );

    if (updatedRows === 0) {
      throw new Error('Password not updated.');
    }

    return true; // Password updated successfully
  } catch (error) {
    console.error('Error updating password:', error);
    throw error; // Rethrow the error to handle it at a higher level if necessary
  }
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
  findAlll,
  finddata,
  updatedata,
  deleteRecorddata,
  UpdatePass
  
  // findAllByRole

}
