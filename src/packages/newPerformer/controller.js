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
  //   try {
  //     const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE);
  //     const newUser = await service.create(body, req.file); // Pass req.file to the service function
  //     return res.status(201).json(newUser); // Return a success status code (201) here
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     return res.status(500).json({ error: 'Error creating user' });
  //   }
  // };


  const create = async (req, res) => {
    try {
      // Pick the necessary attributes from the request body
      const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE);
  
      // Call the service.create function with 'body', 'req.user', and 'req.file'
      const [error, data] = await to(service.create(body, req.user));
  
      // Handle the response based on the result
      handleResponse(error, data, req, res);
    } catch (error) {
      console.error('Error occurred', error.message);
      res.status(500).json({ error: 'An error occurred.' });
    }
  };
  




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
    const [error, data] = await to(service.destroy(req.params.id,))
    handleResponse(error, data, req, res)
  }
  

  export default {
    create,
    index,
    indexx,
    show,
    update,
    UpdatePass,
    deleteRecord
  }