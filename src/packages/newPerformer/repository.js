import { Sequelize } from 'sequelize';
import { UserClientSeq, newperformerseq } from '../../models';
import { queryBuilderGetList } from './service'
import { listInitOptions } from '../../utils/paginate'

// import bcrypt from 'bcrypt';
// import AWS from 'aws-sdk';

// // Configure AWS
// AWS.config.update({
//   region: 'eu-central-1',
//   accessKeyId: 'AKIASHWNAZJVBVBGCWIL',
//   secretAccessKey: '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',
// });
// const S3 = new AWS.S3();

// // Function to upload to S3
// const uploadToS3 = (fileData) => {
//   const params = {
//     Bucket: 'performer-logo',
//     Key: `${Date.now().toString()}.png`,
//     Body: fileData,
//   };

//   return new Promise((resolve, reject) => {
//     S3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading image to S3:', err);
//         reject(err);
//       } else {
//         console.log('S3 Upload Result:', data);
//         resolve(data);
//       }
//     });
//   });
// };


// async function create(body) {
//  return newperformerseq.create(body);
// }







import AWS from 'aws-sdk';
import { func } from 'joi';

// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVBVBGCWIL',
  secretAccessKey: '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',
});
const S3 = new AWS.S3();

// Function to upload to S3
const uploadToS3 = async (fileData) => {
  const params = {
    Bucket: 'performer-logo',
    Key: `${Date.now().toString()}.png`,
    Body: fileData,
  };

  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image to S3:', err);
        reject(err);
      } else {
        console.log('S3 Upload Result:', data);
        resolve(data);
      }
    });
  });
};


async function create(req, res) {
  try {
    // Hash the Password and PasswordSalt
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const hashedPasswordSalt = await bcrypt.hash(req.body.PasswordSalt, 10);

    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const s3UploadResult = await uploadToS3(req.file.buffer);

    // Check if the UserName already exists in the database
    const existingUserName = await newperformerseq.findOne({
      where: { UserName: req.body.UserName },
    });

    if (existingUserName) {
      return res.status(400).json({ message: 'UserName already exists' });
    }

    const ApplicationId = '04B61B6C-DB3B-49DB-B854-42F3654AD0D2';
    const AdminId = '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7';
    const date = new Date();

    const newperformerData = {
      ProfileImage: s3UploadResult.Location,
      ApplicationId:ApplicationId,
      AdminId:AdminId,
      date:date
    };

    await newperformerseq.create(newperformerData);
    res.status(200).json({
      message: 'File uploaded and data inserted successfully',
      ProfileImage: s3UploadResult.Location,
      data: newperformerData,
    });
  } catch (error) {
    console.error('Error uploading image and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
}







// find by Id

async function findById(id){
    return newperformerseq.findByPk(id,{
      include: [
        'NewPerformerdata',
      ],
    })
}


// findone

async function findOne(query){
    return newperformerseq.findOne({
        where:{
            ...query
        }
    })
}

async function updateOne(query,body){
    return newperformerseq.update(body,{
        where:{
            ...query
        }
    })
}


// repository.js
async function UpdatePassword(query, body) {
    try {
      // Hash the new password
      let saltRounds = 10;
      let myPlaintextPassword = body.PasswordSalt;
      const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds); // Adjust salt rounds as needed
  
      // Find the user by Id
      const user = await newperformerseq.findOne({ where: { ...query } });
  
      if (!user) {
        throw new Error(`User not found.`);
      }
  
      // Log the old and new passwords
      console.log('Old Password:', user.PasswordSalt);
      console.log('New Hashed Password:', hashedPassword);
  
      // Update the password in the database
      const updatedRows = await newperformerseq.update(
        { PasswordSalt: hashedPassword },
        { where: { ...query } }
      );
  
      if (updatedRows[0] === 0) {
        throw new Error('PasswordSalt not updated.');
      }
  
      return true; // Password updated successfully
    } catch (error) {
      console.error('Error updating PasswordSalt:', error);
      throw error;
    }
  }
  

  //

// async function UpdatePassword(query, body) {
//     try {
//       // Hash the new password
//       let saltRounds = 10;
//       let myPlaintextPassword = body.PasswordSalt;
//       const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds); // Adjust salt rounds as needed
  
//       // Find the user by Id
//       const user = await newperformerseq.findOne({ where: { ...query } });
  
//       if (!user) {
//         throw new Error(`User not found.`);
//       }
  
//       // Log the old and new passwords
//       console.log('Old Password:', user.PasswordSalt);
//       console.log('New Hashed Password:', hashedPassword);
  
//       // Update the password in the database
//       const updatedRows = await newperformerseq.update(
//         { PasswordSalt: hashedPassword },
//         { where: { ...query } }
//       );
  
//       if (updatedRows[0] === 0) {
//         throw new Error('PasswordSalt not updated.');
//       }
  
//       return true; // Password updated successfully
//     } catch (error) {
//       console.error('Error updating PasswordSalt:', error);
//       throw error;
//     }
//   }
  

            // findAll the data //
  const findAll = async (request, response) => {
    try {
    //   const condition = queryBuilderGetList(request);
    //   const option = listInitOptions(request);
    //   option.raw = undefined;
    
      const result = await newperformerseq.findAndCountAll({
        where: condition,
        ...option,
        include: ['NewPerformerdata'],
        order: [['UserName', 'ASC']]
      });
    
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ error: 'An error occurred' });
    }
  };
  


         // Working Api //

        // Find data in Another way //
const rawQueryList = async (request) => {
  return newperformerseq.findAndCountAll({
    attributes: {
      exclude: request.excludes,
      include: request.includes
    },
    include: [
      'NewPerformerdata',
    ],
    order: [['UserName', 'ASC']], // Order by UserName in ascending order
  });
};


// const rawQueryList = async (request) => {
//   const condition = queryBuilderGetList(request)
//   console.log("condition is",condition)
//   const option = listInitOptions(request)

//   option.raw = undefined
//   return newperformerseq.findAndCountAll({
//     where: condition,
//     ...option,
//     include: ['NewPerformerdata'],
//     order: [['UserName', 'ASC']]
//   })
// }



  //            // Delete Data //

  //  const destroy = async (UserId) => {
  //   return newperformerseq.destroy({ where: { UserId: UserId } })
  // }
  

  const destroy = async (Id) => {
    const raw =
      `DELETE  NewPerformer
    WHERE UserId='${Id}}';
    `
    return newperformerseq.sequelize.query(raw, {
      replacements: [Id],
      type: Sequelize.QueryTypes.DELETE
    })
  }




export default{
    findById,
    findOne,
    updateOne,
    UpdatePassword,
    findAll,
    rawQueryList,
    destroy, 
    create
}

