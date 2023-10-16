/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { verify } from 'jsonwebtoken';
import config from '../configs';
import { commonLocale } from '../locales';
import { handleResponse } from '../utils/handle-response';
import to from '../utils/to';


const authentication = async (req, res, next) => {
  const fullPrefixToken = req.headers.authorization;
  if (fullPrefixToken) {
    const token = fullPrefixToken.split(' ')[1]
    verify(`${token}`, config.secret, async (error, decoded) => {
      if (error) {
        return handleResponse(commonLocale.tokenVerifyFailed, null, req, res)
      }
      if (typeof decoded === 'string') {
        decoded = JSON.parse(decodeURIComponent(decoded))
      }
      if (typeof decoded.id === 'undefined') {
        return handleResponse(commonLocale.tokenVerifyFailed, null, req, res)
      }
      // TODO Get User Info

      req.user = {}
      next()
    })
  } else {
    return handleResponse(commonLocale.noToken, null, req, res)
  }
};

export default authentication
