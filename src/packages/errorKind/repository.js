import { ErrorKindSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return ErrorKindSeq.findByPk(id)
}

async function findOne(query) {
  return ErrorKindSeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await ErrorKindSeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return ErrorKindSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return ErrorKindSeq.findAndCountAll({
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
  return ErrorKindSeq.count(query)
}

const destroy = async (id) => {
  return ErrorKindSeq.destroy({ where: { Id: id } })
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
