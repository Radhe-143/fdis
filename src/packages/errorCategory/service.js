/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(body) {

  const data = await repo.findOne({
    Name: body.Name,
  })
  console.log(data)
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
  const options = {
    ...query,
    order: [['Name', 'ASC']]
  };
  return repo.findAll(options);
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
