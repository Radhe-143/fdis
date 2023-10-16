import { SuperUserSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return SuperUserSeq.findByPk(id, {
    include: ['aspnet_Users']
  })
}

async function findOne(query) {
  return SuperUserSeq.findOne({
    where: {
      ...query
    },
    include: ['aspnet_Users']
  });
}

async function create(body) {
  return ( await  SuperUserSeq.create(body)).get({plain: true})
}

async function updateOne(query, body) {
  return SuperUserSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return SuperUserSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    }
  })
}

async function countDocuments(query) {
  return SuperUserSeq.count(query)
}

const destroy = async (id) => {
  return SuperUserSeq.destroy({ where: { UserId: id } })
}


const rawQueryList = async () => {
 const raw = `SELECT *
             FROM aspnet_Membership 
             inner join aspnet_Users on aspnet_Membership.UserId=aspnet_Users.UserId 
             inner join aspnet_UsersInRoles on aspnet_Users.UserId=aspnet_UsersInRoles.UserId
             inner join aspnet_Roles on aspnet_UsersInRoles.RoleId=aspnet_Roles.RoleId
             `
  return SuperUser.sequelize.query(raw, {
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
  rawQueryList

}
