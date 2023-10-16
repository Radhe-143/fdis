/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(body) {
  console.log(body)
  const data = await repo.findOne({
    FloorName: body.FloorName,
  })
  if (data) {
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }

  return repo.create(body)
}

async function update(id, body) {
  await repo.updateOne({ Id: id }, body)
  return show(id)
}

async function index(query) {
  return repo.findAll(query)
}

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
  destroy
}
