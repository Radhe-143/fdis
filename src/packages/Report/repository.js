import { Sequelize } from 'sequelize';
import { AuditSeq ,BuildingSeq,UserClientSeq} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'

// async function findById(id) {
//   const raw = 
//   `SELECT a.Id,a.AuditCode,a.LocationClient_Id,a.Date,a.PresentClient ,uc.CompanyName,uc.ContactPerson,br.BranchName ,bd.Name as Location
//   FROM Audits as a
//   inner join  Users_Client as uc on a.NameClient_Id=uc.Id
//   inner join Branches as br on br.Id=uc.Branch_Id
//   inner join Buildings as bd on bd.Id=a.LocationClient_Id
//   where a.Id='${id}'
//   GROUP BY a.AuditCode,a.Date,a.PresentClient , uc.CompanyName,uc.ContactPerson,br.BranchName,bd.Name,a.LocationClient_Id,a.Id`
  
//    return AuditSeq.sequelize.query(raw, {
//      replacements:id,
//      type: Sequelize.QueryTypes.SELECT
//    })
//  }


async function findById(id) {
  const raw = `
    SELECT a.Id,a.AuditCode,a.LocationClient_Id,a.Date,a.PresentClient,uc.CompanyName,uc.ContactPerson,br.BranchName,bd.Name as Location, uc.User_Id as User_Id,
    usr.FirstName,usr.LastName  -- Include UserName from Users table
    FROM Audits as a
    INNER JOIN Users_Client as uc ON a.NameClient_Id = uc.Id
    LEFT JOIN Branches as br ON br.Id = uc.Branch_Id
    INNER JOIN Buildings as bd ON bd.Id = a.LocationClient_Id
    INNER JOIN [Fdis].[dbo].[NewPerformer] as NP ON a.PresentClient=NP.UserId
    LEFT JOIN [fdis].[dbo].[Users] as usr ON usr.Id = uc.User_Id -- Join Users table to get UserName
    WHERE a.Id = :id
    GROUP BY a.AuditCode,a.Date,a.PresentClient,uc.CompanyName,uc.ContactPerson,br.BranchName,bd.Name,a.LocationClient_Id,a.Id,uc.User_Id,usr.FirstName,usr.LastName `;

  console.log('Raw query:', raw);

  const result = await AuditSeq.sequelize.query(raw, {
    replacements: { id }, // Use named replacements
    type: Sequelize.QueryTypes.SELECT
  });

  console.log('Query result:', result);

  return result;
}



// async function findById(id) {
//   const raw = `
//     SELECT a.Id,a.AuditCode,a.LocationClient_Id,a.Date,a.PresentClient,uc.CompanyName,uc.ContactPerson,br.BranchName,bd.Name as Location, uc.User_Id as User_Id,
//     usr.FirstName,usr.LastName  -- Include UserName from Users table
//     FROM Audits as a
//     INNER JOIN Users_Client as uc ON a.NameClient_Id = uc.Id
//     LEFT JOIN Branches as br ON br.Id = uc.Branch_Id
//     INNER JOIN Buildings as bd ON bd.Id = a.LocationClient_Id
//     LEFT JOIN [fdis].[dbo].[Users] as usr ON usr.Id = uc.User_Id -- Join Users table to get UserName
//     WHERE a.Id = '${id}'
//     GROUP BY a.AuditCode,a.Date,a.PresentClient,uc.CompanyName,uc.ContactPerson,br.BranchName,bd.Name,a.LocationClient_Id,a.Id,uc.User_Id,usr.FirstName,usr.LastName `;

//   console.log('Raw query:', raw);

//   const result = await AuditSeq.sequelize.query(raw, {
//     replacements: id,
//     type: Sequelize.QueryTypes.SELECT
//   });

//   console.log('Query result:', result);

//   return result;
// }





// const findAll = async (req) => {
//   const raw = 
//   `SELECT  a.IsDone,a.Id,a.AuditCode,a.LocationClient_Id,a.Date,a.PresentClient ,uc.CompanyName as client,uc.ContactPerson,br.BranchName ,bd.Name as Location
//   FROM [fdis].[dbo].[Audits] as a
//   inner join  [fdis].[dbo].[Users_Client] as uc on a.NameClient_Id=uc.Id
//   inner join [fdis].[dbo].[Branches] as br on br.Id=uc.Branch_Id
//   inner join [fdis].[dbo].[Buildings] as bd on bd.Id=a.LocationClient_Id  ORDER BY  a.AuditCode ASC
//   `
//    return AuditSeq.sequelize.query(raw, {
//      type: Sequelize.QueryTypes.SELECT
//    })
// }

const findAll = async (req) => {
  const raw = `
    SELECT
      a.IsDone,
      a.Id,
      a.AuditCode,
      a.LocationClient_Id,
      a.Date,
      a.PresentClient,
      uc.CompanyName as client,
      uc.ContactPerson,
      br.BranchName,
      bd.Name as Location,
      uc.User_Id as User_Id,
      usr.FirstName,
      usr.LastName  -- Include UserName from Users table
    FROM [fdis].[dbo].[Audits] as a
    INNER JOIN [fdis].[dbo].[Users_Client] as uc ON a.NameClient_Id = uc.Id
    INNER JOIN [fdis].[dbo].[Branches] as br ON br.Id = uc.Branch_Id
    INNER JOIN [fdis].[dbo].[Buildings] as bd ON bd.Id = a.LocationClient_Id
    LEFT JOIN [fdis].[dbo].[Users] as usr ON usr.Id = uc.User_Id -- Join Users table to get UserName
    ORDER BY a.AuditCode ASC
  `;

  return AuditSeq.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT
  });
};



export default {
  findById,
  findAll
}
