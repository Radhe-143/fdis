// import express from 'express'
// import controller from './controller'
// import repository from './repository';
// import { FormErrorElement }  from '../../models';
// import token from'./repository'
// const fs = require('fs')
// const util = require('util')
// const multer = require('multer')
// import config from './config'
// import AWS from 'aws-sdk';
// const router = express.Router()
// // const upload = multer({ dest: 'uploads/' })
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
//     fileSize: 1024 * 1024 * 5,
//     dest: 'uploads/' // Limit file size to 5MB
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


// // Route to handle image upload and data insertion
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }

//     const s3UploadResult = await uploadToS3(req.file.buffer);
//     const userClientData = {
//     FormId: req.body.FormId,
//     ErrorTypeId:req.body.ErrorTypeId ,
//     ElementId:req.body.ElementId,
//     Logbook: req.body.Logbook,
//     TechnicalAspects: req.body.TechnicalAspects,
//    LogbookImage: s3UploadResult.Location,
//    TechnicalAspectsImage: s3UploadResult.Location,
//    Count: req.body.Count 
//     };

//     await FormErrorElement.create(userClientData); // Use .create() to insert data
//     res.status(200).json({
//       message: 'File uploaded and data inserted successfully',
//       TechnicalAspectsImage: s3UploadResult.Location,
//       LogbookImage:s3UploadResult.Location,
//       data: userClientData,
//     });
//     return userClientData;
//   } catch (error) {
//     console.error('Error uploading image and creating data:', error);
//     res.status(500).json({
//       error: 'An error occurred while processing the request',
//     });
//   }
// });



const express = require('express');
import controller from './controller'
import repository from './repository';
const AWS = require('aws-sdk');
const multer = require('multer');
const util = require('util');
const fs = require('fs');
import { FormErrorElement } from '../../models';
const router = express.Router();
const unlinkFile = util.promisify(fs.unlink);

// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVBVBGCWIL', // Replace with your AWS access key
  secretAccessKey: 'WtoY3usfqRsOuB+jRBT8wJyocZXFvkfFI+GIYCIa', // Replace with your AWS secret access key
});
const S3 = new AWS.S3();

// Configure Multer
const upload = multer({
  storage: multer.memoryStorage(), // Store uploaded file in memory
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
const uploadToS3 = (fileData, fileName) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: 'performer-logo', // Replace with your S3 bucket name
      Key: fileName,
      Body: fileData,
    };

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

// Route to handle image upload and data insertion for multiple photos
// ...

router.post('/upload', upload.fields([
  { name: 'TechnicalAspectsImages', maxCount: 1 },
  { name: 'LogbookImages', maxCount: 1 },
]), async (req, res) => {
  try {
    const technicalAspectsImage = req.files['TechnicalAspectsImages'][0];
    const logbookImage = req.files['LogbookImages'][0];

    const technicalAspectsImageUrl = technicalAspectsImage ? await uploadToS3(technicalAspectsImage.buffer, `${Date.now().toString()}_technical.png`) : null;
    const logbookImageUrl = logbookImage ? await uploadToS3(logbookImage.buffer, `${Date.now().toString()}_logbook.png`) : null;

    const userClientData = {
      FormId: req.body.FormId,
      ErrorTypeId: req.body.ErrorTypeId,
      ElementId: req.body.ElementId,
      Logbook: req.body.Logbook,
      TechnicalAspects: req.body.TechnicalAspects,
      LogbookImage: logbookImageUrl ? logbookImageUrl.Location : null, // Set the LogbookImage to the URL string or null
      TechnicalAspectsImage: technicalAspectsImageUrl ? technicalAspectsImageUrl.Location : null, // Set the TechnicalAspectsImage to the URL string or null
      Count: req.body.Count,
    };

    // Now save data to the database using Mongoose
    const savedData = await FormErrorElement.create(userClientData);
    console.log("saveddata", savedData);

    res.status(200).json({
      message: 'Files uploaded and data inserted successfully',
      TechnicalAspectsImages: userClientData.TechnicalAspectsImage, // Updated
      LogbookImages: userClientData.LogbookImage, // Updated
      data: savedData,
    });
  } catch (error) {
    console.error('Error uploading images and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
});


router.post('/login', controller.auth)


router.post('/logout', async (req, res) => {
  const token = req.headers['x-access-token']; // Extract token from request headers

  if (!token) {
    const response = {
      code: 400,
      Message: 'Token is missing in the request headers',
    };
    return res.status(400).json(response);
  }

  try {
    const logoutResponse = await repository.logout(token); // Call the logout function

    return res.status(logoutResponse.code).json(logoutResponse);
  } catch (error) {
    console.error('Logout error:', error);

    const response = {
      code: 500,
      Message: 'Internal server error',
    };
    return res.status(500).json(response);
  }
});


router.post('/auth', controller.authorizetion)
router.get('/auditlist',controller.Audit_list)
router.get('/companyDetail',controller.CompanyDetail)
router.get('/categorybyID/:id',controller.CategoryById)
router.get('/areaname/:id',controller.Areaname)
router.get('/elementcount/:id',controller.ElementCount)
router.get('/auditPresent/:id',controller.AuditPresent)
router.post('/uploadform',upload.fields([
    { name: 'LogbookImage'},
    { name: 'TechnicalAspectsImage'}
  ]),controller.createAudit)
 router.get('/ElementType/:id', controller.ElementType )
  router.get('/ErrorType', controller.ErrorType)
  router.get('/setting/:Id', controller.audits)
router.get ('/clientList/:Id', controller.clientName)
router.get('/client/F1171E76-37F9-42D4-8801-F450E35FB1B9',controller.client)
router.get('/Auditlistnew/:NameClient_Id', controller.list)
router.get('/userprofile/:Id', controller.userprofile)

router.get('/AreaDescId/:Id', controller.AreaDescId)
router.get('/getfeedback', controller.index5)

router.post('/feedback',controller.feedback)
router.get('/getdata',controller.finddata)

export default router