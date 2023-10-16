import { Op } from 'sequelize';
import moment from 'moment';

const queryBuilderGetList = (request = {}) => {
  const match = {
    [Op.and]: []
  }

  if (request.ID) {
    match.ID = request._id
  }

  if (request.ucId) {
    match.NameClient_Id = request.ucId
  }
  if (request.auditcode) {
    match.AuditCode = request.auditcode
  }
  if (request.client) {
    match.CompanyName = request.client
  }

  
  if (request.date) {
    match.Date = {
      [Op.gte]: moment(request.date).startOf('days').toDate(),
      [Op.lte]: moment(request.date).endOf('days').toDate()
    }
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
