import { Sequelize } from 'sequelize';
import { SuperUser} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'

import method from './method'

async function findById(id) {

  return SuperUser.findByPk(id)

}

// const findAllByRole = async () => {

//   const raww = `SELECT *
//   FROM aspnet_Membership 
//   inner join aspnet_Users on aspnet_Membership.UserId=aspnet_Users.UserId 
//   inner join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
//   inner join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
//   `
//   return SuperUser.sequelize.query(raww, {
//   type: Sequelize.QueryTypes.SELECT
// })
// }



async function findOne(query) {
  return SuperUser.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await SuperUser.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return SuperUser.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return SuperUser.findAndCountAll({
    where: condition,
    ...option,
    include: ['Country', 'Branch', 'User'],
    order: [['UserClient.CompanyName', 'ASC']]
  })
}

/**
 * Audits Screen List
 * @param {*} request
 * @returns
 */
const findAllJoin = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  // return SuperUser.sequelize.query('SELECT uc.CompanyName,uc.ContactPerson,br.BranchName ,count(IsDone) as Audits FROM Audits as a inner join  Users_Client as uc on a.NameClient_Id=uc.Id inner join Branches as br on br.Id=uc.Branch_Id GROUP BY uc.CompanyName,uc.ContactPerson,br.BranchName', { type: Sequelize.QueryTypes.SELECT })

  return SuperUser.findAndCountAll({
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
  return SuperUser.count(query)
}

const destroy = async (id) => {
  return SuperUser.destroy({ where: { Id: id } })
}

// const rawQueryList = async () => {
//  const raw = `SELECT *
//              FROM aspnet_Membership 
//              inner join aspnet_Users on aspnet_Membership.UserId=aspnet_Users.UserId 
//              inner join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
//              inner join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
//              `
//   return SuperUser.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   })
// }

const rawQueryList = async (query,body2,body1) => {



  // FROM  aspnet_Roles
  // inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId
  // inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
  // inner join aspnet_Membership on aspnet_Users.UserId=aspnet_Membership.UserId

  console.log("ddddddddddddddddddd", body1)
  console.log("sssss",body2)
  const raw = `
  SELECT *
  FROM  aspnet_Membership
  inner join aspnet_Users on aspnet_Membership.UserId=aspnet_Users.UserId

  where aspnet_Users.UserName=? `
  return  SuperUser.sequelize.query(raw, {
    replacements:[body1],
    type: Sequelize.QueryTypes.SELECT
   })
 }
 

// DAF570A4-5AD9-4D52-B4FB-171C4A759A06

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
  // findAllByRole
  
}
