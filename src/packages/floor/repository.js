import { FloorSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return FloorSeq.findByPk(id)
}

async function findOne(query) {
  return FloorSeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await FloorSeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return FloorSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return FloorSeq.findAndCountAll({
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
  return FloorSeq.count(query)
}

const destroy = async (id) => {
  return FloorSeq.destroy({ where: { Id: id } })
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
