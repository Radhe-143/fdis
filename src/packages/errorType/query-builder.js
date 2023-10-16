import { Op } from 'sequelize';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  }

  if (request.ErrorTypeId) {
    match.ErrorTypeId = request._id
  }


  if (request.ignoreIds !== undefined) {
    if (request.ignoreIds.includes(',')) {
      match.ErrorTypeId = {
        [Op.notIn]: request.ignoreIds
          .split(',')
          .map(m => m)
          .filter(f => f),
      }
    } else {
      match.ErrorTypeId = {
        [Op.notIn]: [request.ignoreIds],
      }
    }
  }

  if (request.search) {
    const searchQuery = {
      [Op.or]: [
        {
          ErrorTypeValue: {
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
