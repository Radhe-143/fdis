// import { ElementTypeSeq } from '../../models';
// import { queryBuilderGetList } from './query-builder'
// import { listInitOptions } from '../../utils/paginate'


// async function findById(id) {
//   return ElementTypeSeq.findByPk(id, {
//     include: ['AreaDescription']
//   })
// }

// async function findOne(query) {
//   return ElementTypeSeq.findOne({
//     where: {
//       ...query
//     },
//     include: ['AreaDescription']
//   });
// }

// async function create(body) {
//   return ElementTypeSeq.create(body)
// }

// async function updateOne(query, body) {
//   return ElementTypeSeq.update(body, { where: { ...query } })
// }

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return ElementTypeSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes:
//     {
//       exclude: request.excludes,
//       include: request.includes
//     },
//   })
// }

// async function countDocuments(query) {
//   return ElementTypeSeq.count(query)
// }

// const destroy = async (id) => {
//   return ElementTypeSeq.destroy({ where: { ElementTypeId: id } })
// }


// export default {
//   findById,
//   findAll,
//   create,
//   findOne,
//   updateOne,
//   countDocuments,
//   destroy
// }



import { ElementTypeSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'

async function findById(id) {
  return ElementTypeSeq.findByPk(id, {
    include: ['AreaDescription']
  })
}

async function findOne(query) {
  return ElementTypeSeq.findOne({
    where: {
      ...query
    },
    include: ['AreaDescription']
  });
}

async function create(body) {
  return ElementTypeSeq.create(body)
}



async function updateOne(query, body) {
  return ElementTypeSeq.update(body, { where: { ...query } })
}


           // Working api
// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return ElementTypeSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: ['AreaDescription'] // Add this line to include the 'AreaDescription' association
//   })
// }


    // New Api

    const findAll = async (request) => {
      const condition = queryBuilderGetList(request);
      const option = listInitOptions(request);
      option.raw = undefined;
    
      return ElementTypeSeq.findAndCountAll({
        where: condition,
        ...option,
        attributes: {
          exclude: request.excludes,
          include: request.includes
        },
        order: [['ElementTypeValue', 'ASC']], // Add this line to order by 'ElementTypeValue' in ascending order
        include: ['AreaDescription']
      });
    };
    

async function countDocuments(query) {
  return ElementTypeSeq.count(query)
}

const destroy = async (id) => {
  return ElementTypeSeq.destroy({ where: { ElementTypeId: id } })
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

