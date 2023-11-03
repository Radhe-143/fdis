import { FormSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return FormSeq.findByPk(id, {
    include: ['Auditdata', 'Categories', 'Floors', 'AreaDescriptions']
  });
}




async function findOne(query) {
  return FormSeq.findOne({
    where: {
      ...query
    },
  });
}

async function create(body) {
  console.log("body is " , body)
  return (await FormSeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return FormSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return FormSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    },
    include:['Auditdata','Categories','Floors','AreaDescriptions']
  })
}

async function countDocuments(query) {
  return FormSeq.count(query)
}

const destroy = async (id) => {
  return FormSeq.destroy({ where: { Id: id } })
}


export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy
}
