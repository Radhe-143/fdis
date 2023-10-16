import { Op } from 'sequelize';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  }

  if (request.ElementTypeId) {
    match.ElementTypeId = request._id
  }


  if (request.ignoreIds !== undefined) {
    if (request.ignoreIds.includes(',')) {
      match.ElementTypeId = {
        [Op.notIn]: request.ignoreIds
          .split(',')
          .map(m => m)
          .filter(f => f),
      }
    } else {
      match.ElementTypeId = {
        [Op.notIn]: [request.ignoreIds],
      }
    }
  }

  if (request.search) {
    const searchQuery = {
      [Op.or]: [
        {
          ElementTypeValue: {
            [Op.like]: `%${request.search}%`
          }
        }
      ]
    }
    match[Op.and].push(searchQuery)
  }

  return match
}

export {
  queryBuilderGetList
}
