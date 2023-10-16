/* eslint-disable no-await-in-loop */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import repo from './repository'
import { commonLocale } from '../../locales'
import * as areaDescModule from '../areaDescription'

async function create(body) {
  const data = await repo.findOne({
    ElementTypeValue: body.ElementTypeValue,
  })
  if (data) {
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }

  if (body.AreaDescriptionIds && body.AreaDescriptionIds.length) {
    const created = await repo.create(body)
    Promise.all(body.AreaDescriptionIds.map(async (m) => {
      const areaDesc = await areaDescModule.service.show(m)
      if (areaDesc) { areaDesc.addElementType(created, { through: { AreaDescModuleId: areaDesc.ModuleId } }) }
      return true
    }))

    return created
  }

  return repo.create(body)
}

async function update(id, body) {
  await repo.updateOne({ ElementTypeId: id }, body)


  if (body.AreaDescriptionIds) {
    const data = await show(id)
    const areaIds = data.AreaDescription.map(m => m.Id)
    const add = _.difference(body.AreaDescriptionIds, areaIds)
    const rem = _.difference(areaIds, body.AreaDescriptionIds)
    if (add) {
      Promise.all(add.map(async (m) => {
        const areaDesc = await areaDescModule.service.show(m)
        return areaDesc.addElementType(data, { through: { AreaDescModuleId: areaDesc.ModuleId } })
      }))
    }
    if (rem) {
      Promise.all(rem.map(async (m) => {
        const areaDesc = await areaDescModule.service.show(m)
        return areaDesc.removeElementType(data, { through: { AreaDescModuleId: areaDesc.ModuleId } })
      }))
    }
    return data
  }

  return show(id)
}

async function index(query) {
  return repo.findAll(query)
}

async function show(id) {
  return repo.findById(id)
}

async function destroy(id) {
  const elementType = await repo.findById(id)
  if (elementType && elementType.AreaDescription && elementType.AreaDescription.length) {
    elementType.AreaDescription.map(m => m.removeElementType(elementType))
  }
  return repo.destroy(id)
}

export default {
  create,
  index,
  show,
  update,
  destroy
}
