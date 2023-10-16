import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'



async function index(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}

// async function getfeedback(req, res) {
//   const [error, result] = await to(service.getfeedback(req.query))
//   return handleResponse(error, result, req, res)
// }

async function index5(req, res) {
  console.log(req.boby)
  const [error, result] = await to(service.index5(req.query,req.body.Name))
  return handleResponse(error, result, req, res)
}




const create = async (req, res) => {
  const [error, data] = await to(service.create(req.body)); // Ensure req.body is being passed
  handleResponse(error, data, req, res);
}



const feedBack = async (req, res) => {
  const [error, data] = await to(service.create(req.body)); // Ensure req.body is being passed
  handleResponse(error, data, req, res);
}


async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}  

async function findAllJoin(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}






// async function getfeedback(req,res){
// const [error ,result]=service.
// }

const feedback = async (req, res) => {
  
  const [error, data] = await to(service.feedback(req.query,req.body)); // Corrected variable name 'err' to 'error'
  
return handleResponse(error, data, req, res);
};








export default {

index,
findAllJoin,
feedback,
show,
create,
feedBack,
index5

}
