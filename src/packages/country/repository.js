import { CountrySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return CountrySeq.findByPk(id)
}

async function findOne(query) {
  return CountrySeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await CountrySeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return CountrySeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined

  return CountrySeq.findAndCountAll({
    where: condition,
    ...option,
    order: [['CountryName', 'ASC']],
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    }
  })
}

async function countDocuments(query) {
  return CountrySeq.count(query)
}

const destroy = async (id) => {
  return CountrySeq.destroy({ where: { Id: id } })
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
