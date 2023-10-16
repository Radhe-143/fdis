/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(body) {
  const data = await repo.findOne({
    CompanyName: body.CompanyName.trim()
  })
  if (data) {
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }

  return repo.create(body)
}


// const create = async (body, imageFile) => {
//   const data = await repo.findOne({
//     CompanyName: body.CompanyName.trim(),
//   });
  
//   if (data) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//   }

//   let imageUrl = null;
//   if (imageFile) {
//     const s3UploadResult = await uploadToS3(imageFile.buffer);
//     imageUrl = s3UploadResult.Location;
//   }

//   const newUser = await repo.create({ ...body, imageUrl });
//   return newUser;
// };






async function UpdatePass(Id, body) {
  await repo.UpdatePassword({Id:Id}, body)

  // return show(Id)
}


async function update(Id, body) {
  await repo.updateOne({ Id: Id }, body)

  // return show(Id)
}

async function index(query) {
  return repo.rawQueryList(query)
}
async function indexx(query) {
  return repo.findAll(query)
}

// async function index(query) {
//   try {
//     const data = await repo.rawQueryList(query);
//     return data;
//   } catch (error) {
//     console.error('An error occurred while fetching the data:', error);
//     throw error;
//   }
// }

// index().catch((error) => {
//   // Handle any error that occurred during the execution
// });


async function show(id) {
  return repo.findById(id)
  
}

async function destroy(id) {
  return repo.destroy(id)
}

export default {
  create,
  index,
  show,
  update,
  UpdatePass,
  destroy,
  indexx
}
