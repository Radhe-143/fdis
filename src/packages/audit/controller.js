import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import { pick } from 'lodash'
import config from './config'

// import { AuditSeq, UserClientSeq,BranchSeq,UserSeq} from '../../models';



// import { pick } from 'lodash'
// import { handleResponse } from '../../utils/handle-response'
// import to from '../../utils/to'
// import service from './service'
// import config from './config'


async function indexx(req, res) {
  console.log(req.boby)
  const [error, result] = await to(service.indexx(req.params.id))
  return handleResponse(error, result, req, res)
}





async function show(req, res) {
  const [error, result] = await to(service.show(req.params.id))
  return handleResponse(error, result, req, res)
}

async function upload(req, res) {
  const auditId = req.params.id;
  const imageBase64 = req.file.buffer.toString('base64'); // Convert the image buffer to base64
  const [error, result] = await to(service.uploadImageById(auditId, imageBase64));
  return handleResponse(error, result, req, res);
}



async function indexJoin(req, res) {
  const [error, result] = await to(service.indexJoin(req.query))
  return handleResponse(error, result, req, res)
}

// async function index(req, res) {
//   const [error, result] = await to(AuditSeq.findAll({
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'UserClient',
//         attributes: ['Id', 'CompanyName', 'ContactPerson'],
//         include: [
//           {
//             model: BranchSeq,
//             as: 'Branch',
//             attributes: ['BranchName']
//           }
//         ]
//       },
//       {
//         model: UserSeq,
//         as: 'CreatedByUser',
//         attributes: ['UserName']
//       }
//     ],
//     attributes: ['AuditName', 'StartDate', 'EndDate', 'Status', 'IsSubmitted', 'IsDraft', 'IsActive'],
//     where: { IsActive: 1 },
//     order: [['StartDate', 'DESC']]
//   }))
//   return handleResponse(error, result, req, res)
// }

async function index(req, res) {
  const [error, result] = await to(service.index(req.query))
  return handleResponse(error, result, req, res)
}


const create = async (req, res) => {
 
  const body =pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.create(body,req.user))
  handleResponse(error, data, req, res)
}


// const create = async (req, res) => {
//   const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
//   const [error, data] = await to(service.create(body, req.user))
//   handleResponse(error, data, req, res)
// }



const update = async (req, res) => {
  // const body = pick(req.body, config.ALLOWED_UPDATE_ATTRIBUTE)
  const [error, data] = await to(service.update(req.params.id, req.body, req.user))
  handleResponse(error, data, req, res)
}




const deleteRecord = async (req, res) => {
  const [error, data] = await to(service.destroy(req.params.id))
  handleResponse(error, data, req, res)
}


const deleteAllRecords = async (req, res) => {
  const [error, data] = await to(service.destroyAll());
  handleResponse(error, data, req, res);
};


const locationbyclient= async (req,res)=>{
  const [error, result] = await to(service.locationbyclient(req.body))
  return handleResponse(error, result, req, res)
}



export default {
  create,
  indexx,
  indexJoin,
  show,
  update,
  deleteRecord,
  locationbyclient,
  deleteAllRecords,
  upload,
  index
}
