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

async function indexx(req, res) {
  const [error, result] = await to(service.indexx(req.query))
  return handleResponse(error, result, req, res)
}

// const create = async (req, res) => {
//   const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE);
  
//   try {
//     const newUser = await service.create(body); // Pass req.file to the service function
//     return res.json(newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return res.status(500).json({ error: 'Error creating user' });
//   }
// };

const create = async (req, res) => {
  try {
    const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE);
    const newUser = await service.create(body, req.file); // Pass req.file to the service function
    return res.status(201).json(newUser); // Return a success status code (201) here
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Error creating user' });
  }
};





const createRecord = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.create(body, req.user))
  handleResponse(error, data, req, res)
}

const update = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id, body, req.user))
  handleResponse(error, data, req, res)
}

const UpdatePass = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.UpdatePass(req.params.id, body, req.user))
  handleResponse(error, data, req, res)
}


const deleteRecord = async (req, res) => {
  const [error, data] = await to(service.destroy(req.params.id))
  handleResponse(error, data, req, res)
}


export default {
  create,
  index,
  indexx,
  show,
  update,
  UpdatePass,
  deleteRecord,
  createRecord
}
