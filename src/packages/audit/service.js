import repo from './repository'
import { commonLocale } from '../../locales'
import userClientRepo from '../userClient/repository'
import AuditSeq from './model';
import _ from 'lodash';

// Your code here

// import * as newPerformerModule from '../newPerformer/index'

// async function create(body) {
//   if (body.Presentdata && body.Presentdata.length) {
//     const created = await repo.create(body)

//     Promise.all(body.Presentdata.map(async (m) => {
//       const cate = await newPerformerModule.service.show(m)
//       if (cate) {
//         await cate.addElement(created, { through: { Audit_PerformerStatus: true } });

//         // Log the connection when Audit_PerformerStatus is true
//         console.log('Connection established:', cate, '->', created);
//       }
//       return true
//     }))

//     return created
//   }
//   return repo.create(body)
// }


// import * as newPerformerModule from '../newPerformer/index';

// async function create(body) {
//   if (body.newPerformerIds && body.newPerformerIds.length) {
//     const auditCode = Math.floor(100000 + Math.random() * 900000);

//     const existingAudit = await AuditSeq.findOne({
//       where: {
//         AuditCode: auditCode,
//       },
//     });

//     if (existingAudit) {
//       throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//     }

//     const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

//     console.log('Current time in India', currentTimeIST);

//     // Create a new audit record
//     const newAudit = await repo.create({
//       AuditCode: auditCode,
//       Date: currentTimeIST, // Use the formatted time
//       IsActive: body.IsActive,
//       IsDone: body.IsDone,
//       Type: body.Type,
//       NameClient_Id: body.NameClient_Id,
//       LocationClient_Id: body.LocationClient_Id,
//       Branch_Id: body.Branch_Id,
//       LastControlDate: currentTimeIST, // Use the formatted time
//       Activate: body.Activate,
//       createdAt: currentTimeIST, // Use the formatted time
//       updatedAt: currentTimeIST, // Use the formatted time
//     });

//     console.log('New Audit Data:', newAudit); // Log the data to the console

//     // Now, handle the connections with Presentdata
//     await Promise.all(body.newPerformerIds.map(async (m) => {
//       const cate = await newPerformerModule.service.show(m);
//       console.log("error hai" , cate)
//       if (cate) {
//         await cate.addAudits(newAudit, { through: { Audit_PerformerStatus: true } });
//         console.log('Connection established:', cate, '->', newAudit);
//       }
//       return true;
//     }));

//     return newAudit;
//   }
//   return repo.create(body);
// }


// Mutiple Performers selects //
import * as newPerformerModule from '../newPerformer/config';

async function create(body) {
  try {
    let newAudit;

    if (body.newPerformerIds && body.newPerformerIds.length) {
      // Create a new audit record
      newAudit = await repo.create(body);

      // Handle the connections with 'newPerformer'
      await Promise.all(body.newPerformerIds.map(async (m) => {
        // Assuming 'cate' is a Sequelize model, fetch it by ID
        const cate = await newPerformerModule.service.show(m);
        console.log("Fetched 'cate' record:", cate);

        if (cate) {
          // Assuming there is an association defined between 'cate' and 'newAudit'
          // Use the correct association method to associate them
          await cate.addAudit(newAudit, { through: { Audit_PerformerStatus: true } });
          console.log('Connection established between \'cate\' and \'newAudit\':', cate);
        }
      }));
    } else {
      // If there are no 'newPerformerIds', create the audit record directly
      newAudit = await repo.create(body);
    }

    return newAudit;
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error('Error occurred:', error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
}





async function update(id, body) {
  try {
    // Fetch the existing Audit data
    const data = await repo.findById(id);

    if (!data) {
      // Handle the case where the Audit data doesn't exist
      return null;
    }

    // Remove all existing associations (all newPerformerIds)
    data.setNewPerformers([]); // No need for await here

    // Update the Audit data with the new body
    await repo.updateOne({ Id: id }, body);

    // Create new associations (new newPerformerIds) using the provided body
    if (body.newPerformerIds) {
      const add = body.newPerformerIds;

      if (add.length) {
        await Promise.all(add.map(async (m) => {
          const cate = await newPerformerModule.service.show(m);
          console.log("Fetched 'cate' record:", cate);

          // Assuming there is an association defined between 'cate' and 'data'
          await cate.addAudit(data, { through: { Audit_PerformerStatus: true } });
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


// async function update(id, body) {
//   try {+
//     // Fetch the existing Audit data
//     const data = await repo.findById(id);

//     if (!data) {
//       // Handle the case where the Audit data doesn't exist
//       return null;
//     }

//     // Remove all existing associations (all newPerformerIds)
//     await data.setNewPerformers([]);

//     // Create new associations (new newPerformerIds) using the provided body
//     if (body.newPerformerIds) {
//       const add = body.newPerformerIds;

//       if (add.length) {
//         await Promise.all(add.map(async (m) => {
//           const cate = await newPerformerModule.service.show(m);
//           console.log("Fetched 'cate' record:", cate);

//           // Assuming there is an association defined between 'cate' and 'data'
//           await cate.addAudit(data, { through: { Audit_PerformerStatus: true } });
//           console.log("Added new data", cate);
//         }));
//       }
//     }

//     // Return the updated 'data' object
//     return data;
//   } catch (error) {
//     console.error('Error updating data:', error);
//     throw error;
//   }
// }





// async function update(id, body) {
//   await repo.updateOne({ Id: id }, body);

//   if (body.newPerformerIds) {
//     const dataBeforeUpdate = await show(id); // Fetch data before the update

//     const areaIdsBeforeUpdate = dataBeforeUpdate.newPerformer ? dataBeforeUpdate.newPerformer.map(m => m.Id) : [];
//     const add = _.difference(body.newPerformerIds, areaIdsBeforeUpdate);
//     const rem = _.difference(areaIdsBeforeUpdate, body.newPerformerIds);

//     if (add.length) {
//       await Promise.all(rem.map(async (m) => {
//         const cate = await newPerformerModule.service.show(m);
//         return cate.addAudit(dataBeforeUpdate, { through: { Audit_PerformerStatus: true } })
//       }));
//     }

//     if (rem.length) {
//       await Promise.all(add.map(async (m) => {
//         const cate = await newPerformerModule.service.show(m);
//         return cate.removeAudit(dataBeforeUpdate);
//       }));
//     }

//     // Fetch and return the updated data after the update
//     const dataAfterUpdate = await show(id);
//     return dataAfterUpdate;
//   }

//   // If body.newPerformerIds is not defined, just return the data without updating or auditing
//   return show(id);
// }






async function index(query) {
  return repo.findAll(query)
}

async function uploadImageById(id, imageBase64) {
  return repo.uploadImageById(id, imageBase64);
}


async function show(id) {
  return repo.findById(id)
}

async function destroy(id) {
  const Audit = await repo.findById(id)
  if (Audit && Audit.NewPerformers && Audit.NewPerformers.length) {
    Audit.NewPerformers.map(m => m.removeAudit(Audit))
  }
  return repo.destroy(id)
}

// async function destroy(id) {
//   try {
//     await repo.destroy(id); // Assuming "repo.destroy" is an asynchronous function
//     return { success: true, message: 'Record destroyed successfully' };
//   } catch (error) {
//     return { success: false, message: 'Error destroying record: ' + error.message };
//   }
// }



async function destroyAll() {
  return repo.destroyAll();
}



// async function destroy(id) {
//   const elementType = await repo.findById(id)
//   if (elementType && elementType.UserClient && elementType.UserClient.length) {
//     elementType.UserClient.map(m => m.removeCategory(elementType))
//   }
//   return repo.destroy(id)
// }

async function indexJoin(query) {
  return userClientRepo.findAllJoin(query)
}

async function locationbyclient(body) {
  return repo.findAllLocations(body)
}


async function findallaudit(query) {
  return repo.findallaudit(query)
}

async function indexx(id) {
  return repo.rawQueryList(id)
}

export default {
  create,
  index,
  indexx,
  show,
  update,
  destroy,
  destroyAll,
  indexJoin,
  locationbyclient,
  findallaudit,
  uploadImageById
}
