import { AuditSeq, ErrorCategory } from '../../models';
import { Modules , ElementSeq,ElementTypeSeq } from '../../models';
import { Sequelize } from 'sequelize';
import { UserSeq,SuperPerformer} from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import method from './method'

import{ Table } from 'mssql';
import { func } from 'joi';

// async function findAll(query) {
//   const raw='SELECT  * FROM [dbo].[Modules]'
//   return Modules.sequelize.query(raw, {
//     replacements:[],
//     type: Sequelize.QueryTypes.SELECT
//    })
// }

async function findById(id) {
  try {
    const module = await Modules.findOne({
      where: {
        id: id
      }
    });

    if (!module) {
      throw new Error('Module not found');
    }

    return module;

  } catch (error) {
    // Handle the error here
    console.error('Error fetching module by id:', error);
    throw error;
  }
}

// async function create(body) {
//   const createdModule = await Modules.create(body)
//   return createdModule.get({ plain: true });
// }

async function create(body) {
 const raw=`INSERT INTO [dbo].[Modules](Name,AreaName)
 VALUES ('${body.Name}','${body.AreaName}')`
 await Modules.sequelize.query(raw,{
  replacements:[''],
  type:Sequelize.QueryTypes.INSERT,
 })
 return body;
}



async function feedBack(body) {
  try {
    const createdModule = await Modules.create(body);

    // Convert the Sequelize object to plain JSON
    const moduleData = createdModule.toJSON();

    // Remove the unwanted properties
    delete moduleData.Name;
    delete moduleData.AreaName;

    return moduleData;
  } catch (error) {
    console.error('Error creating module:', error);
    throw error;
  }
}






async function findAll() {
  try {
    const modulesWithFeedback = await Modules.findAll({
      where: {
        name: {
          [Sequelize.Op.not]: null,
        },
      },
      attributes: ['Id', 'Name', 'AreaName'], // Include 'Feedback' column
    });
    return modulesWithFeedback;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
}



async function findAllJoin(query) {
  const raw='SELECT  * FROM [dbo].[Audits]'
  return Modules.sequelize.query(raw, {
    replacements:[],
    type: Sequelize.QueryTypes.SELECT
   })
}




async function getfeedback() {
  const raw = 'SELECT [ElementAuditComment]  FROM [fdis].[dbo].[ElementAudit]'; // Double-check the table and column names
  try {
    const results = await Modules.sequelize.query(raw, {
      type: Sequelize.QueryTypes.SELECT
    });

    console.log("raw data is", raw);
    return results;
  } catch (error) {
    throw error;
  }
}












// async function feedback(query, body) {
//   console.log("body is" , body)
//   const rawQuery = `
//     INSERT INTO ElementAudit (IdElement, IdAudit, ElementAuditComment, ElementAuditStatus)
//     VALUES ('${body.IdElement}', '${body.IdAudit}', '${body.ElementAuditComment}', '${body.ElementAuditStatus}');
//   `;
//   try {
//     const result = await Modules.sequelize.query(rawQuery, {
//       type: Sequelize.QueryTypes.INSERT,
//     });

//     console.log('Insertion result:', result); // Log the insertion result
//     return result;
//   } catch (error) {
//     console.error('Error inserting feedback:', error);
//     throw error;
//   }

const feedback=async(req,res)=>{
  
  const rawQuery = `
    INSERT INTO ElementAudit (IdElement, IdAudit, ElementAuditComment, ElementAuditStatus)
    VALUES ('${body.IdElement}', '${body.IdAudit}', '${body.ElementAuditComment}', '${body.ElementAuditStatus}');
  `;
await Modules.sequelize.query(rawQuery,{
replacements:{
  IdElement:body.IdElement,
  IdAudit:body.IdAudit,
  ElementAuditComment:body.ElementAuditComment,
  ElementAuditStatus:body.ElementAuditStatus

},
type:Sequelize.QueryTypes.INSERT
})
return
}










export default {

findAll ,
findAllJoin,
feedback,
findById,
create,
feedBack,
getfeedback

}
