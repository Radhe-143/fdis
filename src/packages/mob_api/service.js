/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function auth(body) {
  console.log(body)
 const data = await repo.findOne({
    UserName: body.username,
  })
  if(data == null)
  {
    throw new Error(JSON.stringify(commonLocale.authenticationInfoNotFound))
  }
  return repo.auth(body)
}

async function authorizetion(headers) {
  return repo.authorizetion(headers)
}


async function finddata(query) {
  return repo.finddata(query)
}


async function logout(headers) {
  return repo.logout(headers)
}

async function Audit_list(query,headers) {
  return repo.Audit_list(query,headers)
}

async function CompanyDetail(query) {
  return repo.CompanyDetail(query)
}

async function index5(query){
  return repo.getFeedback(query)
}

async function CategoryById(id) {
  return repo.CategoryById(id)
}


async function feedback(query,body) {
  return repo.feedback(query,body)
}


async function Areaname(id) {
  return repo.Areaname(id)
}

async function ElementCount(id) {
  return repo.ElementCount(id)
}

async function AuditPresent(id) {
  return repo.AuditPresent(id)
}

async function createAudit(body,files) {
  return repo.createAudit(body,files)
}

async function ElementType (id) {
  return repo.ElementType (id)
}

async function ErrorType (id) {
  return repo.ErrorType(id)
}

async function audits (Id) {
  return repo.audits(Id)
}

async function clientName (id) {
  return repo.clientName(id)
}

async function client(Id) {
  return repo.client(Id)
}


async function list (NameClient_Id) {
  return repo.list(NameClient_Id)
}

async function  AreaDescId (Id) {
  return repo. AreaDescId(Id)
}

async function  userprofile (Id) {
  return repo. userprofile(Id)
}








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
