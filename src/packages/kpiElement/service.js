/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash'
import repo from './repository'
import { commonLocale } from '../../locales'
import * as userClientModule from '../userClient/index'

async function create(body) {
  if (body.UserClientIds && body.UserClientIds.length) {
    const created = await repo.create(body)

    Promise.all(body.UserClientIds.map(async (m) => {
      const cate = await userClientModule.service.show(m)
      if (cate) { cate.addElement(created, { through: { ElementClientStatus: true } }) }
      return true
    }))

    return created
  }

  return repo.create(body)
}


// async function create(body) {
//   if (body.UserClientIds && body.UserClientIds.length) {
//     const created = await repo.create(body)

//     await Promise.all(body.UserClientIds.map(async (m) => {
//       const cate = await userClientModule.service.show(m)
//       if (cate) { 
//         await cate.addElement(created, { through: { ElementClientStatus: true } }) 
//       }
//       return true
//     }))

//     return created
//   }

//   return repo.create(body)
// }
 

        // Working multiple update //

// async function update(id, body) {
//   await repo.updateOne({ Id: id }, body)

//   if (body.UserClientIds) {
//     const data = await show(id)
//     const areaIds = data.UserClient ? data.UserClient.map(m => m.Id) : []
//     const add = _.difference(body.UserClientIds, areaIds)
//     const rem = _.difference(areaIds, body.UserClientIds)
//     if (add.length) {
//       Promise.all(add.map(async (m) => {
//         const cate = await userClientModule.service.show(m)
//         return cate.addElement(data, { through: { ElementClientStatus: true } })
//       }))
//     }
//     if (rem.length) {
//       Promise.all(rem.map(async (m) => {
//         const cate = await userClientModule.service.show(m)
//         return cate.removeElement(data)
//       }))
//     }
//     return data
//   }

//   return show(id)
// }


async function update(id, body) {
  try {
    // Fetch the existing Audit data
    const data = await repo.findById(id);

    if (!data) {
      // Handle the case where the Audit data doesn't exist
      return null;
    }

    // Remove all existing associations (all newPerformerIds)
    data.setUserClient([]); // No need for await here

    // Update the Audit data with the new body
    await repo.updateOne({ Id: id }, body);

    // Create new associations (new newPerformerIds) using the provided body
    if (body.UserClientIds) {
      const add = body.UserClientIds;

      if (add.length) {
        await Promise.all(add.map(async (m) => {
          const cate = await userClientModule.service.show(m);
          console.log("Fetched 'cate' record:", cate);

          // Assuming there is an association defined between 'cate' and 'data'
          await cate.addElement(data, { through: { ElementClientStatus: true } })
          console.log("Added new data", cate);
        }));
      }
    }

    // Return the updated 'data' object
    return data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}




async function index(query) {
  return repo.findAll(query)
}

async function show(id) {
  return repo.findById(id)
}

async function destroy(id) {
  const elementType = await repo.findById(id)
  if (elementType && elementType.UserClient && elementType.UserClient.length) {
    elementType.UserClient.map(m => m.removeElement(elementType))
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
