import { ErrorTypeSeq,ErrorKindSeq,ErrorCategorySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return ErrorTypeSeq.findByPk(id)
}

async function findOne(query) {
  return ErrorTypeSeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  return (await ErrorTypeSeq.create(body)).get({ plain: true })
}

async function updateOne(query, body) {
  return ErrorTypeSeq.update(body, { where: { ...query } })
}

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return ErrorTypeSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes:
//     {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: ['ErrorKind', 'ErrorCategory']
//   })
// }


// 

const findAll = async (request) => {
  const condition = queryBuilderGetList(request);
  const option = listInitOptions(request);
  option.raw = undefined;
  return ErrorTypeSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes: {
      exclude: request.excludes,
      include: request.includes
    },
    include: [
      { model: ErrorKindSeq,as: 'ErrorKind'},
      { model: ErrorCategorySeq,as: 'ErrorCategory' }
    ]
  });
};



async function countDocuments(query) {
  return ErrorTypeSeq.count(query)
}

const destroy = async (id) => {
  return ErrorTypeSeq.destroy({ where: { ErrorTypeId: id } })
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
