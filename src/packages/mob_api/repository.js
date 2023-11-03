import { SuperUserSeq,SuperUser,UserSeq,AuditSeq,AreaDescriptionSeq,CategorySe,ElementTypeSeq,FormErrorElement,ImgSeq, UserClientSeq,Modules} from '../../models';
import {Sequelize}from 'sequelize'
import method from './method'
import { commonLocale } from '../../locales'
import { forEach } from 'lodash';
const jwt = require('jsonwebtoken');
const multer = require('multer')

const uplodeRepo=require('../Img_Uplode/repository')
const fs = require('fs')
const path = require('path');

async function findOne(query) {
  return SuperUserSeq.findOne({
    where: {
      ...query
    }
  });
}


const logout = async (token) => {

  try {
    const secretkey='FDIS8EC40090-E1F0-4CF6'
    jwt.verify(token, secretkey); // Verify the token to ensure it's valid

    // Perform any additional logout-related tasks here, if needed.
    // For example, you might invalidate the token, update session status, etc.

    const response = {
      code: 200,
      Message: 'Logged out successfully',
    };
    console.log(response)

    return response;
  } catch (error) {
    const response = {
      code: 400,
      Message: 'Logout failed',
    };

    return response;
  }
};





async function findOnepwd(query) {
  return SuperUser.findOne({
    where: {
      ...query
    }
  });
}


//----------------------Login -------------------
const auth = async (body) => {
  const username= body.username;
  const secretkey='FDIS8EC40090-E1F0-4CF6'
  //------------------finding UserID--------------------------//
  const data = await findOne({
    UserName: body.username,
  })
  const userid=data.UserId;
  //-------------------------------------------------------//

  //------------------Finding Password----------------------//
  const data1 = await findOnepwd({
    UserId: userid,
  })
  const pwd=data1.Password;
  //-------------------------------------------------------//

  const comparepwd= await method.comparePassword(body.password, pwd)
  if(comparepwd) {
    const token = jwt.sign({ username },secretkey, { expiresIn: '720h' })
    const res= {"code":200, "Message":'Login Successfully' , 'Username':body.username,'UserId':userid ,'Token':token}
   return(res)
  }
  else{
    throw new Error(JSON.stringify(commonLocale.loginFailed));
  }

}

const authorizetion=async(headers)=>{
  const security = process.env.TOKEN;
  const token=headers["x-access-token"];

if (!token) {
  const res= {"code":403, "Message":'A token is required for authentication'}
  return res
}
try {
  const decoded = jwt.verify(token, security);
  const user = decoded;
  return(user);
} catch (err) {
  return(err)
}

}

const Audit_list= async(query,headers)=>{
  const authdata = await authorizetion(headers);
  const username=authdata.username;
  const raw=`select U.Id from Users as U inner join aspnet_Users as UA on U.UserName=UA.UserName where UA.UserName='${username}'`
  const data = await UserSeq.sequelize.query(raw, {
    replacements:[username],
    type: Sequelize.QueryTypes.SELECT
    })
    const Id=data[0].Id
  const raw1=`select Id,LocationClient_Id,NameClient_Id from Audits where  NameClient_Id='${Id}'`
  return AuditSeq.sequelize.query(raw1, {
    replacements:[Id],
    type: Sequelize.QueryTypes.SELECT
    })
}


         // Working  api // 

// const CompanyDetail = async (query) => {
//   console.log("Audit Id", query.AuditId);
//   console.log("clinet Id", query.clientId);
//   const AuditId = query.AuditId;
//   const clientId = query.clientId;
//   const raw = `
//     SELECT [AuditCode],[CompanyName],[Type],[Name] as Location_Name
//     FROM [fdis].[dbo].[Audits] as a
//     LEFT JOIN [fdis].[dbo].[Users_Client] as UC on a.NameClient_Id = UC.Id
//     LEFT JOIN [fdis].[dbo].[Buildings] as b on b.Id = a.LocationClient_Id
//     WHERE a.Id='${AuditId}'

//     SELECT DISTINCT cc.CategoryId, CategoryName, MinimunSizeRange, MaximunSizeRange, ApprovedLimit
//     FROM [fdis].[dbo].[Client_Category] as cc
//     LEFT JOIN [fdis].[dbo].[Categories] as c ON c.Id = cc.CategoryId
//     LEFT JOIN ConstantSizeCategory as cs ON cs.CategoryId = cc.CategoryId
//     WHERE ClientId = '${clientId}'
//     GROUP BY cc.CategoryId, CategoryName, MinimunSizeRange, MaximunSizeRange, ApprovedLimit
//   `;
  
//   return AuditSeq.sequelize.query(raw, {
//     replacements: [AuditId, clientId],
//     type: Sequelize.QueryTypes.SELECT
//   });
// };

const CompanyDetail = async (query) => {
  console.log("Audit Id", query.AuditId);
  console.log("clinet Id", query.clientId);
  const AuditId = query.AuditId;
  const clientId = query.clientId;
  const raw = `
    SELECT [AuditCode],[CompanyName],[Type],[Name] as Location_Name
    FROM [fdis].[dbo].[Audits] as a
    LEFT JOIN [fdis].[dbo].[Users_Client] as UC on a.NameClient_Id = UC.Id
    LEFT JOIN [fdis].[dbo].[Buildings] as b on b.Id = a.LocationClient_Id
    WHERE a.Id='${AuditId}'

    SELECT DISTINCT cc.CategoryId, CategoryName, MinimunSizeRange, MaximunSizeRange, ApprovedLimit
    FROM [fdis].[dbo].[Client_Category] as cc
    LEFT JOIN [fdis].[dbo].[Categories] as c ON c.Id = cc.CategoryId
    LEFT JOIN [cat-list] as cs ON cs.CategoryId = cc.CategoryId
    WHERE ClientId = '${clientId}'
    GROUP BY cc.CategoryId, CategoryName, MinimunSizeRange, MaximunSizeRange, ApprovedLimit
  `;
  
  return AuditSeq.sequelize.query(raw, {
    replacements: [AuditId, clientId],
    type: Sequelize.QueryTypes.SELECT
  });
};


 const CategoryById=async (id) => {
  const clientId=id;
  const raw =
  `SELECT [CategoryId],CategoryName
  FROM [fdis].[dbo].[Client_Category] as cc
  inner join  [fdis].[dbo].[Categories] as c on c.Id =cc.CategoryId where ClientId='${clientId}' `
   return AuditSeq.sequelize.query(raw, {
    replacements:[clientId],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 const Areaname=async (id) => {
  const categoryID=id;
  const raw =
  `SELECT  [CategoryId],[AreaDescId],[AreaDescModuleId],[Name]
   FROM [fdis].[dbo].[Category_AreaDescription] as CA inner join AreaDescriptions as A on A.Id=CA.AreaDescId where CategoryId='${categoryID}' `
   return AreaDescriptionSeq.sequelize.query(raw, {
    replacements:[categoryID],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 const ElementCount=async (id) => {
  const AuditID=id;
  const raw =
  `SELECT TOP (1000) count([IdElement]) as ElementCount
  FROM [fdis].[dbo].[ElementAudit] where IdAudit='${AuditID}' `
   return ElementTypeSeq.sequelize.query(raw, {
    replacements:[AuditID],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 const AuditPresent=async(id)=>{
  const AuditID=id;
  const raw = `SELECT * FROM [fdis].[dbo].[Audits] where Activate='1' and Id='${AuditID}'`
  const result = await AuditSeq.sequelize.query(raw, {
    replacements:[AuditID],
    type: Sequelize.QueryTypes.SELECT
   })

  if(result==0){
    const res= {"code":201, "Message":'Audit is Not Present'}
    return res
  }else{
    console.log(" Audit is present")
    return result

  }

 }

//  

const createAudit = async(body,files)=> {
  const uplodeImagesLogbook = await uplodeRepo.default.uplode(files.LogbookImage[0])

  const uplodeImagesTechnicalAspect = await uplodeRepo.default.uplode(files.TechnicalAspectsImage[0])

const raw =  `INSERT INTO [dbo].[FormErrorElement]([FormId],[ErrorTypeId] ,[ElementId] ,[Logbook] ,[TechnicalAspects] ,[LogbookImage],[TechnicalAspectsImage] ,[Count])
VALUES
('${body.FormId}'
,'${body.ErrorTypeId}'
, '${body.ElementId}'
,'${body.Logbook}'
,'${body.TechnicalAspects}'
,'${uplodeImagesLogbook}'
,'${uplodeImagesTechnicalAspect}'
,${body.Count}
)`
const response =  await FormErrorElement.sequelize.query(raw, {
  replacements:[''],
  type: Sequelize.QueryTypes.INSERT
 })
return response;
}

// const createAudit = async (body, files) => {
//   try {
//     const uplodeImagesLogbook = await uplodeRepo.default.uplode(files.LogbookImage);
//     const uplodeImagesTechnicalAspect = await uplodeRepo.default.uplode(files.TechnicalAspectsImage);

//     const raw = `INSERT INTO FormErrorElement(FormId,ErrorTypeId ,ElementId ,Logbook ,TechnicalAspects ,LogbookImage,TechnicalAspectsImage ,Count)
//     VALUES
//     (
//     '${body.FormId}'
//     ,'${body.ErrorTypeId}'
//     , '${body.ElementId}'
//     ,'${body.Logbook}'
//     ,'${body.TechnicalAspects}'
//     ,'${uplodeImagesLogbook}'
//     ,'${uplodeImagesTechnicalAspect}'
//     ,${body.Count}
//     )`;

//     console.log("SQL Query: ", raw); // Add this line for debugging

//     const response = await FormErrorElement.sequelize.query(raw, {
//       replacements: {
//         FormId: body.FormId,
//         ErrorTypeId: body.ErrorTypeId,
//         ElementId: body.ElementId,
//         Logbook: body.Logbook,
//         TechnicalAspects: body.TechnicalAspects,
//         LogbookImage: uplodeImagesLogbook,
//         TechnicalAspectsImage: uplodeImagesTechnicalAspect,
//         Count: body.Count,
//       },
//       type: Sequelize.QueryTypes.INSERT,
//     });

//     console.log("Response data is ", response);

//     // Assuming the insertion was successful, you can send a success response
//     return {
//       statusCode: 200, // Status code indicating success (200 OK)
//       body: {
//         message: 'Audit created successfully',
//         auditId: response // Assuming the inserted audit ID is in the first element of the response array
//       },
//     };
//   } catch (error) {
//     // Handle errors and return an error response
//     console.error("Error:", error); // Add this line for debugging
//     return {
//       statusCode: 500, // Internal Server Error
//       body: {
//         error: 'An error occurred while creating the audit',
//         details: error.message, // Include more details about the error if needed
//       },
//     };
//   }
// };






// const ElementType =async (id) => {
//   const raw =  ` select ac.Id, et.ElementTypeId,et.ElementTypeValue,et.SortOrder from AreaDescriptions as ac
//   inner join AreaDescription_ElementType as ace on ace.AreaDescId=ac.Id
//   inner join ElementType as et on et.ElementTypeId=ace.ElementTypeId where ac.Id = '${id}'`
//    return AuditSeq.sequelize.query(raw, {
//     replacements:[id],
//     type: Sequelize.QueryTypes.SELECT
//    })
//  }

const ElementType =async (id) => {
  const raw =  ` select ElementTypeId, ElementTypeValue, SortOrder from ElementType where ElementTypeId='${id}'`
   return AuditSeq.sequelize.query(raw, {
    replacements:[id],
    type: Sequelize.QueryTypes.SELECT
   })
 }



 const ErrorType =async (id) => {
  const clientId=id;
  const raw =
  ` select * from ErrorType`
   return AuditSeq.sequelize.query(raw, {
    replacements:[clientId],
    type: Sequelize.QueryTypes.SELECT
   })
 }

  const audits =async (Id) => {
  const raw =
  `   select top 1(ReportType),(CompanyName),(City)
  from Users_Client where Id ='${Id}'
`
   return AuditSeq.sequelize.query(raw, {
    replacements:[Id],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 

  
  
const clientName =async (query) => {
  const raw =
  `   select 
  C.ClientId,
  UC.CompanyName,
  UC.City 
  from 
  ClientAuditor 
  as C inner join Users_Client as UC on C.ClientId=UC.Id`
   return AuditSeq.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
 }

 const client = async () => {
  const rawQuery = `
    SELECT Id as ClientId,CompanyName, City FROM Users_Client
  `;

  try {
    const results = await UserClientSeq.sequelize.query(rawQuery, {
      replacements: [],
      type: Sequelize.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};



 const list =async (NameClient_Id) => {
  const clientId=NameClient_Id;
  const raw =
  `select [CompanyName],[StreetName],[type] from Users_Client as UC inner join Audits as A on A.NameClient_Id=UC.Id
  where NameClient_Id='${NameClient_Id}'`
   return AuditSeq.sequelize.query(raw, {
    replacements:[NameClient_Id],
    type: Sequelize.QueryTypes.SELECT
   })
 }


 
 const AreaDescId = async (Id) => {
  const rawQuery = `
    SELECT c.Id, ac.Id, ac.Name, ac.Abbreviation, ac.Active, ac.ModuleId
    FROM Categories AS c
    INNER JOIN Category_AreaDescription AS ca ON ca.CategoryId = c.Id
    INNER JOIN AreaDescriptions AS ac ON ac.Id = ca.AreaDescId
    WHERE c.Id = '${Id}'
  `;

  return AuditSeq.sequelize.query(rawQuery, {
    replacements: [Id], // Parameter binding
    type: Sequelize.QueryTypes.SELECT
  });
};




// const AreaDescId = async (Id) => {
//   const rawQuery = `
//     SELECT  ac.Id, ac.Name, ac.Abbreviation, ac.Active, ac.ModuleId
//     FROM AreaDescriptions 
//     WHERE ac.Id = '${Id}'
//   `;

//   return AuditSeq.sequelize.query(rawQuery, {
//     replacements: [Id], // Parameter binding
//     type: Sequelize.QueryTypes.SELECT
//   });
// };


 
  const userprofile =async (Id) => {
  const raw =` select Us.Id,Us.UserName,Im.ImageDataLocation from Users as Us inner join Images as Im on Us.ProfileImage = Im.ImageId where Us.Id='${Id}' `
   return AuditSeq.sequelize.query(raw, {
    replacements:[Id],
    type: Sequelize.QueryTypes.SELECT
   })
 }

        // working //

//  async function getFeedback() {
//   try {
//     // Define the SQL query
//     const raw = 'SELECT [ElementAuditComment] FROM [fdis].[dbo].[ElementAudit]  ';

//     // Execute the SQL query
//     const results = await AuditSeq.sequelize.query(raw, {
//       type: Sequelize.QueryTypes.SELECT,
//     });

//     if (results && results.length > 0) {
//       console.log("Last added element:", results[results.length - 1]);
//       console.log("Result array:", results);
//     } else {
//       console.log("No data found.");
//     }

//     console.log("Raw SQL query: ", raw);
//     return results[results.length - 1];
//   } catch (error) {
//     console.error("Error in getFeedback: ", error);
//     throw error;
//   }
// }

async function getFeedback() {
  try {
    // Define the SQL query
    const raw = 'SELECT [ElementAuditComment] FROM [fdis].[dbo].[ElementAudit]  ';

    // Execute the SQL query
    const results = await AuditSeq.sequelize.query(raw, {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log("Raw SQL query: ", raw);
    return results
  } catch (error) {
    console.error("Error in getFeedback: ", error);
    throw error;
  }
}


const feedback=async(query,body)=>{
  const rawQuery = `
    INSERT INTO ElementAudit (IdElement, IdAudit, ElementAuditComment, ElementAuditStatus)
    VALUES ('${body.IdElement}', '${body.IdAudit}', '${body.ElementAuditComment}', '${body.ElementAuditStatus}');
  `;
  const data = new Array(rawQuery);
  const newdata=[]
  newdata.push(data)
  console.log("newdata is", newdata)
  console.log("queries is" , data )
await Modules.sequelize.query(rawQuery,{
replacements:{
  IdElement:body.IdElement,
  IdAudit:body.IdAudit,
  ElementAuditComment:body.ElementAuditComment,
  ElementAuditStatus:body.ElementAuditStatus

},
type:Sequelize.QueryTypes.INSERT
})
return body
}



const finddata = async (request) => {
  return FormErrorElement.findAndCountAll({
    include: ['Element','ErrorType','Forms']
  })
}



export default {
  findOne,
  auth,
  authorizetion,
  Audit_list,
  CompanyDetail,
  CategoryById,
  Areaname,
  ElementCount,
  AuditPresent,
  createAudit,
  ElementType,
  ErrorType,
  audits,
  clientName,
  client,
  list,
  AreaDescId,
 userprofile,
 logout,
 getFeedback,
 feedback,
 finddata

}
