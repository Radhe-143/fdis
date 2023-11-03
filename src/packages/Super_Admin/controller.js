import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'


async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}


async function indexfind(req,res){
  const [error, result] = await to(service.indexfind(req.query))
  return handleResponse(error, result, req, res)

}


async function index(req, res) {
  console.log(req.body.CompanyName)
  console.log(req.boby)
  const [error, result] = await to(service.index(req.query,req.body.CompanyName,req.body.Name,req.body.PerformerTypes_Id))
  return handleResponse(error, result, req, res)
}



const create = async (req, res) => {
  console.log(req.body)
  const [error, data] = await to(service.create(req.body))
  handleResponse(error, data, req, res)
}
const update = async (req, res) => {
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id, req.body,req.user))
  handleResponse(error, data, req, res)
}



const deleteRecord = async (req, res) => {
  const [error, data] = await to(service.destroy(req.params.id))
  handleResponse(error, data, req, res)
}



const deleteRecorddata = async (req, res) => {
  const [error, data] = await to(service.deleteRecorddata(req.params.id))
  handleResponse(error, data, req, res)
}

const updatedata = async (req, res) => {
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.updatedata(req.params.id, req.body,req.user))
  handleResponse(error, data, req, res)
}

async function indexxx(req, res) {
  const [error, result] = await to(service.indexxx(req.query))
  return handleResponse(error, result, req, res)
}

async function showww(req, res) {
  const [error, result] = await to(service.showww(req.params.id))
  return handleResponse(error, result, req, res)
}


const UpdatePass = async (req, res) => {
  // Assuming pick, config.ALLOWED_UPDATE_ATTRIBUTE, to, and handleResponse are correctly defined and imported

  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE);
  
  const [error, data] = await to(service.UpdatePass(req.params.id, req.body, req.user));
  
  // Assuming handleResponse is used to handle the response appropriately
  handleResponse(error, data, req, res);
}



export default {
  
  create,
  index,
  show,
  update,
  deleteRecord,
  indexfind,
  index,
  indexxx,
  showww,
  updatedata,
  deleteRecorddata,
  UpdatePass
  
}
