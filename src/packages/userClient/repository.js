import { Sequelize } from 'sequelize';
import { UserClientSeq, AuditSeq,BranchSeq,UserSeq ,BuildingSeq, CountrySeq,Modules} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import method from './method'
import bcrypt from 'bcrypt';


async function findById(id) {
  return UserClientSeq.findByPk(id, {
    include: ['Country', 'Branch', 'User'],
  })
}



async function findOne(query) {
  return UserClientSeq.findOne({
    where: {
      ...query
    }
  });
}



// const multer = require('multer')

// const fs = require('fs')
// const path = require('path');
// const { uploadFile, getFileStream } = require('./s3Uploader')

// const create = async(file)=>{
//    const fileStream = fs.createReadStream(file.path)
//    const file_original = file.originalname
//    const Extention=path.extname(file_original);
//    const Mimetype=file.mimetype;
//    const ImageDataLocation=file.filename+`${Extention}`
//    const uplode = await uploadFile(file)
//    const raw=`INSERT INTO [dbo].[Users_Client]([CompanyName],[ContactPerson],[Phone],[Mobile],[Fax],[StreetName],[ZipCode],[City],[Password],[State],[CountryId],[Branch_Id],[User_Id],[ClientId],[URLClientPortal],[ReportType],[image],[ImageDataLocation].[Mimetype])VALUES
//     ('${CompanyName}','${ContactPerson}','${Phone}','${Mobile}','${Fax}','${StreetName}','${ZipCode}','${City}','${Password}','${State}','${CountryId}','${Branch_Id}','${User_Id}','${ClientId}','${URLClientPortal}','${ReportType}','${image}','${ImageDataLocation}','${Mimetype}')`;
//    const resoonse =  await UserClientSeq.sequelize.query(raw, {
//     replacements:[''],
//     type: Sequelize.QueryTypes.INSERT
//    })
//    return resoonse
//   }

// const fs = require('fs');
// const path = require('path');
// const { uploadFile } = require('./s3Uploader');

// const create = async (file) => {
//   try {
//     const fileStream = fs.createReadStream(file.path);
//     const file_original = file.originalname;
//     const Extension = path.extname(file_original);z
//     const Mimetype = file.mimetype;
//     const ImageDataLocation = file.filename + Extension;

//     // Upload the image to S3 and get the S3 location
//     const ImageS3Location = await uploadFile(file);

//     // Insert into the database
//     const raw = `
//       INSERT INTO [dbo].[Users_Client]
//       ([CompanyName], [ContactPerson], [Phone], [Mobile], [Fax], [StreetName], [ZipCode], [City], [Password], [State], [CountryId], [Branch_Id], [User_Id], [ClientId], [URLClientPortal], [ReportType], [image], [ImageDataLocation], [ImageMimeType])
//       VALUES
//       (:CompanyName, :ContactPerson, :Phone, :Mobile, :Fax, :StreetName, :ZipCode, :City, :Password, :State, :CountryId, :Branch_Id, :User_Id, :ClientId, :URLClientPortal, :ReportType, :image, :ImageDataLocation, :ImageMimeType)
//     `;

//     await UserClientSeq.sequelize.query(raw, {
//       replacements,
//       type: Sequelize.QueryTypes.INSERT
//     });


//     // Delete the uploaded file from the server after insertion
//     fs.unlinkSync(file.path);

//     return 'User created and inserted successfully';
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
  
// };



// async function create(body) {
//   return (await UserClientSeq.create(body)).get({ plain: true })
// }


//       // with hash the password
// async function create(body,file) {
//   try {
//     // Hash the password
//     body.Password = await method.hashPassword(body.Password);

//     // Create the user with the hashed password
//     const newUser = await UserClientSeq.create(body);

//     // Get the plain object representation of the created user
//     const newUserPlain = newUser.get({ plain: true });

//     return newUserPlain;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// }



 //  Working api // 

async function create(body) {
  try {
    // Create the user without hashing the password
    const newUser = await UserClientSeq.create(body);

    // Get the plain object representation of the created user
    const newUserPlain = newUser.get({ plain: true });

    return newUserPlain;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

 // Adjust the path to your S3 uploader


// async function create(body, file) {
//   try {
//     // Upload the image to S3 using the s3Uploader
//     const ImageS3Location = await s3Upload.uploadToS3(file); // Use the file.buffer for actual file data

//     // Create the user without hashing the password and including the image location
//     const newUser = await UserClientSeq.create({
//       ...body,
//       ImageS3Location, // Use the S3 image location
//     });

//     // Get the plain object representation of the created user
//     const newUserPlain = newUser.get({ plain: true });

//     return newUserPlain;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// }







async function updateOne(query, body) {
  return UserClientSeq.update(body, { where: { ...query } })
}

//      // Update Password//
// const UpdatePassword = async (Id, body) => {
//   console.log(UpdatePassword)
//   try {
//     // Hash the new password
//     const hashedPassword = await method.hashPassword(body.Password);
//     console.log("Hashed Password:", hashedPassword);
//     // Find the user by Id
//     const user = await UserClientSeq.findOne(Id);
//        console.log("User found:", user);
//     if (user) {
//       // Update the user's password
//       user.Password = hashedPassword;
//       await user.save();

//       return user;
//     } else {
//       throw new Error(`User with Id ${Id} not found.`);
//     }
//   } catch (error) {
//     console.error('Error updating password:', error);
//     throw error;
//   }
// };

// const UpdatePassword = async (Id, body) => {
//   try {
//     // Find the user by Id with a where condition
//     const user = await UserClientSeq.findOne({
//       where: { Id: Id } // Use { Id: Id } to define the where condition
//     });
    
//     if (user) {
//       // Update the user's password
//       user.Password = body.Password;
//       await user.save();

//       return user;
//     } else {
//       throw new Error(`User with Id ${Id} not found.`);
//     }
//   } catch (error) {
//     console.error('Error updating password:', error);
//     throw error;
//   }
// };


               // also working // 
// async function UpdatePassword(query, body) {
//   return UserClientSeq.update(body, { where: { ...query } })
// }

         // working api

async function UpdatePassword(query, body) {
  try {
    // Hash the new password
    let saltRounds = 10;
    let myPlaintextPassword = body.Password;
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds); // Adjust salt rounds as needed

    // Find the user by Id
    const user = await UserClientSeq.findOne({ where: { ...query } });

    if (!user) {
      throw new Error(`User not found.`);
    }

    // Log the old and new passwords
    console.log('Old Password:', user.Password);
    console.log('New Hashed Password:', hashedPassword);

    // Update the password in the database
    const updatedRows = await UserClientSeq.update(
      { Password: hashedPassword },
      { where: { ...query } }
    );

    if (updatedRows[0] === 0) {
      throw new Error('Password not updated.');
    }

    return true; // Password updated successfully
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}


//        // without hashing// 
// async function UpdatePassword(query, body) {
//   try {
//     // Find the user by Id
//     const user = await UserClientSeq.findOne({ where: { ...query } });

//     if (!user) {
//       throw new Error(`User not found.`);
//     }

//     // Log the old and new passwords
//     console.log('Old Password:', user.Password);
//     console.log('New Password:', body.Password);

//     // Update the password in the database
//     const updatedRows = await UserClientSeq.update(
//       { Password: body.Password },
//       { where: { ...query } }
//     );

//     if (updatedRows[0] === 0) {
//       throw new Error('Password not updated.');
//     }

//     return true; // Password updated successfully
//   } catch (error) {
//     console.error('Error updating password:', error);
//     throw error;
//   }
// }



// const UpdatePassword = async (Id, body) => {
//   console.log("UpdatePassword function called with Id:", Id);
//   try {
//     // Hash the new password
//     const hashedPassword = await method.hashPassword(body.Password);

//     // Debug: Log the hashed password
//     console.log("Hashed Password:", hashedPassword);

//     // Find the user by Id
//     const user = await UserClientSeq.findOne({
//       where: { Id },
//     });

//     // Debug: Log the user object
//     console.log("User found:", user);

//     if (user) {
//       // Update the user's password
//       user.Password = hashedPassword;
//       await user.save();

//       return user;
//     } else {
//       throw new Error(`User with Id ${Id} not found.`);
//     }
//   } catch (error) {
//     console.error('Error updating password:', error);
//     throw error;
//   }
// };

// Rest of your code...



// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return UserClientSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     include: ['Country', 'Branch', 'User'],
//     order: [['CompanyName', 'ASC']]
//   })
// }

const findAll = async (request, response) => {
  try {
    const condition = queryBuilderGetList(request);
    const option = listInitOptions(request);
    option.raw = undefined;
  
    const result = await UserClientSeq.findAndCountAll({
      where: condition,
      ...option,
      include: [],
      order: [['User', 'UserName', 'ASC']]
      // order: [['User.UserName', 'ASC']]
    });
  
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' });
  }
};


/**
 * Audits Screen List
 * @param {*} request
 * @returns
 */
// const findAllJoin = async (request) => {
//   const raw=`Select A.ID , A.CompanyName , A.ContactPerson , A.Phone , A.Mobile , A.CountryId , A.Branch_Id , A.ReportType , A.URLClientPortal ,
//   COUNT(B.NameClient_Id ) AS AuditCount FROM Users_Client
//    A INNER JOIN Audits B ON A.Id=B.NameClient_Id  GROUP BY A.ID , A.CompanyName ,
//   A.ContactPerson , A.Phone , A.Mobile , A.CountryId , A.Branch_Id , A.ReportType , A.URLClientPortal`
//   return UserClientSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   })
// }


              /// With BranchName
const findAllJoin = async (request) => {
  const raw = `SELECT A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal,
    COUNT(B.NameClient_Id) AS AuditCount, C.BranchName
    FROM Users_Client A
    INNER JOIN Audits B ON A.Id = B.NameClient_Id
    LEFT JOIN Branches C ON A.Branch_Id = C.Id
    GROUP BY A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal, C.BranchName
    ORDER BY A.CompanyName ASC`;

  return UserClientSeq.sequelize.query(raw, {
    type: Sequelize.QueryTypes.SELECT
  });
};


// const findAllJoin = async (request) => {
//   const raw = `SELECT A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal,
//     COUNT(B.NameClient_Id) AS AuditCount
//     FROM Users_Client A
//     INNER JOIN Audits B ON A.Id = B.NameClient_Id
//     GROUP BY A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal`;

//   return UserClientSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   });
// };



// const findAllJoin = async (request) => {
//   const raw = `SELECT A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal,
//     COUNT(B.NameClient_Id) AS AuditCount, C.BranchName
//     FROM Users_Client A
//     INNER JOIN Audits B ON A.Id = B.NameClient_Id
//     LEFT JOIN Branches C ON A.Branch_Id = C.Id
//     GROUP BY A.ID, A.CompanyName, A.ContactPerson, A.Phone, A.Mobile, A.CountryId, A.Branch_Id, A.ReportType, A.URLClientPortal, C.BranchName`;

//   return UserClientSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   });
// };


// const findAllJoin = async (request) => {
//   const raw = `SELECT A.CompanyName AS BUSINESS, A.ContactPerson AS CONTACT, 
//                COUNT(B.NameClient_Id) AS AUDITS, 'Cleaning Industry' AS INDUSTRY
//                FROM Users_Client A
//                INNER JOIN Audits B ON A.Id = B.NameClient_Id
//                GROUP BY A.ID, A.CompanyName, A.ContactPerson`

//   return UserClientSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   })
// }


async function countDocuments(query) {
  return UserClientSeq.count(query)
}

const destroy = async (id) => {
  return UserClientSeq.destroy({ where: { Id: id } })
}

// const rawQueryList = async () => {
//   // const option = listRawInitOptions(request)
//   const raw = `SELECT uc.Id,ur.UserName,uc.CompanyName,uc.ContactPerson,br.BranchName ,a.IsActive
//   FROM Audits as a
//   inner join  Users_Client as uc on a.NameClient_Id=uc.Id
//   inner join Branches as br on br.Id=uc.Branch_Id
//   inner join Users as ur on ur.Id=a.NameClient_Id
//   WHERE a.IsActive IN (1)
//   GROUP BY uc.CompanyName,uc.ContactPerson,br.BranchName,a.IsActive,ur.UserName,uc.Id
//   ORDER BY uc.CompanyName`

//   return AuditSeq.sequelize.query(raw, {
//     type: Sequelize.QueryTypes.SELECT
//   })
// }

// const rawQueryList = async () => {
//   try {
//     const raw = `SELECT uc.Id, uc.CompanyName, uc.ContactPerson,a.IsActive,ur.UserName,ul.City,ul.id,ul.Address
//     FROM Audits as a
//     INNER JOIN Users_Client as uc ON a.NameClient_Id = uc.Id
//     inner join Users as ur on ur.Id=a.NameClient_Id
//     INNER JOIN Buildings as ul 
//     ON a.LocationClient_Id=ul.id
//     WHERE a.IsActive = 1
//     GROUP BY uc.CompanyName, uc.ContactPerson, a.IsActive, uc.Id,ur.UserName,ul.id,ul.City,ul.Address
//     ORDER BY uc.CompanyName`;
    

//     const results = await AuditSeq.sequelize.query(raw, {
//       type: Sequelize.QueryTypes.SELECT,
//     });

//     return results;
//   } catch (error) {
//     console.error('An error occurred while executing the raw query:', error);
//     throw error;
//   }
// };

//   } catch (error) {
//     console.error('An error occurred while executing the raw query:', error);
//     throw error;
//   }
// };


         // Wroking api

// const rawQueryList = async () => {
//   try {
//     const raw = `SELECT
//       uc.Id,
//       uc.CompanyName,
//       uc.ContactPerson,
//       a.IsActive,
//       ur.UserName,
//       ul.City,
//       ul.id,
//       ul.Address,
//       b.BranchName as Branch
//     FROM Audits as a
//     INNER JOIN Users_Client as uc ON a.NameClient_Id = uc.Id
//     INNER JOIN Users as ur ON ur.Id = a.NameClient_Id
//     INNER JOIN Buildings as ul ON a.LocationClient_Id = ul.id
//     LEFT JOIN Branches as b ON uc.Branch_Id = b.Id
//     WHERE a.IsActive = 1
//     GROUP BY uc.CompanyName, uc.ContactPerson, a.IsActive, uc.Id, ur.UserName, ul.id, ul.City, ul.Address, b.BranchName
//     ORDER BY uc.CompanyName`;

//     const results = await AuditSeq.sequelize.query(raw, {
//       type: Sequelize.QueryTypes.SELECT,
//     });

//     return results;
//   } catch (error) {
//     console.error('An error occurred while executing the raw query:', error);
//     throw error;
//   }
// };


              // Working Api to show the userClient//

// const rawQueryList = async () => {
//   try {
//     const raw = `
//       SELECT
//         uc.Id,
//         uc.CompanyName,
//         uc.ContactPerson,
//         a.IsActive,
//         ur.UserName,
//         ul.City,
//         ul.id,
//         ul.Address,
//         b.BranchName 
//       FROM Audits AS a
//       INNER JOIN Users_Client AS uc ON a.NameClient_Id = uc.Id
//       LEFT JOIN Users AS ur ON ur.Id = a.NameClient_Id
//       INNER JOIN Buildings AS ul ON a.LocationClient_Id = ul.id
//       INNER JOIN Branches AS b ON uc.Branch_Id = b.Id
//       WHERE a.IsActive = 1
//       GROUP BY uc.CompanyName, uc.ContactPerson, a.IsActive, uc.Id, ur.UserName, ul.id, ul.City, ul.Address, b.BranchName
//       ORDER BY uc.CompanyName
//     `;

//     const results = await AuditSeq.sequelize.query(raw, {
//       type: Sequelize.QueryTypes.SELECT,
//     });

//     return results;
//   } catch (error) {
//     // Handle error
//     console.error(error);
//   }
// };

// const rawQueryList = async () => {
//   try {
//     const results = await UserClientSeq.findAll({
//     });

//     return results;
//   } catch (error) {
//     // Handle error
//     console.error(error);
//   }
// };

       // without auditseq
// const rawQueryList = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = undefined;

//   return UserClientSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: [
//       {
//           model: BranchSeq,
//           as: 'Branch',
//           where: request.Branch_Id ? { Id: request.Branch_Id } : {}
//         },
//         {
//           model:UserSeq,
//           as:'User',
//           where:request.User_Id?{Id: request.User_Id}:{}
//         },
//         {
//           model:CountrySeq,
//           as:'Country',
//           where:request.CountryId?{Id: request.CountryId}:{}
//         },

//     ]
//   });
// };
            
            // Working hai

// const rawQueryList = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = undefined;

//   return UserClientSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: [
//       {
//           model: BranchSeq,
//           as: 'Branch',
//           where: request.Branch_Id ? { Id: request.Branch_Id } : {}
//         },
//         {
//           model:UserSeq,
//           as:'User',
//           where:request.User_Id?{Id: request.User_Id}:{}
//         },
//         {
//           model:CountrySeq,
//           as:'Country',
//           where:request.CountryId?{Id: request.CountryId}:{}
//         },
//         {
//           model:BuildingSeq,
//           as:'Buildings',
//           where:request.ClientId?{Id: request.ClientId}:{}

//         }

//     ]
//   });
// };

const rawQueryList = async (request) => {
  return UserClientSeq.findAll({
    include: [
      {
        model: BranchSeq,
        as: 'Branch',
        where: request.Branch_Id ? { Id: request.Branch_Id } : {}
      },
      {
        model: UserSeq,
        as: 'User',
        where: request.User_Id ? { Id: request.User_Id } : {}
      },
      {
        model: CountrySeq,
        as: 'Country',
        where: request.CountryId ? { Id: request.CountryId } : {}
      }
      ,
      {
        model: Modules,
        as: 'Modules',
        where: request.ModulesId ? { Id: request.ModulesId } : {}
      },
      
    ],
    order: [
      ['CompanyName', 'ASC'] // Sort by companyName in ascending order
    ]
  });
};

// const rawQueryList = async (request) => {
//   const queryOptions = {
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: [
//       {
//         model: BranchSeq,
//         as: 'Branch',
//         where: request.Branch_Id ? { Id: request.Branch_Id } : {}
//       },
//       {
//         model: UserSeq,
//         as: 'User',
//         where: request.User_Id ? { Id: request.User_Id } : {}
//       },
//       {
//         model: CountrySeq,
//         as: 'Country',
//         where: request.CountryId ? { Id: request.CountryId } : {}
//       },
//     ],
//     order: [
//       ['CompanyName', 'ASC'] // Sort by companyName in ascending order
//     ]
//   };

//   if (request.ModulesId) {
//     const modules = await Modules.findOne({ where: { Id: request.ModulesId } });
//     if (modules) {
//       queryOptions.include.push({
//         model: Modules,
//         as: 'Modules',
//         where: { Id: request.ModulesId }
//       });
//     }
//   }

//   return UserClientSeq.findAndCountAll(queryOptions);
// };





// const rawQueryList = async () => {
//   try {
//     const results = await AuditSeq.findAll({
//       attributes: [
//         'Users_Client.Id',
//         'Users.UserName',
//         'Users_Client.CompanyName',
//         'Users_Client.ContactPerson',
//         'Branches.BranchName',
//         'Audits.IsActive',
//       ],
//       include: [
//         {
//           model: UserClientSeq,
//           as: 'UserClient',
//           attributes: [],
//           include: [
//             {
//               model: BranchSeq,
//               as:'Branch',
//               attributes: [],
//             },
//           ],
//         },
//         {
//           model: UserSeq,
//           as:'User',
//           attributes: [],
//         },
//       ],
//       where: {
//         'Audits.IsActive': 1,
//       },
//       group: [
//         'Users_Client.Id',
//         'Users.UserName',
//         'Users_Client.CompanyName',
//         'Users_Client.ContactPerson',
//         'Branches.BranchName',
//         'Audits.IsActive',
//       ],
//       order: [['Users_Client.CompanyName', 'ASC']],
//       raw: true,
//     });

//     return results;
//   } catch (error) {
//     console.error('An error occurred while executing the raw query:', error);
//     throw error;
//   }
// };

// const rawQueryList = async (req, res) => {
//   try {
//     const raw = `
//       SELECT uc.Id, ur.UserName, uc.CompanyName, uc.ContactPerson, br.BranchName, a.IsActive
//       FROM Audits AS a
//       INNER JOIN Users_Client AS uc ON a.NameClient_Id = uc.Id
//       INNER JOIN Branches AS br ON br.Id = uc.Branch_Id
//       INNER JOIN Users AS ur ON ur.Id = a.NameClient_Id
//       WHERE a.IsActive = 1
//       GROUP BY uc.CompanyName, uc.ContactPerson, br.BranchName, a.IsActive, ur.UserName, uc.Id
//       ORDER BY uc.CompanyName
//     `;

//     const result = await AuditSeq.sequelize.query(raw, {
//       type: Sequelize.QueryTypes.SELECT
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while executing the query.' });
//   }
// };



export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  UpdatePassword,
  countDocuments,
  destroy,
  findAllJoin,
  rawQueryList
}
