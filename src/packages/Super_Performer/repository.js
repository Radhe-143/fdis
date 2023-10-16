import { Sequelize } from 'sequelize';
import { SuperPerformer} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'

async function findById(id) {
     return SuperPerformer.findByPk(id)
}

async function findOne(query) {
  return SuperPerformer.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await SuperPerformer.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return SuperPerformer.update(body, { where: { ...query } })
}

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

/**
 * Audits Screen List
 * @param {*} request
 * @returns
 */

const findAllJoin = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  // return SuperPerformer.sequelize.query('SELECT uc.CompanyName,uc.ContactPerson,br.BranchName ,count(IsDone) as Audits FROM Audits as a inner join  Users_Client as uc on a.NameClient_Id=uc.Id inner join Branches as br on br.Id=uc.Branch_Id GROUP BY uc.CompanyName,uc.ContactPerson,br.BranchName', { type: Sequelize.QueryTypes.SELECT })

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

const destroy = async (id) => {
  return SuperPerformer.destroy({ where: { Id: id } })
}

const rawQueryList = async () => {
  const raw = 
  `
  SELECT *
  FROM  aspnet_Roles
  inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId
  inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
  inner join aspnet_Membership on aspnet_Users.UserId=aspnet_Membership.UserId
  inner join Users on aspnet_Users.UserName=Users.UserName
  inner join Emails on Users.Id=Emails.UserId
  inner join Users_Auditor on Users.Id=Users_Auditor.Id
  inner join TypeOfPerformers on Users_Auditor.Id= TypeOfPerformers.Performers_Id
  inner join PerformerType on TypeOfPerformers.PerformerTypes_Id=PerformerType.Id
  inner join ClientAuditor on Users_Auditor.Id=ClientAuditor.AuditorId
  inner join Users_Client on ClientAuditor.ClientId=Users_Client.Id
  where aspnet_Roles.RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7' 

  `;
   return SuperPerformer.sequelize.query(raw, {
     type: Sequelize.QueryTypes.SELECT
   })
 }
 
//  inner join Images on Users.ProfileImage=Images.ImageId

export default {
  
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  findAllJoin,
  rawQueryList
}
