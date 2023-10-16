import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'



async function index(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}

async function index01(req, res) {
  const [error, result] = await to(service.index01(req.query))
  return handleResponse(error, result, req, res)
}

async function index02(req, res) {
  const [error, result] = await to(service.index02(req.query))
  return handleResponse(error, result, req, res)
}


async function index05(req, res) {
  const [error, result] = await to(service.index05(req.query))
  return handleResponse(error, result, req, res)
}

async function findbyaudit(req, res) {
  const [error, result] = await to(service.findbyaudit(req.query))
  return handleResponse(error, result, req, res)
}


async function findErrorkind(req, res) {
  const [error, result] = await to(service.findErrorkind(req.query))
  return handleResponse(error, result, req, res)
}

async function getLastSixAudit(req, res) {
  const [error, result] = await to(service.getLastSixAudit(req.query))
  return handleResponse(error, result, req, res)
}


export default {

index,
index01,
index02,
index05,
findErrorkind,
findbyaudit,
getLastSixAudit


}
