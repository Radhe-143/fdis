/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'



// async function show(id) {
//   return repo.rawID(id)
// }
async function index(query) {
  return repo.findAll(query)
}

async function index5(query,body,body2,body3){
  return repo.getfeedback(query,body,body2,body3)
}



async function create(query,body) {
  return repo.create(query,body)
}

async function feedBack(body) {
  return repo.feedBack(body)
}


async function show(id) {
  return repo.findById(id)
}



async function findAllJoin(query) {
  return repo.findAllJoin(query)
}

async function feedback(query,body) {
  return repo.feedback(query,body)
}








// async function showbyid(id)
// {
//   return repo.findAllByRole(id)
// }

export default {
  index,
  findAllJoin,
  feedback,
  show,
  create,
  feedBack,
  index5
  }
