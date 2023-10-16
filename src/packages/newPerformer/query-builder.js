import { Op } from 'sequelize';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  }

  if (request.ID) {
    match.ID = request._id
  }
  if (request.active) {
    match.IsAnonymous = request.active
  }
  if (request.NewPerformerdata) {
    match.NewPerformerdata = request.NewPerformerdata
  }

  if (request.ignoreIds !== undefined) {
    if (request.ignoreIds.includes(',')) {
      match.ID = {
        [Op.notIn]: request.ignoreIds
          .split(',')
          .map(m => m)
          .filter(f => f),
      }
    } else {
      match.ID = {
        [Op.notIn]: [request.ignoreIds],
      }
    }
  }

  if (request.search) {
    const searchQuery = {
      [Op.or]: [
        {
          CategoryName: {
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
