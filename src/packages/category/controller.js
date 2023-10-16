import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'


async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}

async function index(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}

const create = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE,req.query)
  const [error, data] = await to(service.create(body, req.user))
  handleResponse(error, data, req, res)
}

const update = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id, body, req.user))
  handleResponse(error, data, req, res)
}

const updatecount=async(req,res)=>{
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id, body, req.user))
  handleResponse(error, data, req, res)
}


const deleteRecord = async (req, res) => {
  const [error, data] = await to(service.destroy(req.params.id))
  handleResponse(error, data, req, res)
}


export default {
  create,
  index,
  show,
  update,
  updatecount,
  deleteRecord
}
