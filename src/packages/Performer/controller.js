import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'


async function filter(req,res)
{
  console.log(req.body.CompanyName)
  console.log(req.boby)
  const [error, result] = await to(service.index2(req.query,req.body.CompanyName,req.body.Name,req.body.PerformerTypes_Id))
  return handleResponse(error, result, req, res)
}

async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}

async function index(req, res) {
  console.log(req.body.CompanyName)
  console.log(req.boby)
  const [error, result] = await to(service.index(req.query,req.body.CompanyName,req.body.Name,req.body.PerformerTypes_Id))
  return handleResponse(error, result, req, res)
}

const create = async (req, res) => {
  // const body = pick(req.body.UserName, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.create(req.query,req.body))
  handleResponse(error, data, req, res)
}

const update = async (req, res) => {
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id , req.body))
  handleResponse(error, data, req, res)
}

const updatePass = async (req, res) => {
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.updatePass(req.params.id , req.body))
  handleResponse(error, data, req, res)
}

const deleteRecord = async (req, res) => {
  const [error, data] = await to(service.destroy(req.params.id,))
  handleResponse(error, data, req, res)
}

async function index3(req, res) {
  const [error, result] = await to(service.index3(req.params.IsAnonymous))
  return handleResponse(error, result, req, res)
}

async function index4(req, res) {
  const [error, result] = await to(service.index4(req.params.PerformerTypes_Id))
  return handleResponse(error, result, req, res)
}

async function bothFilter(req, res) {
  const [error, result] = await to(service.bothFilter( req.query.IsApproved, req.query.IsAnonymous , req.query.PerformerTypes_Id ))
  return handleResponse(error, result, req, res)
}

async function getLastSixAuditAverage(req, res) {
  const [error, result] = await to(service.getLastSixAuditAverage( req.params.AuditCode))
  return handleResponse(error, result, req, res)
}

async function result (req, res){
  const[ error, result] =await to(service.result(req.params.IdAudit))
  return handleResponse(error, result, req, res)
}


export default {
  create,
  index,
  show,
  update,
  deleteRecord,
  filter,
  index3,
  index4,
  bothFilter,
  getLastSixAuditAverage,
  result,
  updatePass
}
