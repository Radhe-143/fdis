import { AreaDescriptionSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return AreaDescriptionSeq.findByPk(id, {
    include: ['Category']
  })
}

async function findOne(query) {
  return AreaDescriptionSeq.findOne({
    where: {
      ...query
    },
    include: ['Category']
  });
}

async function create(body) {
  return AreaDescriptionSeq.create(body)
}

async function updateOne(query, body) {
  return AreaDescriptionSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return AreaDescriptionSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    },
    include: ['Category']
  })
}

async function countDocuments(query) {
  return AreaDescriptionSeq.count(query)
}

const destroy = async (id) => {
  return AreaDescriptionSeq.destroy({ where: { Id: id } })
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
