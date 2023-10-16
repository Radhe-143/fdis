import { Sequelize } from 'sequelize';
import { SuperAdminSeq} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'

async function findById(id) {

  return SuperAdminSeq.findByPk(id)

}

// const findAllByRole = async () => {

//   const raww = `SELECT *
//   FROM aspnet_Membership 
//   inner join aspnet_Users on aspnet_Membership.UserId=aspnet_Users.UserId 
//   inner join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
//   inner join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
//   `
//   return SuperAdminSeq.sequelize.query(raww, {
//   type: Sequelize.QueryTypes.SELECT
// })
// }



async function findOne(query) {
  return SuperAdminSeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await SuperAdminSeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return SuperAdminSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return SuperAdminSeq.findAndCountAll({
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
  // return SuperAdminSeq.sequelize.query('SELECT uc.CompanyName,uc.ContactPerson,br.BranchName ,count(IsDone) as Audits FROM Audits as a inner join  Users_Client as uc on a.NameClient_Id=uc.Id inner join Branches as br on br.Id=uc.Branch_Id GROUP BY uc.CompanyName,uc.ContactPerson,br.BranchName', { type: Sequelize.QueryTypes.SELECT })

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

const destroy = async (id) => {
  return SuperAdminSeq.destroy({ where: { Id: id } })
}

const rawQueryList = async () => {
 const raw = `SELECT *
 FROM  aspnet_Roles
 inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId
 inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
 where aspnet_Roles.RoleId='6BF066DD-C1CF-4F0B-B982-7555DE280212'
 `
  return SuperAdminSeq.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT
  })
}


// const rawQueryList = async () => {
  
//   const raw=`SELECT *
//   FROM  aspnet_Roles
//   inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId
//   inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
//   where aspnet_Roles.RoleId='6BF066DD-C1CF-4F0B-B982-7555DE280212'
//   `
//   return SuperAdminSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   })




// }

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
