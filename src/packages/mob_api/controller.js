import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'

const auth = async (req, res) => {
  const [error, data] = await to(service.auth(req.body))
  handleResponse(error, data, req, res)
}

async function finddata(req, res) {
  const [error, result] = await to(service.finddata(req.query))
  return handleResponse(error, result, req, res)
}

const authorizetion = async (req, res) => {
  const [error, data] = await to(service.authorizetion(req.headers))
  handleResponse(error, data, req, res)
}

const logout = async (req, res) => {
  const [error, data] = await to(service.logout(req.headers))
  handleResponse(error, data, req, res)
}


async function Audit_list(req, res) {
  const [error, result] = await to(service.Audit_list(req.query,req.headers))
  return handleResponse(error, result, req, res)
}

async function  CompanyDetail(req, res) {
  const [error, result] = await to(service.CompanyDetail(req.query))
  return handleResponse(error, result, req, res)
}

async function  CategoryById(req, res) {
  const [error, result] = await to(service.CategoryById(req.params.id))
  return handleResponse(error, result, req, res)
}
async function  Areaname(req, res) {
  const [error, result] = await to(service.Areaname(req.params.id))
  return handleResponse(error, result, req, res)
}
async function  ElementCount(req, res) {
  const [error, result] = await to(service.ElementCount(req.params.id))
  return handleResponse(error, result, req, res)
}
async function  AuditPresent(req, res) {
  const [error, result] = await to(service.AuditPresent(req.params.id))
  return handleResponse(error, result, req, res)
}
async function  createAudit(req, res) {
  const [error, result] = await to(service.createAudit(req.body,req.files))
  return handleResponse(error, result, req, res)
}

async function ElementType (req, res) {
  const [error, result] = await to(service.ElementType (req.params.id))
  return handleResponse(error, result, req, res)
}

async function  ErrorType (req, res) {
  const [error, result] = await to(service. ErrorType (req.params.id))
  return handleResponse(error, result, req, res)
}
async function  audits(req, res) {
  const [error, result] = await to(service.audits(req.params.Id))
  return handleResponse(error, result, req, res)
}

async function  clientName(req, res) {
  const [error, result] = await to(service.clientName(req.params.Id))
  return handleResponse(error, result, req, res)
}

async function  client(req, res) {
  const [error, result] = await to(service.client(req.params.Id))
  return handleResponse(error, result, req, res)
}

async function  list(req, res) {
  const [error, result] = await to(service.list(req.params.NameClient_Id))
  return handleResponse(error, result, req, res)
}

async function  AreaDescId(req, res) {
  const [error, result] = await to(service.AreaDescId(req.params.Id))
  return handleResponse(error, result, req, res)
}

async function  userprofile(req, res) {
  const [error, result] = await to(service.userprofile(req.params.Id))
  return handleResponse(error, result, req, res)
}

async function index5(req, res) {
  console.log(req.boby)
  const [error, result] = await to(service.index5(req.query))
  return handleResponse(error, result, req, res)
}

const feedback = async (req, res) => {
  
  const [error, data] = await to(service.feedback(req.query,req.body)); // Corrected variable name 'err' to 'error'
  
  console.log("data is", data);
  console.log("error is", error); // Corrected variable name 'err' to 'error'
  
return handleResponse(error, data, req, res);
};


export default {
  auth,
  authorizetion,
  Audit_list,
  CompanyDetail,
  CategoryById,
  Areaname,
  ElementCount,
  AuditPresent,
  createAudit,
  ElementType,
  ErrorType,
  audits,
  clientName,
  client,
  list,
  AreaDescId,
   userprofile,
   logout,
   index5,
   feedback,
   finddata
  

}
