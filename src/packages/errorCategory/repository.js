import { ErrorCategorySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return ErrorCategorySeq.findByPk(id)
}

async function findOne(query) {
  return ErrorCategorySeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  console.log(body)
  return (await ErrorCategorySeq.create(body)).get({ plain: true })
}


async function updateOne(query, body) {
  return ErrorCategorySeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return ErrorCategorySeq.findAndCountAll({
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
  return ErrorCategorySeq.count(query)
}

const destroy = async (id) => {
  return ErrorCategorySeq.destroy({ where: { Id: id } })
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
