import repo from './repository'
import { commonLocale } from '../../locales'
import { defaultMaxListeners } from 'winston-daily-rotate-file'
import AWS from 'aws-sdk';
import _ from 'lodash'
import * as userClientModule from '../userClient/index'
import AuditSeq from '../audit/model';
async function show(id) {
  return repo.findById(id)
}




async function update(UserId, body) {
  try {
    // Fetch the existing Audit data
    const data = await repo.findById(UserId);

    if (!data) {
      // Handle the case where the Audit data doesn't exist
      return null;
    }

    // Remove all existing associations (all newPerformerIds)
     data.setNewPerformerdata([]); // No need for await here

    // Update the Audit data with the new body
    await repo.updateOne({ UserId:UserId }, body);

    // Create new associations (new newPerformerIds) using the provided body
    if (body.UserClientIds) {
      const add = body.UserClientIds;

      if (add.length) {
        await Promise.all(add.map(async (m) => {
          const cate = await userClientModule.service.show(m);
          console.log("Fetched 'cate' record:", cate);

          // Assuming there is an association defined between 'cate' and 'data'
          await cate.addNewPerformers(data, { through: { PerformerClientStatus: true } });
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


         //  Working Update api //


// async function update(UserId, body) {
//   await repo.updateOne({ UserId: UserId }, body)
//   let data;
//   if (body.UserClientIds) {
//     data = await show(UserId); // Fetch data
//     const performerIds = data.UserClient ? data.UserClient.map(m => m.UserId) : [];
//     const add = _.difference(body.UserClientIds, performerIds);
//     const rem = _.difference(performerIds, body.UserClientIds)
//     if (rem.length) {
//       await Promise.all(rem.map(async (m) => {
//         const cate = await userClientModule.service.show(m);
//         console.log("Fetched 'cate' record:")
//         // Assuming there is an association defined between 'cate' and 'data'
//         await cate.removeNewPerformers(data);
//         console.log("Removed old data", cate)
//       }))
//     }

//     if (add.length) {
//       await Promise.all(add.map(async (m) => {
//         const cate = await userClientModule.service.show(m);
//         console.log("Fetched 'cate' record:", cate);
//         // Assuming there is an association defined between 'cate' and 'data'
//         await cate.addNewPerformers(data, { through: { PerformerClientStatus: true } });
//         console.log("Removed old data", cate)
//       }))
//     }
//   }
//   // Return the updated 'data' object after all operations
//   return data;


// }

// async function update(UserId, body) {
//   let data;
//   // Remove all existing associations (all newPerformerIds)
//   data.setNewPerformerdata([]);

//   await repo.updateOne({ UserId: UserId }, body);
  
//   if (body.UserClientIds) {
//     data = await show(UserId); // Fetch data
//     const performerIds = data.UserClient ? data.UserClient.map(m => m.UserId) : [];
//     const add = _.difference(body.UserClientIds, performerIds);
//     const rem = _.difference(performerIds, body.UserClientIds);

//     if (rem.length) {
//       await Promise.all(rem.map(async (m) => {
//         const cate = await userClientModule.service.show(m);
//         console.log("Fetched 'cate' record:");
//         // Assuming there is an association defined between 'cate' and 'data'
//         await cate.removeNewPerformers(data);
//         console.log("Removed old data", cate);
//       }));
//     }

//     if (add.length) {
//       await Promise.all(add.map(async (m) => {
//         const cate = await userClientModule.service.show(m);
//         console.log("Fetched 'cate' record:", cate);
//         // Assuming there is an association defined between 'cate' and 'data'
//         await cate.addNewPerformers(data, { through: { PerformerClientStatus: true } });
//         console.log("Added new data", cate);
//       }));
//     }
//   }
  
//   // Return the updated 'data' object after all operations
//   return data;
// }




// service.js
async function UpdatePass(UserId, body) {
  await repo.UpdatePassword({ UserId: UserId }, body);

}


async function indexx(query) {
  return repo.findAll(query)
}

//Find data
async function index(query) {
  return repo.rawQueryList(query)
}

// async function destroy(id) {
//   console.log("id",id)
//   const newPerformer = await repo.findById(id)
//   if ( newPerformer && newPerformer.NewPerformerdata && newPerformer.NewPerformerdata.length) {
//     newPerformer.NewPerformerdata.map(m => m.removeNewPerformers(newPerformer))
//   }
//   return repo.destroy(id)
// }

async function destroy(id) {
  try {
    // Fetch the newPerformer data
    const newPerformer = await repo.findById(id);

    if (!newPerformer) {
      // Handle the case where the newPerformer data doesn't exist
      return null;
    }

    // Remove all associated NewPerformerdata records
    if (newPerformer.NewPerformerdata && newPerformer.NewPerformerdata.length) {
      await Promise.all(newPerformer.NewPerformerdata.map(async (m) => {
        console.log("Deleting 'NewPerformerdata' record:", m);

        // Assuming there is an association defined between 'm' and 'newPerformer'
        await m.removeNewPerformers(newPerformer);

        console.log("Deleted 'NewPerformerdata' record", m);
      }));
    }

    // Delete the newPerformer data from 'repo'
    await repo.destroy(id);

    // Return a success message or null if needed
    return 'Data deleted successfully';
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}





// async function create(body) {

//     if (body.UserClientIds && body.UserClientIds.length) {
//       const performer = await repo.create(body);

//       Promise.all(body.UserClientIds.map(async (m) => {
//         const cate = await userClientModule.service.show(m);
//         console.log("Fetched 'cate record:", cate);
//         if (cate) {
//           await cate.addNewPerformers(performer, { through: { PerformerClientStatus: true } });
//           console.log('Connection established between \'cate', cate);
//         }
//       }));
//       return performer;
//     } 
//     return repo.create(body)
//   } 


async function create(body) {
  try {
    let Performerdata;

    if (body.UserClientIds && body.UserClientIds.length) {
      // Create a new Performerdata record
      Performerdata = await repo.create(body);

      // Handle the connections with 'cate'
      await Promise.all(body.UserClientIds.map(async (m) => {
        // Assuming 'cate' is a Sequelize model, fetch it by ID
        const cate = await userClientModule.service.show(m);
        console.log("Fetched 'cate' record:", cate);

        if (cate) {
          // Assuming there is an association defined between 'cate' and 'Performerdata'
          // Use the correct association method to associate them
          await cate.addNewPerformers(Performerdata, { through: { PerformerClientStatus: true } });
          console.log('Connection established between \'cate\' and \'Performerdata\':', cate);
        }
      }));
    } else {
      // If there are no 'UserClientIds', create the Performerdata record directly
      Performerdata = await repo.create(body);
    }

    return Performerdata;
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error('Error occurred:', error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
}


// async function create(body) {
//   if (body.UserClientIds && body.UserClientIds.length) {
//     const created = await repo.create(body)

//     await Promise.all(body.UserClientIds.map(async (m) => {
//       const cate = await userClientModule.service.show(m)
//       if (cate) { cate.addNewPerformers(created, { through: { PerformerClientStatus: true } }) }
//       return true
//     }))

//     return created
//   }

//   return repo.create(body)
// }




// async function create(body){
//   return repo.create(body)
// }


export default {
  show,
  update,
  UpdatePass,
  indexx,
  index,
  destroy,
  create
}

import { Op } from 'sequelize';


const queryBuilderGetList = (request = {}) => {
  const where = {
    [Op.and]: [],
  };

  if (request.ID) {
    where.ID = request.ID;
  }

  if (request.active !== undefined) {
    where.IsAnonymous = request.active;
  }

  // if (request.ucUserId) {
  //   const result = async (ucUserId) => {
  //     const IdPerformer= ucUserId;
  //     const raw = ` select IdPerformerClient from PerformerClientLink 
  //     where IdPerformer = '${ucUserId}' `
  //     return AuditSeq.sequelize.query(raw, {
  //       replacements: [IdPerformer],
  //       type: sequelize.QueryTypes.SELECT
  //     })
  //   }
  // }

  if (request.ignoreIds !== undefined) {
    if (request.ignoreIds.includes(',')) {
      where.ID = {
        [Op.notIn]: request.ignoreIds
          .split(',')
          .map((m) => m.trim())
          .filter((f) => f),
      };
    } else {
      where.ID = {
        [Op.notIn]: [request.ignoreIds],
      };
    }
  }

  if (request.search) {
    const searchQuery = {
      [Op.or]: [
        {
          CategoryName: {
            [Op.like]: `%${request.search}%`,
          },
        },
      ],
    };
    where[Op.and].push(searchQuery);
  }

  return where;
};

export { queryBuilderGetList };
