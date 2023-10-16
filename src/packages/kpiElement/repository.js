import { ElementSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return ElementSeq.findByPk(
    id,
    {
      include: ['UserClient']
    }
  )
}

async function findOne(query) {
  return ElementSeq.findOne({
    where: {
      ...query
    },
    include: ['UserClient']
  });
}

async function create(body) {
  return ElementSeq.create(body)
}

async function updateOne(query, body) {
  return ElementSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return ElementSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    },
    include: ['UserClient']
  })
}

async function countDocuments(query) {
  return ElementSeq.count(query)
}

const destroy = async (id) => {
  return ElementSeq.destroy({ where: { Id: id } })
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
