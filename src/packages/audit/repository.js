
import { AuditSeq, UserClientSeq, BuildingSeq, BranchSeq , newperformerseq} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import { Sequelize } from 'sequelize';
// import multer from 'multer';

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "imageszz"); // Set your upload destination
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`;
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage: storage }).single('image'); // Use .single for one file

// // Other repository functions...

// async function uploadImageById(id, req, res) {
//   const auditRecord = await AuditSeq.findByPk(id);

//   if (!auditRecord) {
//     throw new Error('Audit record not found');
//   }

//   // Use the upload middleware to handle the image upload
//   return new Promise((resolve, reject) => {
//     upload(req, res, async function (err) {
//       if (err) {
//         console.error('Error uploading image:', err);
//         // Handle upload error
//         reject(err);
//       } else {
//         // Image upload successful, update ImagePath and save the record
//         const uploadedImage = `${id}-image.${fileExt}`; // Adjust file extension
//         auditRecord.ImagePath = uploadedImage;
//         await auditRecord.save();
//         resolve(auditRecord);
//       }
//     });
//   });
  
// }


import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Set your upload destination
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${ext}`; // Remove fieldname from filename
    cb(null, filename);
  }
});

const upload = multer({ storage: storage }).single('image'); // Use .single for one file

// Other repository functions...

async function uploadImageById(id, req, res) { // Accept req and res as parameters
  const auditRecord = await AuditSeq.findByPk(id);

  if (!auditRecord) {
    throw new Error('Audit record not found');
  }

  // Use the upload middleware to handle the image upload
  return new Promise((resolve, reject) => {
    upload(req, res, async function (err) {
      if (err) {
        console.error('Error uploading image:', err);
        // Handle upload error
        reject(err);
      } else {
        // Image upload successful, update ImagePath and save the record
        const uploadedImage = req.file.filename; // Use the generated filename from multer
        auditRecord.ImagePath = uploadedImage;
        await auditRecord.save();
        resolve(auditRecord);
      }
    });
  });
}






// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/img'); // Set your upload destination
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`;
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage: storage }).single('image'); // Use .single for one file

// // Other repository functions...

// async function uploadImageById(id, imageBase64) {
//   const [error, data] = await(AuditSeq.findByPk(id));
  
//   if (error) {
//     throw error;
//   }

//   if (!data) {
//     throw new Error('Audit record not found');
//   }

//   // Use the upload middleware to handle the image upload
//   upload(req, res, async function (err) {
//     if (err) {
//       console.error('Error uploading image:', err);
//       // Handle upload error
//       throw err;
//     } else {
//       // Upload successful, update ImagePath and save the record
//       const uploadedImage = `${id}-image.${fileExt}`; // Adjust file extension
//       data.ImagePath = uploadedImage;
//       await data.save();
//     }
//   });

//   return data;
// }


async function findById(id) {
  return AuditSeq.findByPk(id, {
    include: [
      'NewPerformers',
      {
        model: UserClientSeq,
        as: 'Users_Client',
        include: [
          'Country',
          {
            model: BranchSeq, // Assuming you have a BranchSeq model defined
            as: 'Branch' // Make sure to use the correct alias if you defined one
          },
          'User'
        ]
      },
      'Location'
    ]
  });
}

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = undefined;

//   return AuditSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     order: [['AuditCode', 'ASC']],
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'Users_Client',
//         include: ['Country', 'Branch','User']
//       },
//       {
//         model: BuildingSeq,
//         as: 'Location',
//         where: request.locationId ? { Id: request.locationId } : {}
//       },
      
//     ]
//   });
// };


const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  console.log("condition is ",condition)
  const option = listInitOptions(request)
  option.raw = undefined
  return AuditSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    },
    include: [
             {
        model: UserClientSeq,
        as: 'Users_Client',
        include: [
          'Country',
          {
            model: BranchSeq,
            as: 'Branch'
          },
          'User'
        ]
      },
      'Location',
     

      'NewPerformers'
      ]
  })
}

//             // Find all method // 

// const findAll = async (request) => {
//   return AuditSeq.findAndCountAll({
    
//     order: [['AuditCode', 'ASC']],
//     include: ['NewPerformers','Users_Client','Branches','Location','NewPerformer']
//   });
// };


// const findAll = async (request) => {
//   return AuditSeq.findAndCountAll({
//     order: [['AuditCode', 'ASC']],
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'Users_Client',
//         include: [
//           'Country',
//           {
//             model: BranchSeq,
//             as: 'Branch'
//           },
//           'User'
//         ]
//       },
//       'Location',
     

//       'NewPerformers'

      


//     ],
//   });
// };






       //  Working Find by ID //

// async function findById(id) {
//   return AuditSeq.findByPk(id, {
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'Users_Client',
//         include: ['Country', 'Branch']
//       },
//       {
//         model: BuildingSeq,
//         as: 'Location'
//       },
//       {
//         model: newperformerseq,
//         as: 'NewPerformer'
//       },
//       {
//       include:['NewPerformers']
//       }
//     ]
//   });
// }

async function findOne(query) {
  return AuditSeq.findOne({
    where: {
      ...query
    }
  });
}

// async function create(body) {
//   const  AuditCode =  Math.floor(100000 + Math.random() * 900000);
//   const data = await findOne({
//     AuditCode: AuditCode,
//   })
//   if (data) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
//   }
//   const raw =  `INSERT INTO [dbo].[Audits]([AuditCode],[Date],[IsActive] ,[IsDone] ,[Type] ,[NameClient_Id] ,[LocationClient_Id],[PresentClient] ,[LastControlDate],[Activate])
//   VALUES
//   (${AuditCode}
//   ,'${body.Date}'
//   ,${body.IsActive}
//   ,${body.IsDone}
//   ,'${body.Type}'
//   ,'${body.NameClient_Id}'
//   ,'${body.LocationClient_Id}'
//   ,'${body.PresentClient}'
//   ,'${body.LastControlDate}'
//   ,${body.Activate}
//   )`
//    return AuditSeq.sequelize.query(raw, {
//     replacements:[''],
//     type: Sequelize.QueryTypes.INSERT
//    })
// }


                 // Working Api//
// async function create(body) {
//   const auditCode = Math.floor(100000 + Math.random() * 900000);
//   const data = await AuditSeq.findOne({
//     where: {
//       AuditCode: auditCode,
//     },
//   });
//   if (data) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//   }
//   const newAudit = await AuditSeq.create({
//     AuditCode: auditCode,
//     Date: body.Date,
//     IsActive: body.IsActive,
//     IsDone: body.IsDone,
//     Type: body.Type,
//     NameClient_Id: body.NameClient_Id,
//     LocationClient_Id: body.LocationClient_Id,
//     Branch_Id:body.Branch_Id,
//     PresentClient: body.PresentClient,
//     LastControlDate: body.LastControlDate,
//     Activate: body.Activate,
//   });
//   return newAudit;
// }

// async function create(body) {
//   const auditCode = Math.floor(100000 + Math.random() * 900000);
//   const existingAudit = await AuditSeq.findOne({
//     where: {
//       AuditCode: auditCode,
//     },
//   });

//   if (existingAudit) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//   }

//   // const currentTimeIST = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
// const currentTimeIST = moment().tz('America/New_York').format();
// console.log('Current time in USA',currentTimeIST);



//   // Create a new audit record
//   const newAudit = await AuditSeq.bulkCreate([{
//     AuditCode: auditCode,
//     Date: currentTimeIST,
//     IsActive: body.IsActive,
//     IsDone: body.IsDone,
//     Type: body.Type,
//     NameClient_Id: body.NameClient_Id,
//     LocationClient_Id: body.LocationClient_Id,
//     Branch_Id: body.Branch_Id,
//     PresentClient: body.PresentClient,
//     LastControlDate: currentTimeIST,
//     Activate: body.Activate,
//     createdAt: currentTimeIST,
//     updatedAt: currentTimeIST,
//   }]);

//   console.log('New Audit Data:', newAudit); // Log the data to the console

//   return newAudit;
// }

// import * as newPerformerModule from '../newPerformer/index';

// async function create(body) {
//   try {
//     // Generate a random audit code
//     const auditCode = Math.floor(100000 + Math.random() * 900000);

//     // Check if an audit with the generated code already exists
//     const existingAudit = await AuditSeq.findOne({
//       where: {
//         AuditCode: auditCode,
//       },
//     });

//     if (existingAudit) {
//       throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//     }

//     // Get the current time in India (IST)
//     const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

//     console.log('Current time in India', currentTimeIST);

//     // Create a new audit record using a combination of generated and provided data
//     const newAudit = await AuditSeq.create({
//       AuditCode: auditCode,
//       Date: currentTimeIST,
//       IsActive: body.IsActive,
//       IsDone: body.IsDone,
//       Type: body.Type,
//       NameClient_Id: body.NameClient_Id,
//       LocationClient_Id: body.LocationClient_Id,
//       Branch_Id: body.Branch_Id,
//       PresentClient: body.PresentClient,
//       LastControlDate: currentTimeIST,
//       Activate: body.Activate,
//       createdAt: currentTimeIST,
//       updatedAt: currentTimeIST,
//     });

//     if (body.PresentClient && body.PresentClient.length) {
//       await Promise.all(body.PresentClient.map(async (m) => {
//         const cate = await newPerformerModule.service.show(m);
//         if (cate) {
//           // Associate the newly created audit record with the new performer
//           await cate.addElement(newAudit, { through: { Audit_PerformerStatus: true } });
//           console.log("cate",cate)
//         }
//       }));
//     }

//     console.log('New Audit Data:', newAudit); // Log the data to the console
//     return newAudit;
//   } catch (error) {
//     console.error('Error in create:', error);
//     throw error; // Rethrow the error for higher-level handling
//   }
// }
              

                    // Working API // 

// async function create(body) {
//   const auditCode = Math.floor(100000 + Math.random() * 900000);
//   const existingAudit = await AuditSeq.findOne({
//     where: {
//       AuditCode: auditCode,
//     },
//   });

//   if (existingAudit) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//   }

//   const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

//   console.log('Current time in India', currentTimeIST);

//   // Create a new audit record
//   const newAudit = await AuditSeq.create({
//     AuditCode: auditCode,
//     Date: currentTimeIST, // Use the formatted time
//     IsActive: body.IsActive,
//     IsDone: body.IsDone,
//     Type: body.Type,
//     NameClient_Id: body.NameClient_Id,
//     LocationClient_Id: body.LocationClient_Id,
//     Branch_Id: body.Branch_Id,
//     LastControlDate: currentTimeIST, // Use the formatted time
//     Activate: body.Activate,
//     createdAt: currentTimeIST, // Use the formatted time
//     updatedAt: currentTimeIST, // Use the formatted time
//   });

//   console.log('New Audit Data:', newAudit); // Log the data to the console
//   return newAudit;
// }




async function create(body) {
  // Generate a random audit code
  const auditCode = Math.floor(100000 + Math.random() * 900000);

  // Get the current date and time
  const currentDate = new Date();

  // Add 'AuditCode' and 'Date' to the 'body' object
  body.AuditCode = auditCode;
  body.Date = currentDate;

  // Create the new audit record with the updated 'body'
  return AuditSeq.create(body);
}






async function updateOne(query, body) {
  try {
    const [rowsUpdated, updatedRows] = await AuditSeq.update(body, {
      where: { ...query },
      returning: true, // This option returns the updated rows
    });

    if (rowsUpdated === 0) {
      console.log('No rows were updated.');
    } else {
      console.log(`${rowsUpdated} row(s) were updated.`);
      console.log('Updated rows:', updatedRows);
    }

    return rowsUpdated;
  } catch (error) {
    console.error('Error updating records:', error);
    throw error;
  }
}



// async function updateOne(query, body) {
//   return AuditSeq.update(body, { where: { ...query } })
// }




  // also correct the code

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return AuditSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes:
//     {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: [
//       {
//       model: UserClientSeq,
//       as: 'UserClient',
//       include: ['Country', 'Branch']
//       }, {
//       model: BuildingSeq,
//       as: 'Location',
//       where: request.locationId ? {
//         Id: request.locationId
//       } : {}
//     }]
//   })
// }


// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = undefined;

//   return AuditSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     order:['AuditCode','ASC'],
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'Users_Client', // Use the correct alias here
//         include: ['Country', 'Branch']
//       },
//       {
//         model: BuildingSeq,
//         as: 'Location',
//         where: request.locationId ? { Id: request.locationId } : {}
//       },
//       {
//         model:BranchSeq,
//         as:'Branches',
//         where: request.Branch_id ? { Id: request.Branch_id } : {}
//       }
//     ]
//   });
// };z





// const findAll = async (request, response) => {
//   try {
//     const condition = queryBuilderGetList(request);
//     const option = listInitOptions(request);
//     option.raw = undefined;
  
//     const result = await AuditSeq.findAndCountAll({
//       where: condition,
//       ...option,
//       attributes: {
//         exclude: request.excludes,
//         include: request.includes
//       },
//       include: [
//         {
//           model: UserClientSeq,
//           as: 'UserClient',
//           include: ['Country', 'Branch']
//         },
//         {
//           model: BuildingSeq,
//           as: 'Location',
//           where: request.locationId ? {
//             Id: request.locationId
//           } : {}
//         }
//       ]
//     });
  
//     response.status(200).json(result);
//   } catch (error) {
//     response.status(500).json({ error: 'An error occurred' });
//   }
// };


async function countDocuments(query) {
  return AuditSeq.count(query)
}

// const destroy = async (Id) => {
//   const raw =
//     `Delete from Audits where id ='${Id}';
//   `
//   return AuditSeq.sequelize.query(raw, {
//     replacements: [Id],
//     type: Sequelize.QueryTypes.DELETE
//   })
// }

// const destroy = async (Id) => {
//   const query = `DELETE FROM Audits WHERE id = :id`;
//   return AuditSeq.sequelize.query(query, {
//     replacements: { id: Id },
//     type: Sequelize.QueryTypes.DELETE
//   });
// };

// const destroy = async (Id) => {
//   const query = `DELETE FROM Audits WHERE id = :id`;
//   const result = await AuditSeq.sequelize.query(query, {
//     replacements: { id: Id },
//     type: Sequelize.QueryTypes.DELETE
//   });

//   if (result[0].affectedRows > 0) {
//     console.log(`Deleted record with ID: ${Id}`);
//   } else {
//     console.log(`No record found with ID: ${Id}`);
//   }

//   return result;
// };


// const destroy = async (id) => {
//   return AuditSeq.destroy({ where: { Id: id } })

// }

// const destroy = async (id) => {
//   const deletedCount = await AuditSeq.destroy({ where: { Id: id } });
  
//   if (deletedCount > 0) {
//     console.log(`Data with id ${id} has been deleted.`);
//   } else {
//     console.log(`No data found with id ${id}.`);
//   }
  
//   return deletedCount;
// };


// const destroy = async (id) => {
//   const deletedCount = await AuditSeq.destroy({ where: { Id: id } });
  
//   if (deletedCount > 0) {
//     console.log(`Data with id ${id} has been deleted.`);
//   } else {
//     console.log(`No data found with id ${id}.`);
//   }
  
//   return deletedCount;
// };

const destroy= async(id)=>{
  return AuditSeq.destroy({where:{Id:id}})
}


const destroyAll = async () => {
  const deletedCount = await AuditSeq.destroy();

  if (deletedCount > 0) {
    console.log(`All data has been deleted.`);
  } else {
    console.log(`No data found to delete.`);
  }

  return deletedCount;
};




const findAllLocations = async (body) => {
  console.log(body)
  const id = body.id;
  const raw =
    `SELECT  [Id]
      ,[Name]
      ,[Size]
      ,[ClientId]
      ,[Region]
      ,[City]
      ,[Address]
      ,[ContactPerson]
      ,[Activate]
      ,[Email] FROM [fdis].[dbo].[Buildings] WHERE ClientId=${id}`

  return AuditSeq.sequelize.query(raw, {
    replacements: [Id], // Pass the value as an array
    type: Sequelize.QueryTypes.DELETE
  });
}

async function findallaudit(query) {
  const raw = `
    SELECT AuditCode, Date, IsActive, IsDone, Type, NameClient_Id, LocationClient_Id, PresentClient, LastControlDate, Activate, Branch_Id
    FROM Audits
  `
  return AuditSeq.sequelize.query(raw, { 
    type: Sequelize.QueryTypes.SELECT
  })
}


const rawQueryList = async (Id) => {
  const rawQuery = `
  SELECT *
  FROM Audits AS A
  LEFT JOIN FormErrorElement1 AS FORM ON A.Id = FORM.ErrorElementId.FormId;
  `;

  const replacements = { Id };

  try {
    const results = await AuditSeq.sequelize.query(rawQuery, {
      replacements,
      type: Sequelize.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};



export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  destroyAll,
  findAllLocations,
  findallaudit,
  uploadImageById,
  rawQueryList
};
