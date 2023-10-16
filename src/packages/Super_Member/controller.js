import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'
import method from './method'

async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}


async function showbyid(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}

async function index(req, res) {
  // console.log(req.params.Password)
  // console.log("ddddddddddddddddddd", req.params.Password)
  // req.params.Passwords = await method.hashPassword(req.params.Password)
  // console.log("ddddddddddddddddddd", req.params.Password)
  // console.log(req.body)
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)

const [error, result] = await to(service.index(req.query,req.body.Password,req.body.UserName))

  // return handleResponse(error, result, req, res)
  // console.log("aaaaa",result[0].Password)
  {
  for(let i=0;i<=result.length;i++)
  {
  // console.log("aaaaa",result[0].Password)
//  let result=[];

   const  body3 = method.comparePassword(req.body.Password,result[0].Password)
    if(body3==true){
      let body4  
      body4=body3;
      console.log("pass====>" ,body4)
      return handleResponse(error, result, req, res)

    }
  }
  
  if(body3 == true )
  {
    return handleResponse(error, result, req, res)

  }
  
  // console.log(result[0].Password)
}
return
}

const create = async (req, res) => {
  const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.create(body, req.user))
  handleResponse(error, data, req, res)
}

const update = async (req, res) => {
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
  deleteRecord,
  // rawQueryList,
  showbyid
}
