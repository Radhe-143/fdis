/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(body) {
  console.log('Service',body)
  return repo.create(body)

}

// async function update(id,body) {
//   console.log(id,body),
//   await repo.updateOne(id,body)

//   // return show(id)
// }
async function update(id,body) {
  await repo.updateOne(id,body)
  console.log(id,body)
    return show(id)
}

// async function updatedata(id,body) {
//   await repo.updatedata(id,body)
//   console.log(id,body)
//     return show(id)
// }


async function index(query,body,body2,body3 ) {
  return repo.rawQueryList(query,body,body2,body3)
}

async function indexfind(query) {
  return repo.findAll(query)
}

async function show(id) {
  return repo.findById(id)
}



async function destroy(id) {
  return repo.destroy(id)
}


async function showbyid(id)
{
  return repo.findAllByRole(id)
}




async function indexxx(query) {
  return repo.findAlll(query)
}

async function deleteRecorddata(id) {
  try{
   const result=await repo.deleteRecorddata(id);
   return result
  }
  catch(error){
   throw error
  }
 }

 async function showww(id) {
  try {
    // Call the repository function to find data
    const result = await repo.finddata(id);
    return result;
  } catch (error) {
    // Handle any errors that occur during the data retrieval
    throw error; // Optionally, you can handle the error here
  }
}

async function updatedata(UserId, body) {
  await repo.updatedata({ UserId: UserId }, body)

  // return show(Id)
}

async function UpdatePass(UserId, body) {
  await repo.UpdatePass({ UserId: UserId }, body)

  // return show(Id)
}





export default {
  create,
  index,
  show,
  update,
  destroy,
  showbyid,
  indexfind,
  indexxx,
  showww,
  updatedata,
  deleteRecorddata,
  UpdatePass
  
}
