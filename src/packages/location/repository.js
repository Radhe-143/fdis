import { SuperPerformer,BuildingSeq,UserClientSeq} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import { Sequelize } from 'sequelize';

// async function findById(id) {
//   return BuildingSeq.findByPk(id, {
//     include: ['UserClient']
//   })
// }

// async function findById(id) {
//   try {
//     const building = await BuildingSeq.findByPk(id, {
//       include: ['UserClient']
//     });

//     return building;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function findById(id) {
  try {
    const building = await BuildingSeq.findByPk(id, {
    });

    if (!building) {
      throw new Error('Building not found');
    }

    return building;
  } catch (error) {
    console.error('Error finding building:', error);
    throw error;
  }
}



async function findOne(query) {
  return BuildingSeq.findOne({
    where: {
      ...query
    },
    include: ['UserClient']
  });
}

async function create(body,res) {
  // Check if the provided email is different from the existing records
  const existingRecord = await BuildingSeq.findOne({
    where: { Email: body.Email }
  });

  if (existingRecord) {
    // Email already exists, return an error or handle accordingly
    throw new Error('Email already exists.');
  }
   console.log("Email already exists.")

  // Create the record
  return BuildingSeq.create(body);
}


async function updateOne(query, body) {
  return BuildingSeq.update(body, { where: { ...query } })
}

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request)
//   const option = listInitOptions(request)
//   option.raw = undefined
//   return BuildingSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes:
//     {
//       exclude: request.excludes,
//       include: request.includes
//     },
//   })
// }

// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = true; // Set `raw` property to true to retrieve raw result objects
//   option.attributes = {
//     exclude: request.excludes,
//     include: request.includes
//   };

//   try {
//     const { count, rows } = await BuildingSeq.findAndCountAll({
//       where: condition,
//       ...option
//     });

//     return { count, rows };
//   } catch (error) {
//     console.error('Error finding buildings:', error);
//     throw error;
//   }
// };




               // Working Api// 
// const findAll = async (request) => {
//   const condition = queryBuilderGetList(request);
//   const option = listInitOptions(request);
//   option.raw = undefined;

//   return BuildingSeq.findAndCountAll({
//     where: condition,
//     ...option,
//     attributes: {
//       exclude: request.excludes,
//       include: request.includes
//     },
//     include: [
//       {
//         model: UserClientSeq,
//         as: 'Users_Client',
//         include: ['Country', 'Branch','User']
//       }
//       // {
//       //   model: BranchSeq,
//       //   as: 'Branches',
//       //   where: request.Branch_id ? { Id: request.Branch_id } : {}
//       // }
//     ]
//   });
// };

// const findAll = async (request) => {
//   return BuildingSeq.findAndCountAll({
   
//   })
// }

const findAll = async (request) => {
  const condition = queryBuilderGetList(request);
  const option = listInitOptions(request);
  option.raw = undefined;
  try {
    const result = await BuildingSeq.findAndCountAll({
    });

    return result;
  } catch (error) {
    console.error('Error finding buildings:', error);
    throw error;
  }
};




async function countDocuments(query) {
  try {
    const count = await BuildingSeq.count(query);
    return count;
  } catch (error) {
    console.error('Error counting documents:', error);
    throw error;
  }
}


async function countDocuments(query) {
  return BuildingSeq.count(query)
}

const destroy = async (id) => {
  return BuildingSeq.destroy({ where: { Id: id } })
}



const rawQueryListFilter = async (id) => {
  console.log("Client Id", id)
  const raw =
  ` SELECT * FROM [fdis].[dbo].[Buildings] where ClientId='${id}'`
   return BuildingSeq.sequelize.query(raw, {
    replacements:[id],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 

 const filterPerformer = async (id) => {
  console.log("Client Id", id)
  const raw =
  `SELECT *
  FROM  aspnet_Roles
  inner join aspnet_UsersInRoles on aspnet_Roles.RoleId=aspnet_UsersInRoles.RoleId
  inner join aspnet_Users on aspnet_UsersInRoles.UserId=aspnet_Users.UserId
  inner join aspnet_Membership on aspnet_Users.UserId=aspnet_Membership.UserId
  inner join Users on aspnet_Users.UserName=Users.UserName
  inner join Emails on Users.Id=Emails.UserId
  inner join Users_Auditor on Users.Id=Users_Auditor.Id
  inner join TypeOfPerformers on Users_Auditor.Id= TypeOfPerformers.Performers_Id
  inner join PerformerType on TypeOfPerformers.PerformerTypes_Id=PerformerType.Id
  inner join ClientAuditor on Users_Auditor.Id=ClientAuditor.AuditorId
  inner join Users_Client on ClientAuditor.ClientId=Users_Client.Id
  where aspnet_Roles.RoleId='3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7' and
   ClientId='${id}'`
   return SuperPerformer.sequelize.query(raw, {
    replacements:[id],
    type: Sequelize.QueryTypes.SELECT
   })
 }



export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  rawQueryListFilter,
  filterPerformer
}