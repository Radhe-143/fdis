/* eslint-disable prefer-destructuring */
import { commonLocale } from '../locales'
import logger from '../logger'
import { SERVER_ERROR_CODE } from '../packages/system/authorizator';

function parseError(error) {
  if (!error) {
    return error;
  }
  let message = '';
  let code = SERVER_ERROR_CODE;
  if (error.name === 'MongoError') {
    if (error.code === 11000) {
      code = error.code;
      message = commonLocale.dataAlreadyExisted
    } else {
      code = commonLocale.serverError;
      message = error.message
    }
  } else if (error.errors) {
    const keys = Object.keys(error.errors);
    message = error.errors[keys[0]] ? error.errors[keys[0]].message : commonLocale.serverError
  } else {
    message = error.message;
    code = error.code ? error.code : SERVER_ERROR_CODE
  }

  logger.error(message, { error });

  return {
    success: false,
    message,
    code
  }
}

function parseResponse(paymentType, status, message, amount, realAmount) {
  let msg = message
  if (paymentType === 'cashInMobileCard' || paymentType === 'checkoutMobileCard') {
    msg = messageMobileCard(status, msg)
  }
  return {
    paymentType,
    errorCode: parseInt(status, 10),
    message: msg,
    amount: parseInt(amount, 10),
    realAmount: parseInt(realAmount, 10),
    Gcoin: Math.round(parseInt(realAmount, 10) / 1000)
  }
}

function messageMobileCard(errorCode, msg) {
  if (parseInt(errorCode, 10) === 0) return 'Nạp thẻ thành công'
  if (parseInt(errorCode, 10) === -100) return 'Sai giá trị mệnh giá thẻ truyền lên'
  if (parseInt(errorCode, 10) === -1) return 'Sai mã thẻ hoặc thẻ đã được sử dụng'
  return msg
}

export default {
  parseError,
  parseResponse
}
