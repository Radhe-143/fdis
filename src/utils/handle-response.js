/* eslint-disable eqeqeq */
import { BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  ACCEPT_ERROR_STATUS
} from '../packages/system/authorizator'
import responseBuilder from './response-builder'
import errorUtil from '../utils/error';

const handleMessageResponse = (error, req, res, status = BAD_REQUEST_CODE, success = false, data) => {
  return !error ? res.status(status).jsonp(responseBuilder.build(
    success,
    data,
    {
      code: status,
      message: 'success'
    }
  )) : res.status(status).jsonp(responseBuilder.build(
    success,
    data,
    {
      ...error,
      code: status,
    }
  ));
};

const handleResponse = (error, result, req, res) => {
  if (error) {
    errorUtil.parseError(error)
    if (error.code) {
      return handleMessageResponse(error, req, res, ACCEPT_ERROR_STATUS.includes(error.code) ? error.code : BAD_REQUEST_CODE);
    }
    return handleMessageResponse(error, req, res, SERVER_ERROR_CODE);
  }
  handleMessageResponse(null, req, res, SUCCESS_CODE, true, result);
};


// Note: If You want to use handleResponsePaging function then you
// need to add paging filter on query-builder
// Example on query-builder promotion-code package
const handleResponsePaging = function (result, query) {
  if (query.paging != '0') {
    const data = {
      total: 0,
      data: []
    }
    if (result && result.length && result[0].data && result[0].data.length) {
      data.total = result[0].total[0].total
      data.data = result[0].data
    }
    return data
  } else {
    return result
  }
}

module.exports = {
  handleResponse,
  handleResponsePaging
};
