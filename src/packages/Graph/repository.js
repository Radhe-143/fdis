import { ErrorCategory } from '../../models';
import { Modules } from '../../models';
import { Sequelize } from 'sequelize';
import { UserSeq,SuperPerformer} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import method from './method'

import{ Table } from 'mssql';



       // Working api
// async function findAll(query) {
//   const raw=`select * from audits 
//   inner join ResultAuditCategory on Audits.Id = ResultAuditCategory.IdAudit inner join Categories on ResultAuditCategory.IdCategory = Categories.id where AuditCode=12068`
//   return Modules.sequelize.query(raw, {
//     replacements:[],
//     type: Sequelize.QueryTypes.SELECT
//    })
// }

           //Working api using without Join
async function findAll(query) {
  const raw = `
    SELECT Audits.Id AS AuditId, Categories.Id AS CategoryId
    FROM Audits 
    CROSS JOIN Categories
  `;

  return Modules.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT
  });
}



async function find(query) {
  const raw=` select  * from ErrorType inner join  ErrorKinds on ErrorType.ErrorKindId = ErrorKinds.Id `
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}

async function findError(query) {
  const raw=` select * from [dbo].[ErrorCategories] `
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}

async function findErrorkind(query) {
  const raw=` Select A.ID, A.Name , COUNT(B.ErrorKindId ) AS TOTAL FROM ErrorKinds A INNER JOIN ErrorType B ON A.Id=B.ErrorKindId GROUP BY A.Id , A.Name
   `
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}


async function findaudit(query) {
  const raw=` select * from Audits inner join Users_Client on Audits.NameClient_Id= Users_Client.id
  inner join Branches on Users_Client.Branch_Id=Branches.Id
  inner join Country on Users_Client.CountryId =Country.Id  inner join Buildings on Audits.LocationClient_Id =Buildings.Id  `
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}

async function getLastSixAudit(query) {
  const raw=` Select TOP 6 * from Audits inner join ResultAuditCategory on
  Audits.Id = ResultAuditCategory.IdAudit order by Audits.Date DESC `
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}


export default {
findAll ,
find,
findError,
findErrorkind,
findaudit,
getLastSixAudit

}
