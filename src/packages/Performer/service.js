/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(query,body) {
  const data = await repo.findOne({
    UserName: body.UserName,
  })
  if (data) {
    console.log("username already existed");
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }
  return repo.create01(query,body)
}

async function update(id,body) {
  await repo.updateOne(id,body)
  return show(id)
}

async function updatePass(id,body) {
  await repo.Changepassword(id,body)
  return show(id)
}

async function index(query,body,body2,body3 ) {
  return repo.rawQueryList(query,body,body2,body3)
}

async function index2(query,body,body2,body3) {
  return repo.rawQueryListFilter(query,body,body2,body3)
}

async function show(id) {
  return repo.rawID(id)
}

async function destroy(id) {
  return repo.destroy(id)
}

async function showbyid(id)
{
  return repo.findAllByRole(id)
}


async function index3(IsAnonymous ) {
  return repo.IsAnonymous(IsAnonymous )
}

async function index4(PerformerTypes_Id) {
  return repo. PerformerTypes(PerformerTypes_Id)
}

async function bothFilter(IsApproved,IsAnonymous ,PerformerTypes_Id) {
  if(!IsApproved){
    IsApproved = '%';
  }
  if(!IsAnonymous){
    IsAnonymous = '%';
  }
  if(!PerformerTypes_Id){
    PerformerTypes_Id = '%';
  }
  return repo.bothFilter(IsApproved,IsAnonymous ,PerformerTypes_Id)
}



async function getLastSixAuditAverage(AuditCode) {
  return repo.getLastSixAuditAverage(AuditCode)
}
async function result(IdAudit){
  return repo.result(IdAudit)
}

export default {
  create,
  index,
  index2,
  show,
  update,
  destroy,
  showbyid,
  index3,
  index4,
  bothFilter,
  getLastSixAuditAverage,
  result,
  updatePass
}
