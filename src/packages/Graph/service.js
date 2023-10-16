/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function index(query) {
  return repo.findAll(query)
}

async function index01(query) {
  return repo.find(query)
}

async function index02(query) {
  return repo.findError(query)
}

async function index05(query) {
  return repo.findaudit(query)
}

async function findErrorkind(query) {
  return repo.findErrorkind(query)
}

async function getLastSixAudit(query) {
  return repo.getLastSixAudit(query)
}




export default {
  index,
  index01,
  index02,
  index05,
  findErrorkind,
  getLastSixAudit


  }
