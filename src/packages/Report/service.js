/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'
import { query } from 'express'

async function index(query) {
  return repo.findAll(query)
}
async function show(id) {
  return repo.findById(id)
}
async function filter(query) {
  return repo.filter(query)
}

export default {
  show,
  index,
  filter,
 
  
}
