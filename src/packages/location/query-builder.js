import { Op } from 'sequelize';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  }

  if (request.Id) {
    match.Id = request.Id
  }
  if (request.ucId) {
    match.ClientId = request.ucId
  }
  
  if(request.active){
    match.Activate = request.active
  }

  if (request.ignoreIds !== undefined) {
    if (request.ignoreIds.includes(',')) {
      match.Id = {
        [Op.notIn]: request.ignoreIds
          .split(',')
          .map(m => m)
          .filter(f => f),
      }
    } else {
      match.Id = {
        [Op.notIn]: [request.ignoreIds],
      }
    }
  }

  if (request.search) {
    const searchQuery = {
      [Op.or]: [
        {
          Name: {
            [Op.like]: `%${request.search}%`
          }
        }, {
          Region: {
            [Op.like]: `%${request.search}%`
          }
        }, {
          Address: {
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