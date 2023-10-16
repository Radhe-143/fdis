
// import express from 'express';
// import multer from 'multer';
// // import AWS from 'aws-sdk';
// import controller from './controller';
// import { newperformerseq } from '../../models';
// import { PerformerClientSeq} from './model' // Import your junction table model here
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt'; // You can use import for bcrypt
// import * as userClientModule from '../userClient/index';
// import config from './config'
// import AWS from 'aws-sdk';
// const router = express.Router();

// // Configure AWS
// AWS.config.update({
//   region: 'eu-central-1',
//   accessKeyId: 'AKIASHWNAZJVBVBGCWIL',
//   secretAccessKey: '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',
// });
// const S3 = new AWS.S3();

// // Configure Multer
// const upload = multer({
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
//   },
//   fileFilter: (req, file, done) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       done(null, true);
//     } else {
//       done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
//     }
//   },
// });

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

// router.post('/Performer', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }
//     console.log('Request Body:', req.body);

//      // Check if the UserName already exists in the database
//      const existingPerformer = await newperformerseq.findOne({
//       where: {
//         UserName: req.body.UserName,
//       },
//     });

//     if (existingPerformer) {
//       // If a performer with the same UserName exists, return an error response
//       return res.status(400).json({ error: 'UserName is already in use' });
//     }


//     const s3UploadResult = await uploadToS3(req.file.buffer);

//     // Access UserClientIds from req.body using a default value of an empty array
//     const userClientIds = req.body.UserClientIds || [];

//     console.log('Extracted UserClientIds:', userClientIds);

//     const hashedPassword = await bcrypt.hash(req.body.Password, 10);
//     const hashedPasswordSalt = await bcrypt.hash(req.body.PasswordSalt, 10);

//     let newPerformer = null;
    
//     // Define allowed attributes based on the ALLOWED_UPDATE_ATTRIBUTE array
//     const allowedAttributes = {};
//     config.ALLOWED_UPDATE_ATTRIBUTE.forEach((attr) => {
//       if (req.body[attr] !== undefined) {
//         allowedAttributes[attr] = req.body[attr];
//       }
//     });

//     console.log("Allowed Attribute", allowedAttributes);
    
//     // Create a new performer without UserClientIds
//     newPerformer = await newperformerseq.create({
//       ...allowedAttributes, // Spread the allowed attributes
//       UserName: req.body.UserName,
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Email: req.body.Email,
//       LoweredEmail: req.body.LoweredEmail,
//       Mobile: req.body.Mobile,
//       Phone: req.body.Phone,
//       IsAnonymous: req.body.IsAnonymous,
//       IsApproved: req.body.IsApproved,
//       IsLockedOut: req.body.IsLockedOut,
//       Count: req.body.Count,
//       Ordinal: req.body.Ordinal,
//       ReportType: req.body.ReportType,
//       Password: hashedPassword,
//       PasswordSalt: hashedPasswordSalt,
//       CreateDate: new Date().toISOString(),
//       CompanyName: req.body.CompanyName,
//       ClientId: req.body.ClientId,
//       ApplicationId: '04B61B6C-DB3B-49DB-B854-42F3654AD0D2',
//       AdminId: '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7',
//       ProfileImage: s3UploadResult.Location,
//       PerformerTypes_Id: req.body.PerformerTypes_Id,
//     });

//     if (!newPerformer) {
//       return res.status(500).json({ error: 'Failed to create performer' });
//     }

//     // Handle UserClientIds and create associations in the junction table
//     if (Array.isArray(userClientIds) && userClientIds.length) {
//       const associations = userClientIds.map(async (m) => {
//         try {
//           const cate = await userClientModule.service.show(m);
//           console.log("m---------", m);
//           if (cate) {
//             await cate.addNewPerformers(newPerformer, { through: { PerformerClientStatus: true } });
//             console.log('Connection established between \'cate\' and \'newAudit\':', cate);
//           }
//           console.log('cate data', cate);
//         } catch (error) {
//           console.error('Error creating association:', error);
//         }
//       });

//       // Wait for all associations to complete
//       await Promise.all(associations);
//     }

//     res.status(200).json({
//       message: 'File uploaded and data inserted successfully',
//       ProfileImage: s3UploadResult.Location,
//       data: newPerformer,
//     });
//   } catch (error) {
//     console.error('Error uploading image and creating data:', error);
//     res.status(500).json({
//       error: 'An error occurred while processing the request',
//     });
//   }
// });

import express from 'express';
import multer from 'multer';
// import AWS from 'aws-sdk';
import controller from './controller';
import { newperformerseq } from '../../models';
import { PerformerClientSeq} from './model' // Import your junction table model here
import dotenv from 'dotenv';
import * as userClientModule from '../userClient/index';
import config from './config'
import AWS from 'aws-sdk';
const router = express.Router();
import { func } from 'joi';
import jwt from 'jsonwebtoken'
const key = 'NEWKEY';
import bcrypt from 'bcrypt'; // You can use import for bcrypt


// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVBVBGCWIL',
  secretAccessKey: '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',
});
const S3 = new AWS.S3();

// Configure Multer
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, done) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      done(null, true);
    } else {
      done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
    }
  },
});

// Function to upload to S3
const uploadToS3 = (fileData) => {
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

router.post('/Performer', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }
    console.log('Request Body:', req.body);

     // Check if the UserName already exists in the database
     const existingPerformer = await newperformerseq.findOne({
      where: {
        UserName: req.body.UserName,
      },
    });

    if (existingPerformer) {
      // If a performer with the same UserName exists, return an error response
      return res.status(400).json({ error: 'UserName is already in use' });
    }


    const s3UploadResult = await uploadToS3(req.file.buffer);

    // Access UserClientIds from req.body using a default value of an empty array
   // Parse UserClientIds as an array
let userClientIds = [];
if (req.body.UserClientIds) {
  if (typeof req.body.UserClientIds === 'string') {
    userClientIds = req.body.UserClientIds.split(',').map((id) => id.trim()); // Split and trim values
  } else if (Array.isArray(req.body.UserClientIds)) {
    userClientIds = req.body.UserClientIds;
  }
}

    console.log('Extracted UserClientIds:', userClientIds);

    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const hashedPasswordSalt = await bcrypt.hash(req.body.PasswordSalt, 10);

    let newPerformer = null;
    
    // Define allowed attributes based on the ALLOWED_UPDATE_ATTRIBUTE array
    const allowedAttributes = {};
    config.ALLOWED_UPDATE_ATTRIBUTE.forEach((attr) => {
      if (req.body[attr] !== undefined) {
        allowedAttributes[attr] = req.body[attr];
      }
    });

    console.log("Allowed Attribute", allowedAttributes);
    
    // Create a new performer without UserClientIds
    newPerformer = await newperformerseq.create({
      ...allowedAttributes, // Spread the allowed attributes
      UserName: req.body.UserName,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      LoweredEmail: req.body.LoweredEmail,
      Mobile: req.body.Mobile,
      Phone: req.body.Phone,
      IsAnonymous: req.body.IsAnonymous,
      IsApproved: req.body.IsApproved,
      IsLockedOut: req.body.IsLockedOut,
      Count: req.body.Count,
      Ordinal: req.body.Ordinal,
      ReportType: req.body.ReportType,
      Password: hashedPassword,
      PasswordSalt: hashedPasswordSalt,
      CreateDate: new Date().toISOString(),
      CompanyName: req.body.CompanyName,
      ClientId: req.body.ClientId,
      ApplicationId: '04B61B6C-DB3B-49DB-B854-42F3654AD0D2',
      AdminId: '3CAE92A2-6F11-4BC8-8F7D-F0E7057C63B7',
      ProfileImage: s3UploadResult.Location,
      PerformerTypes_Id: req.body.PerformerTypes_Id,
    });

    if (!newPerformer) {
      return res.status(500).json({ error: 'Failed to create performer' });
    }

    // Handle UserClientIds and create associations in the junction table
    if (Array.isArray(userClientIds) && userClientIds.length) {
      const associations = userClientIds.map(async (m) => {
        try {
          const cate = await userClientModule.service.show(m);
          console.log("m---------", m);
          if (cate) {
            await cate.addNewPerformers(newPerformer, { through: { PerformerClientStatus: true } });
            console.log('Connection established between \'cate\' and \'newAudit\':', cate);
          }
          console.log('cate data', cate);
        } catch (error) {
          console.error('Error creating association:', error);
        }
      });

      // Wait for all associations to complete
      await Promise.all(associations);
    }

    res.status(200).json({
      message: 'File uploaded and data inserted successfully',
      ProfileImage: s3UploadResult.Location,
      data: newPerformer,
    });
  } catch (error) {
    console.error('Error uploading image and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
});



          //  Logout api //

async function logout(req, res) {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    console.log("token is",token)

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, key);
      console.log("decoded the token",decoded)

      // Create a new payload without the "exp" property
      const newPayload = { UserId: decoded.UserId, UserName: decoded.UserName };
      console.log("New payload is ",newPayload)

      // Create a new token with the modified payload
      const expiredToken = jwt.sign(newPayload, key);
      console.log("Expired Token is ",expiredToken)

      // Send the new token with the response
      res.status(200).json({ message: 'Logout successful', token: expiredToken });
    } catch (err) {
      // Handle TokenExpiredError
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Token expired' });
      } else {
        throw err; // Let other errors bubble up for generic error handling
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}






          //login api of Performer//

async function login(req, res) {
  try {
    const { UserName, Password } = req.body;

    // Retrieve the user from the database based on the provided UserName
    const newLogin = await newperformerseq.findOne({ where: { UserName },
      include: ['NewPerformerdata'] });
    console.log("Finded data is ",newLogin)

    if (!newLogin) {
      // User not found
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Compare the user-provided Password with the hashed password from the database
    const comparePassword = await bcrypt.compare(Password, newLogin.Password);

    if (!comparePassword) {
      // Incorrect password
      return res.status(401).json({
        message: 'Invalid Password'
      });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { UserId: newLogin.UserId, UserName: newLogin.UserName , Password:newLogin.Password},
      key,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      Status: true,
      UserName: newLogin.UserName,
      Password:newLogin.Password,
      ProfileImage:newLogin.ProfileImage,
      NewPerformerdata:newLogin.NewPerformerdata,
      token
    });

  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}









// router.post('/Performer', upload.single('image'),controller.create);
router.post('/login',login)
router.post('/logout',logout)

router.patch('/:id', controller.update);
router.get('/', controller.index);
router.get('/index', controller.indexx);
router.get('/:id', controller.show);
router.delete('/:id', controller.deleteRecord);
router.patch('/Password/:id', controller.UpdatePass);
export default router;


