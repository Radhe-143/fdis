import repo from './repository'

async function create(body) {
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

async function index2(id) {
  return repo.rawQueryListFilter(id)
}
async function index3(id) {
  return repo.filterPerformer(id)
}


export default {
  create,
  index,
  show,
  update,
  destroy,
  index2,
  index3,
}