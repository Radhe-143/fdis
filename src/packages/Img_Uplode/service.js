/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'


async function uploadImage(file) {
  return repo.uplode(file)
}

async function updateImage(Id,file) {
  return repo.updateImage(Id,file)
}



export default {
  uploadImage,
  updateImage,
  
}
