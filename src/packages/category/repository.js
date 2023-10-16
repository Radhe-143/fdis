import { CategorySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import { Sequelize } from 'sequelize';
import { func } from 'joi';



//         // Working Api //
// async function findById(id) {
//   return CategorySeq.findByPk(id, {
//     include: ['UserClient']
//   })
// }

async function findById(CategoryId) {
  try {
    const category = await CategorySeq.findByPk(CategoryId, {
      include: ['UserClient'], // Include associations as needed
    });

    if (!category) {
      // Handle the case where no category is found
      return null;
    }

    const raw = `
      SELECT
        [MinimunSizeRange] AS minimum_size_range,
        [MaximunSizeRange] AS maximum_size_range,
        [ApprovedLimit] AS approved_limit
      FROM [fdis].[dbo].[cat-list] AS cc
      LEFT JOIN [fdis].[dbo].[Categories] AS c ON c.Id = cc.CategoryId
      WHERE cc.CategoryId = :CategoryId
    `;

    const results = await CategorySeq.sequelize.query(raw, {
      replacements: { CategoryId },
      type: Sequelize.QueryTypes.SELECT,
    });

    console.log("result data is", results);

    // You can return both the category and the results here
    return { category, results };

  } catch (error) {
    throw error;
  }
}


// async function findById(CategoryId) {
//   try {
//     const category = await CategorySeq.findByPk(CategoryId, {
//       include: ['UserClient'], // Include associations as needed
//     });
//     if (!category) {
//       throw new Error(`Category with CategoryId ${CategoryId} not found`);
//     }
//     return category;
//   } catch (error) {
//     throw error;
//   }
// }




async function findOne(query) {
  return CategorySeq.findOne({
    where: {
      ...query
    },
    include: ['UserClient']
  });
}

async function create(body) {
  console.log("body data is",body)
  try {
    // Insert data into the "cat-list" table without specifying "CategoryId"
    const raw = `
      INSERT INTO [fdis].[dbo].[cat-list] (CategoryId, MinimunSizeRange, MaximunSizeRange, ApprovedLimit)
      VALUES (:categoryId, :minSizeRange, :maxSizeRange, :approvedLimit)
    `;

    console.log("raw data is" ,raw)

    // Create a new category record and get the result
    const newCategory = await CategorySeq.create(body);
    console.log("newCategory is",newCategory)

    const replacements = {
      categoryId: newCategory.ID, // Use the ID of the newly created category
      minSizeRange: body.MinimunSizeRange ,
      maxSizeRange: body.MaximunSizeRange,
      approvedLimit: body.ApprovedLimit ,
    };

    console.log("replacement data is",replacements)

    // Insert the data into the "cat-list" table
    await CategorySeq.sequelize.query(raw, {
      replacements,
      type: Sequelize.QueryTypes.INSERT,
    });

    // Return the created "cat-list" record
    return newCategory;
  } catch (error) {
    throw error;
  }
}




async function updateOne(query, body) {
  console.log("Query data is", query);
  
  // Define the raw SQL query
  const raw = `
   UPDATE [fdis].[dbo].[cat-list]
   SET MinimunSizeRange='${body.MinimunSizeRange}',
   MaximunSizeRange='${body.MaximunSizeRange}',
   ApprovedLimit='${body.ApprovedLimit}'
   WHERE [fdis].[dbo].[cat-list].CategoryId='${query.ID}'
  `;

  console.log("raw data is", raw);

  // Define the replacements for the query
  const replacements = {
    MinimunSizeRange: body.MinimunSizeRange,
    MaximunSizeRange: body.MaximunSizeRange,
    ApprovedLimit: body.ApprovedLimit,
    CategoryId: query.ID,
  };

  console.log("replacement data is ", replacements);
  
  // Use Sequelize raw query to update the record
  await CategorySeq.sequelize.query(raw, {
    replacements,
    type: Sequelize.QueryTypes.UPDATE,
  });

  // Use Sequelize ORM update method to update the record (optional)
   await CategorySeq.update(body, { where: { ...query } });

  // Return the updated data (you can choose to return the result of the Sequelize update method or body, depending on your needs)
  return body;
}

// async function updateOne(query, body) {
//   console.log("Query data is", query);
  
//   // Use Sequelize ORM update method to update the record (optional)
//   await CategorySeq.update(body, { where: { ...query } });

//   // Return the updated data (you can choose to return the result of the Sequelize update method or body, depending on your needs)
//   return body;
// }



const updatecount= async(id,body)=>{

  const raw=`UPDATE cat-list
  SET MinimunSizeRange='${body.MinimunSizeRange}', MaximunSizeRange='${body.MaximunSizeRange}', ApprovedLimit='${body.ApprovedLimit}'
  WHERE cat-list.CategoryId='${id}'`;

  await CategorySeq.sequelize.query(raw,{
    replacements:[''],
    type:Sequelize.QueryTypes.UPDATE,
  });

  return body

}




const findAll = async (request) => {
  return CategorySeq.findAndCountAll({
    include: ['UserClient']
  })
}

async function countDocuments(query) {
  return CategorySeq.count(query)
}
       
            // Delete Api // 
// const destroy = async (id) => {
//   return CategorySeq.destroy({ where: { ID: id } })
// }


// const destroy = async (id) => {
//   const raw=`DELETE [cat-list] WHERE CategoryId ='${id}'`
//  return CategorySeq.sequelize.query(raw,{
//   replacements:[{ID:id}],
//   type:Sequelize.QueryTypes.DELETE
//  })
//  return CategorySeq.destroy({ where: { ID: id } })
// }


const destroy = async (id) => {
  try {
    // Destroy the record using Sequelize
    const data = await CategorySeq.destroy({ where: { Id: id } });

    // Define the raw SQL query
    const raw = `DELETE FROM [cat-list] WHERE CategoryId = :id`;

    // Execute the raw SQL query using Sequelize
    const result = await CategorySeq.sequelize.query(raw, {
      replacements: { id }, // Use id as a replacement
      type: Sequelize.QueryTypes.DELETE,
    });

    // Return both the data from CategorySeq.destroy and the raw query result
    return { data ,result};
  } catch (error) {
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
  updatecount
}
